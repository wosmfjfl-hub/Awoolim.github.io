// main.js

(function() {
    // 퀴즈에 사용될 전체 질문 목록
    let activeQuizQuestions = [];
    const TOTAL_QUIZ_QUESTIONS = 36; // 출제할 총 문항 수

    // 애플리케이션의 상태를 관리하는 객체
    let state = {
        currentQuestionIndex: 0,
        scores: {
            lead: 0, flow: 0, expression: 0, response: 0,
            ei: 0, sn: 0, tf: 0, jp: 0
        },
        answerHistory: []
    };

    // 배열을 무작위로 섞는 함수
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // [수정됨] 전체 질문 풀에서 36개만 랜덤으로 선택하여 퀴즈 생성
    function generateQuizQuestions() {
        const allQuestions = [];
        
        const awoolimCategories = ['lead', 'flow', 'expression', 'response'];
        awoolimCategories.forEach(category => {
            const categoryQuestions = JSON.parse(JSON.stringify(questionPool[category])).map(q => {
                q.category = category;
                return q;
            });
            allQuestions.push(...categoryQuestions);
        });

        const mbtiCategories = ['ei', 'sn', 'tf', 'jp'];
        mbtiCategories.forEach(category => {
            const categoryQuestions = JSON.parse(JSON.stringify(questionPool.mbti[category])).map(q => {
                q.category = category;
                return q;
            });
            allQuestions.push(...categoryQuestions);
        });

        // [핵심 수정] 전체 질문(60개)을 섞은 후 36개만 선택
        const shuffledAllQuestions = shuffleArray(allQuestions);
        activeQuizQuestions = shuffledAllQuestions.slice(0, TOTAL_QUIZ_QUESTIONS);
        
        activeQuizQuestions.forEach((q, index) => {
            const originalQuestionText = q.question.replace(/^\d+\.\s*/, '');
            q.question = `${index + 1}. ${originalQuestionText}`;
        });
    }

    // 퀴즈를 초기화하고 시작하는 함수
    function startQuiz() {
        state.currentQuestionIndex = 0;
        state.scores = {
            lead: 0, flow: 0, expression: 0, response: 0,
            ei: 0, sn: 0, tf: 0, jp: 0
        };
        state.answerHistory = [];
        
        generateQuizQuestions();
        showQuizScreen();
        renderQuestion(activeQuizQuestions[state.currentQuestionIndex], null);
        updateProgressBar(state.currentQuestionIndex, activeQuizQuestions.length);
    }

    // 다음 질문으로 이동하는 함수
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

    // 이전 질문으로 이동하는 함수
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

    // 퀴즈를 종료하고 결과를 보여주는 함수
    function finishQuiz() {
        showLoadingScreen();
        setTimeout(() => {
            const awoolimType = calculateAwoolimType();
            const mbtiType = calculateMbtiType();
            const resultData = resultsData[awoolimType];
            
            const scoresString = Object.values(state.scores).join(',');
            history.pushState(null, '', `#result=${awoolimType}&mbti=${mbtiType}&scores=${scoresString}`);
            localStorage.setItem('lastResultType', awoolimType);
            localStorage.setItem('lastMbtiType', mbtiType);
            localStorage.setItem('lastScores', JSON.stringify(state.scores));
            
            showResultScreen(resultData, state.scores, mbtiType);
        }, 2000);
    }
    
    // 어울림 유형 계산 로직
    function calculateAwoolimType() {
        const { lead, flow, expression, response } = state.scores;

        // 질문 풀에서 각 카테고리별 최대 점수 계산 (선택된 문항 기준)
        let leadMax = 0, flowMax = 0;
        activeQuizQuestions.forEach(q => {
            if (q.category === 'lead') leadMax += 5;
            if (q.category === 'flow') flowMax += 5;
        });

        // lead와 flow 점수 차이가 전체의 15% 미만으로 균형잡힌 경우 '밸런서형(LC)'
        if (Math.abs(lead - flow) < (leadMax + flowMax) * 0.15) {
            return 'LC';
        }

        const lf = lead > flow ? 'L' : 'F';
        const er = expression > response ? 'E' : 'R';
        let type = lf + er;

        // 특수 유형 보정
        // LE 유형인데, lead 점수가 flow 점수보다 월등히 높으면(2배 이상) '쇼맨형(LP)'으로 보정
        if (type === 'LE' && flow > 0 && lead / flow > 2) {
            type = 'LP';
        }

        return type;
    }

    // MBTI 유형을 계산하는 함수
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

    // 페이지 로드 시 URL을 확인하여 결과 화면을 바로 보여주는 함수
    function onPageLoad() {
        const hash = window.location.hash.substring(1);
        if (hash.includes('result=')) {
            const params = new URLSearchParams(hash);
            const resultType = params.get('result');
            const mbtiType = params.get('mbti');
            const scoresParam = params.get('scores');
            
            let scores = null;
            if (scoresParam) {
                const scoreValues = scoresParam.split(',').map(Number);
                if (scoreValues.length === 8) {
                    scores = {
                        lead: scoreValues[0], flow: scoreValues[1], expression: scoreValues[2], response: scoreValues[3],
                        ei: scoreValues[4], sn: scoreValues[5], tf: scoreValues[6], jp: scoreValues[7]
                    };
                }
            }
            if (resultsData[resultType]) {
                showResultScreen(resultsData[resultType], scores, mbtiType);
            }
        }
    }

    // 퀴즈를 다시 시작하는 함수
    function restartQuiz() {
        resetTheme();
        history.replaceState(null, '', window.location.pathname);
        location.reload();
    }

    // 전역 스코프에 함수 노출
    window.startQuiz = startQuiz;
    window.goToNextQuestion = goToNextQuestion;
    window.goToPreviousQuestion = goToPreviousQuestion;
    window.restartQuiz = restartQuiz;

    // 페이지 로드 완료 시 이벤트 리스너 등록
    window.addEventListener('load', () => {
        initializeUIEventListeners();
        onPageLoad();
    });

})();



