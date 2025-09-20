// main.js

(function() {
    let activeQuizQuestions = [];
    const NUM_QUESTIONS_PER_CATEGORY = 5;

    let state = {
        currentQuestionIndex: 0,
        scores: { lead: 0, flow: 0, expression: 0, response: 0 },
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
        const selectedQuestions = [];
        for (const category in questionPool) {
            const categoryQuestions = questionPool[category].map(q => ({ ...q, category }));
            const shuffled = shuffleArray([...categoryQuestions]);
            selectedQuestions.push(...shuffled.slice(0, NUM_QUESTIONS_PER_CATEGORY));
        }
        activeQuizQuestions = shuffleArray(selectedQuestions);
        activeQuizQuestions.forEach((q, index) => {
            q.question = `${index + 1}. ${q.question.substring(q.question.indexOf('.') + 1).trim()}`;
        });
    }

    function startQuiz() {
        state.currentQuestionIndex = 0;
        state.scores = { lead: 0, flow: 0, expression: 0, response: 0 };
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
            const resultType = calculateResultType();
            const resultData = resultsData[resultType];
            const scoresString = `${state.scores.lead},${state.scores.flow},${state.scores.expression},${state.scores.response}`;
            history.pushState(null, '', `#result=${resultType}&scores=${scoresString}`);
            localStorage.setItem('lastResultType', resultType);
            localStorage.setItem('lastScores', JSON.stringify(state.scores));
            showResultScreen(resultData, state.scores);
        }, 2000);
    }

    function calculateResultType() {
        const { lead, flow, expression, response: resp } = state.scores;
        const leadQuestionCount = activeQuizQuestions.filter(q => q.category === 'lead').length;
        const flowQuestionCount = activeQuizQuestions.filter(q => q.category === 'flow').length;
        const leadMaxScore = leadQuestionCount * 5;
        const flowMaxScore = flowQuestionCount * 5;
        const leadFlowDifference = Math.abs(lead - flow);
        const totalMaxLeadFlowScore = leadMaxScore + flowMaxScore;
        const isHighAndBalanced = leadFlowDifference <= (totalMaxLeadFlowScore * 0.05) && (lead + flow) >= (totalMaxLeadFlowScore * 0.7);

        if (isHighAndBalanced) {
            return expression > resp ? 'LP' : 'LC';
        } else {
            const leadOrFlow = lead > flow ? 'L' : 'F';
            const expressionOrResponse = expression > resp ? 'E' : 'R';
            return leadOrFlow + expressionOrResponse;
        }
    }

    function onPageLoad() {
        const hash = window.location.hash.substring(1);
        if (hash.includes('result=')) {
            const params = hash.split('&');
            const resultParam = params.find(p => p.startsWith('result='));
            const scoresParam = params.find(p => p.startsWith('scores='));
            const resultType = resultParam.split('=')[1];
            let scores = null;
            if (scoresParam) {
                const scoreValues = scoresParam.split('=')[1].split(',').map(Number);
                if (scoreValues.length === 4) {
                    scores = { lead: scoreValues[0], flow: scoreValues[1], expression: scoreValues[2], response: scoreValues[3] };
                }
            }
            if (resultsData[resultType]) {
                showResultScreen(resultsData[resultType], scores);
            }
        } else {
            const lastResultType = localStorage.getItem('lastResultType');
            const lastScoresString = localStorage.getItem('lastScores');
            if (lastResultType && resultsData[lastResultType]) {
                const lastResultData = resultsData[lastResultType];
                showLastResultBanner(lastResultData, () => {
                    let lastScores = null;
                    let scoresString = '';
                    if (lastScoresString) {
                        lastScores = JSON.parse(lastScoresString);
                        scoresString = `&scores=${lastScores.lead},${lastScores.flow},${lastScores.expression},${lastScores.response}`;
                    }
                    history.pushState(null, '', `#result=${lastResultType}${scoresString}`);
                    showResultScreen(lastResultData, lastScores);
                });
            }
        }
    }

    function restartQuiz() {
        resetTheme(); // 테마 초기화 호출
        history.pushState(null, '', window.location.pathname);
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
