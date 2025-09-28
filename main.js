// main.js

(function() {
    let activeQuizQuestions = [];
    const TOTAL_QUIZ_QUESTIONS = 50;

    let state = {
        currentQuestionIndex: 0,
        scores: {
            lead: 0, flow: 0, expression: 0, response: 0,
            action: 0,
            ei: 0, sn: 0, tf: 0, jp: 0
        },
        answerHistory: []
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generateQuizQuestions() {
        const allQuestions = [];
        
        for (const category in questionPool) {
            if (category === 'mbti') continue;
            const questions = questionPool[category].map(q => ({ ...q, category: category }));
            allQuestions.push(...questions);
        }

        for (const category in questionPool.mbti) {
            const questions = questionPool.mbti[category].map(q => ({ ...q, category: category }));
            allQuestions.push(...questions);
        }

        const shuffledAllQuestions = shuffleArray(allQuestions);
        activeQuizQuestions = shuffledAllQuestions.slice(0, TOTAL_QUIZ_QUESTIONS);
        
        activeQuizQuestions.forEach((q, index) => {
            const originalQuestionText = q.question.replace(/^\d+\.\s*/, '');
            q.question = `${index + 1}. ${originalQuestionText}`;
        });
    }


    function startQuiz() {
        state.currentQuestionIndex = 0;
        state.scores = {
            lead: 0, flow: 0, expression: 0, response: 0,
            action: 0, ei: 0, sn: 0, tf: 0, jp: 0
        };
        state.answerHistory = [];
        
        generateQuizQuestions();
        showQuizScreen();
        renderQuestion(activeQuizQuestions[state.currentQuestionIndex], null);
        updateProgressBar(state.currentQuestionIndex, activeQuizQuestions.length);
    }

    function goToNextQuestion(selectedScore, selectedCategory) {
        state.answerHistory[state.currentQuestionIndex] = { score: selectedScore, category: selectedCategory };
        state.scores[selectedCategory] += selectedScore;
        state.currentQuestionIndex++;
        
        updateProgressBar(state.currentQuestionIndex, activeQuizQuestions.length);
        
        if (state.currentQuestionIndex < activeQuizQuestions.length) {
            const previousAnswer = state.answerHistory[state.currentQuestionIndex];
            renderQuestion(activeQuizQuestions[state.currentQuestionIndex], previousAnswer);
        } else {
            finishQuiz();
        }
    }

    function goToPreviousQuestion() {
        if (state.currentQuestionIndex > 0) {
            const lastAnswer = state.answerHistory.pop();
            if (lastAnswer) {
                state.scores[lastAnswer.category] -= lastAnswer.score;
            }
            state.currentQuestionIndex--;
            updateProgressBar(state.currentQuestionIndex, activeQuizQuestions.length);
            const previousAnswer = state.answerHistory[state.currentQuestionIndex];
            renderQuestion(activeQuizQuestions[state.currentQuestionIndex], previousAnswer);
        }
    }

    function finishQuiz() {
        showLoadingScreen();
        setTimeout(() => {
            const awoolimType = calculateAwoolimType();
            const mbtiType = calculateMbtiType();
            const actionTendency = calculateActionTendency(resultsData[awoolimType]);
            const resultData = resultsData[awoolimType];
            
            const scoresString = Object.values(state.scores).join(',');
            history.pushState(null, '', `#result=${awoolimType}&mbti=${mbtiType}&action=${actionTendency.type}&action_count=${actionTendency.count}&scores=${scoresString}`);
            localStorage.setItem('lastResultType', awoolimType);
            localStorage.setItem('lastMbtiType', mbtiType);
            localStorage.setItem('lastActionType', actionTendency.type);
            localStorage.setItem('lastActionCount', actionTendency.count);
            localStorage.setItem('lastScores', JSON.stringify(state.scores));
            
            showResultScreen(resultData, state.scores, mbtiType, actionTendency);
        }, 2000);
    }
    
    function calculateAwoolimType() {
        const { lead, flow, expression, response, action } = state.scores;

        let actionCount = 0;
        activeQuizQuestions.forEach(q => {
            if (q.category === 'action') actionCount++;
        });
        
        const actionThreshold = actionCount * 4.6;
        const hasExtremelyHighAction = action >= actionThreshold;

        const totalLeadFlow = lead + flow || 1;
        const totalExprResp = expression + response || 1;
        const leadRatio = lead / totalLeadFlow;
        const expressionRatio = expression / totalExprResp;

        if (hasExtremelyHighAction) {
            if (leadRatio >= 0.45 && leadRatio <= 0.55) return 'LC';
            if (leadRatio > 0.7 && expressionRatio > 0.7) return 'LP';
        }
        
        if (leadRatio > 0.5) {
            return expressionRatio > 0.5 ? 'LE' : 'LR';
        }
        
        return expressionRatio > 0.5 ? 'FE' : 'FR';
    }

    function calculateActionTendency(resultData) {
        let actionCount = 0;
        activeQuizQuestions.forEach(q => {
            if (q.category === 'action') actionCount++;
        });
        const actionMid = actionCount * 3;
        
        if (state.scores.action > actionMid) {
            return { type: 'high', text: resultData.action_modifier.high, count: actionCount };
        } else {
            return { type: 'low', text: resultData.action_modifier.low, count: actionCount };
        }
    }

    function calculateMbtiType() {
        const { ei, sn, tf, jp } = state.scores;
        let eiCount = 0, snCount = 0, tfCount = 0, jpCount = 0;
        activeQuizQuestions.forEach(q => {
            if (q.category === 'ei') eiCount++;
            if (q.category === 'sn') snCount++;
            if (q.category === 'tf') tfCount++;
            if (q.category === 'jp') jpCount++;
        });

        const eiMid = eiCount * 3;
        const snMid = snCount * 3;
        const tfMid = tfCount * 3;
        const jpMid = jpCount * 3;

        const e_i = ei > eiMid ? 'E' : 'I';
        const s_n = sn > snMid ? 'S' : 'N';
        const t_f = tf > tfMid ? 'F' : 'T';
        const j_p = jp > jpMid ? 'J' : 'P';

        return `${e_i}${s_n}${t_f}${j_p}`;
    }

    function onPageLoad() {
        const hash = window.location.hash.substring(1);
        if (hash.includes('result=')) {
            const params = new URLSearchParams(hash);
            const resultType = params.get('result');
            const mbtiType = params.get('mbti');
            const actionType = params.get('action');
            const actionCount = parseInt(params.get('action_count'), 10);
            const scoresParam = params.get('scores');
            
            let scores = null;
            if (scoresParam) {
                const scoreValues = scoresParam.split(',').map(Number);
                if (scoreValues.length === 9) {
                    scores = {
                        lead: scoreValues[0], flow: scoreValues[1], expression: scoreValues[2], response: scoreValues[3],
                        action: scoreValues[4],
                        ei: scoreValues[5], sn: scoreValues[6], tf: scoreValues[7], jp: scoreValues[8]
                    };
                }
            }
            if (resultsData[resultType]) {
                const actionTendency = {
                    type: actionType,
                    text: resultsData[resultType].action_modifier[actionType],
                    count: actionCount
                };
                showResultScreen(resultsData[resultType], scores, mbtiType, actionTendency);
            }
        } else {
            const lastResultType = localStorage.getItem('lastResultType');
            const lastMbtiType = localStorage.getItem('lastMbtiType');
            const lastActionType = localStorage.getItem('lastActionType');
            const lastActionCount = parseInt(localStorage.getItem('lastActionCount'), 10);
            const lastScoresString = localStorage.getItem('lastScores');

            if (lastResultType && resultsData[lastResultType]) {
                const lastResultData = resultsData[lastResultType];
                showLastResultBanner(lastResultData, () => {
                    let lastScores = null;
                    if (lastScoresString) {
                        lastScores = JSON.parse(lastScoresString);
                    }
                    const actionTendency = {
                        type: lastActionType,
                        text: lastResultData.action_modifier[lastActionType],
                        count: lastActionCount
                    };
                    const scoresString = lastScores ? Object.values(lastScores).join(',') : '';
                    history.pushState(null, '', `#result=${lastResultType}&mbti=${lastMbtiType}&action=${lastActionType}&action_count=${lastActionCount}&scores=${scoresString}`);
                    showResultScreen(lastResultData, lastScores, lastMbtiType, actionTendency);
                });
            }
        }
    }

    function restartQuiz() {
        resetTheme();
        history.replaceState(null, '', window.location.pathname);
        location.reload();
    }

    window.startQuiz = startQuiz;
    window.goToNextQuestion = goToNextQuestion;
    window.goToPreviousQuestion = goToPreviousQuestion;
    window.restartQuiz = restartQuiz;

    window.addEventListener('load', () => {
        initializeUIEventListeners();
        onPageLoad();
    });

})();




