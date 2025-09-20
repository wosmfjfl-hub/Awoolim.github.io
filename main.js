// main.js

// IIFE로 전체 코드를 감싸 전역 스코프 보호
(function() {
    // 퀴즈 상태 변수
    let state = {
        currentQuestionIndex: 0,
        scores: { lead: 0, flow: 0, expression: 0, response: 0 },
        answerHistory: []
    };

    // 퀴즈 시작 함수
    function startQuiz() {
        state.currentQuestionIndex = 0;
        state.scores = { lead: 0, flow: 0, expression: 0, response: 0 };
        state.answerHistory = [];
        
        showQuizScreen(); // ui.js 함수 호출
        renderQuestion(questions[state.currentQuestionIndex], null); // ui.js 함수 호출
        updateProgressBar(state.currentQuestionIndex, questions.length); // ui.js 함수 호출
    }

    // 다음 질문으로 이동
    function goToNextQuestion(selectedScore, selectedCategory) {
        // 현재 답변 기록
        state.answerHistory[state.currentQuestionIndex] = { score: selectedScore, category: selectedCategory };
        state.scores[selectedCategory] += selectedScore;
        
        state.currentQuestionIndex++;
        
        updateProgressBar(state.currentQuestionIndex, questions.length); // ui.js 함수 호출
        
        if (state.currentQuestionIndex < questions.length) {
            const previousAnswer = state.answerHistory[state.currentQuestionIndex];
            renderQuestion(questions[state.currentQuestionIndex], previousAnswer); // ui.js 함수 호출
        } else {
            finishQuiz();
        }
    }

    // 이전 질문으로 이동
    function goToPreviousQuestion() {
        if (state.currentQuestionIndex > 0) {
            // 마지막 답변 기록 제거 및 점수 복원
            const lastAnswer = state.answerHistory.pop();
            if (lastAnswer) {
                state.scores[lastAnswer.category] -= lastAnswer.score;
            }
            state.currentQuestionIndex--;

            updateProgressBar(state.currentQuestionIndex, questions.length); // ui.js 함수 호출
            
            const previousAnswer = state.answerHistory[state.currentQuestionIndex];
            renderQuestion(questions[state.currentQuestionIndex], previousAnswer); // ui.js 함수 호출
        }
    }

    // 퀴즈 종료 및 결과 표시 (로딩 화면 추가)
    function finishQuiz() {
        showLoadingScreen(); // 로딩 화면 표시

        // 2초 후 결과 표시 (분석하는 것처럼 보이게 함)
        setTimeout(() => {
            const resultType = calculateResultType();
            const resultData = resultsData[resultType];
            
            history.pushState(null, '', `#result=${resultType}`);
            
            showResultScreen(resultData, state.scores);
        }, 2000); // 2000ms = 2초
    }

    // 결과 유형 계산 로직
    function calculateResultType() {
        const { lead, flow, expression, response: resp } = state.scores;

        const leadQuestionCount = questions.filter(q => q.category === 'lead').length;
        const flowQuestionCount = questions.filter(q => q.category === 'flow').length;
        
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

    // 페이지 로드 시 URL 해시 확인
    function checkUrlForResults() {
        const hash = window.location.hash;
        if (hash.startsWith('#result=')) {
            const resultType = hash.substring(8);
            if (resultsData[resultType]) {
                showResultScreen(resultsData[resultType], null); // 점수 데이터 없이 결과 화면만 표시
            }
        }
    }

    // 이벤트 리스너 연결 (ui.js에 정의된 함수 사용)
    function initialize() {
        bindStartButton(startQuiz);
        bindNextButton(goToNextQuestion);
        bindBackButton(goToPreviousQuestion);
        bindRestartButton(() => location.reload()); // 간단한 기능은 직접 정의
        bindCopyButton();
        bindShareButtons();
        
        window.addEventListener('load', checkUrlForResults);
    }
    
    initialize(); // 초기화 함수 실행
})();