// Get a reference to all the HTML elements we'll be interacting with
const introContainer = document.querySelector('.intro-container');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const startBtn = document.getElementById('start-btn');
const questionBox = document.getElementById('question-box');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const copyBtn = document.getElementById('copy-btn');
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const progressBar = document.getElementById('progressBar');
const quizInfoMessage = document.getElementById('quiz-info-message');

// The quiz questions and their corresponding categories
const questions = [
    {
        question: "1. 모임에서 자연스럽게 중심을 잡고 의견을 제시한다.",
        category: "lead",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "2. 문제 발생 시 먼저 해결책을 제시한다.",
        category: "lead",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "3. 팀의 방향이나 결정을 주도하는 역할을 즐긴다.",
        category: "lead",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "4. 나는 다른 사람의 의견을 따라가며 조화를 이루는 편이다.",
        category: "flow",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "5. 팀에서 안정적이고 조화로운 역할을 맡는 것이 편하다.",
        category: "flow",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "6. 주도권보다는 팀 흐름에 맞추어 움직이는 것이 더 편하다.",
        category: "flow",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "7. 내 감정과 생각을 바로 말하거나 행동으로 표현한다.",
        category: "expression",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "8. 단기적 성과나 눈에 보이는 결과가 나를 동기부여한다.",
        category: "expression",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "9. 중요한 의견이 있으면 바로 공유하는 편이다.",
        category: "expression",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "10. 상황과 사람들의 신호를 살피고 세심하게 대응한다.",
        category: "response",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "11. 장기적 신뢰와 관계 안정이 나를 더 중시하게 한다.",
        category: "response",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "12. 다른 사람의 감정과 분위기를 먼저 살피고 대응하는 편이다.",
        category: "response",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "13. 나는 다른 사람들에게 활기차고 재미있는 사람으로 인식되는 편이다.",
        category: "expression",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "14. 나는 다른 사람들에게 진지하고 책임감 있는 사람으로 인식되는 편이다.",
        category: "response",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "15. 나는 갈등 상황에서 '중재자' 역할을 맡는 경우가 많다.",
        category: "flow",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "16. 나는 팀에서 '주도자' 역할을 맡는 경우가 많다.",
        category: "lead",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "17. 팀 프로젝트에서 새로운 아이디어를 제시하고 실행하는 것을 즐긴다.",
        category: "lead",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "18. 나는 팀의 안정적인 관계를 유지하는 것이 성과보다 더 중요하다고 생각한다.",
        category: "flow",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "19. 팀원 간 갈등이 생기면, 직접 나서서 문제를 해결하려고 한다.",
        category: "lead",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    },
    {
        question: "20. 갈등이 생기면, 상대방의 감정을 먼저 살피고 공감하려 노력한다.",
        category: "flow",
        options: [
            { text: "매우 그렇다", score: 5 },
            { text: "그렇다", score: 4 },
            { text: "보통이다", score: 3 },
            { text: "아니다", score: 2 },
            { text: "매우 아니다", score: 1 }
        ]
    }
];

// Variables to track the quiz's state
let currentQuestionIndex = 0;
let scores = {
    lead: 0,
    flow: 0,
    expression: 0,
    response: 0
};

/**
 * Resets the quiz to its initial state.
 */
function resetQuiz() {
    currentQuestionIndex = 0;
    scores = {
        lead: 0,
        flow: 0,
        expression: 0,
        response: 0
    };
    nextBtn.disabled = true; // Disable the "Next" button initially
    resultContainer.style.display = 'none';
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
}

/**
 * Displays the current question on the screen.
 * @param {object} question - The question object containing the question text and options.
 */
function showQuestion(question) {
    questionBox.innerHTML = '';
    const questionTitle = document.createElement('h2');
    questionTitle.innerText = question.question;
    questionBox.appendChild(questionTitle);

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('answer-btn');
        button.dataset.score = option.score;
        button.dataset.category = question.category;
        questionBox.appendChild(button);
    });
    nextBtn.disabled = true; // Disable the button until an answer is selected
}

/**
 * Calculates and displays the final result of the quiz.
 */
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let resultType = '';
    let resultDescriptionHTML = '';
    let resultIconChar = '';

    // Calculate total scores for each category
    const totalLeadScore = scores.lead;
    const totalFlowScore = scores.flow;
    const totalExpressionScore = scores.expression;
    const totalResponseScore = scores.response;
    
    // Determine the result based on the scores
    const combinedThreshold = 45;

    if (totalLeadScore >= 15 && totalFlowScore >= 15) { // Check for complex types
        if (totalExpressionScore > totalResponseScore) {
            resultType = 'LP';
            resultIconChar = '🔥';
            resultDescriptionHTML = `
                <h2>🔥 강호동형 (LP)</h2>
                <p><strong>나는 강호동형! 현장을 압도하고 몰입과 퍼포먼스로 팀을 이끄는 리더</strong></p>
                <p>“현장을 압도하는 몰입과 퍼포먼스의 리더”</p>
                <p>당신은 강력한 카리스마와 몰입으로 현장을 단숨에 장악하는 리더입니다. 즉각적인 반응과 퍼포먼스로 팀과 주변 사람들을 몰입시키며, 위기 상황에서도 침착하게 임기응변으로 돌파할 수 있습니다. 마치 무대를 이끄는 주인공처럼, 사람들의 시선과 에너지를 집중시키는 능력을 가지고 있으며, 팀 분위기를 단번에 끌어올립니다. 순간적인 퍼포먼스와 에너지 전달에 탁월하며, 팀의 활력을 끌어올려 단기적인 성과를 내는 데 가장 큰 강점이 있습니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>강력한 현장 장악력과 몰입으로 팀 집중력 극대화</li>
                    <li>에너지와 재미를 동시에 제공하며 팀 분위기를 활성화</li>
                    <li>위기 상황에서 빠르고 효과적인 임기응변 가능</li>
                </ul>
                <h3>🔥 다른 유형과의 시너지</h3>
                <p>강호동형은 리더들이 지쳤을 때 나서서 팀의 에너지를 끌어올리고, 유연하게 돌아가는 시스템을 만들 수 있도록 돕습니다. 특히 **뿌리 리더(L+R)**와 함께하면, 강력한 추진력을 바탕으로 새로운 목표에 도전할 수 있습니다. 이처럼 강호동형은 단단한 기반 위에서 팀의 성장 동력을 확보하는 핵심적인 역할을 수행합니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>강력한 카리스마가 때로는 팀원들에게 압박이 될 수 있습니다. 개개인의 의견을 경청하고 반영하는 노력을 통해 진정한 리더십을 발휘하세요.</p>
            `;
        } else {
            resultType = 'LC';
            resultIconChar = '🌬️';
            resultDescriptionHTML = `
                <h2>🌬️ 유재석형 (LC)</h2>
                <p><strong>나는 유재석형! 유연하게 흐름을 조율하며 팀에 안정과 신뢰를 주는 리더</strong></p>
                <p>“바람처럼 유연하게 흐름을 조율하는 리더”</p>
                <p>당신은 균형 잡힌 리더십을 가진 조율자로, 누구와도 자연스럽게 어울리며 주변 사람들에게 편안함과 신뢰를 줍니다. 중립성과 유연성을 바탕으로 팀의 장기적인 흐름과 안정성을 관리하며, 꾸준히 성과를 만들어 내는 능력이 뛰어납니다. 위기 상황에서도 침착하게 조율하며, 팀의 다양한 의견과 감정을 조화롭게 연결할 수 있습니다. 순간적인 주도권이나 단기적인 몰입보다, 장기적인 관점에서 팀의 지속적인 성장과 안정성을 확보하는 데 가장 큰 강점이 있습니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>균형 잡힌 조율과 팀 내 신뢰 구축</li>
                    <li>장기적 흐름에서 안정적 성과 창출</li>
                    <li>다양한 의견과 상황을 유연하게 연결하며 팀을 조화롭게 운영</li>
                </ul>
                <h3>🌬️ 다른 유형과의 시너지</h3>
                <p>유재석형은 강호동형이 에너지를 모두 쏟아냈을 때, 팀의 중심을 잡아주고 장기적인 안정성을 확보하는 역할을 합니다. 특히 **불꽃 리더(L+E)**와 함께하면, 불꽃 리더의 추진력이 지나쳐 장기적 성과를 놓치는 것을 막고, 팀원들의 의견을 모아 균형 잡힌 방향으로 나아가도록 조율합니다. 유재석형은 팀이 지치거나 갈등을 겪을 때 나서서 팀의 에너지를 회복시키는 중요한 역할을 수행합니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>조율자의 역할에 너무 몰입하다 보면 결정이 늦어질 수 있습니다. 때로는 신중함보다 빠른 결단이 필요하다는 것을 기억하고, 주도적으로 의사를 결정하는 훈련을 해보세요.</p>
            `;
        }
    } else if (totalLeadScore > totalFlowScore) {
        if (totalExpressionScore > totalResponseScore) {
            resultType = 'LE';
            resultIconChar = '🔥';
            resultDescriptionHTML = `
                <h2>🔥 불꽃 리더 (L+E)</h2>
                <p><strong>나는 불꽃 리더! 순간의 열정으로 팀을 밝히고 몰입시키는 점화자</strong></p>
                <p>“순간의 열정으로 모두를 이끌어가는 점화자”</p>
                <p>당신은 불꽃처럼 강렬하고, 어느 자리든 단숨에 주목받는 리더입니다. 새로운 아이디어가 떠오르면 망설임 없이 행동으로 옮기며, 주변 사람들의 관심과 에너지를 순식간에 끌어올립니다. 팀이 막막해 하거나 위기에 처했을 때도 당황하지 않고 앞장서서 방향을 제시하며, 짧은 시간 안에 분위기를 집중시키는 능력이 탁월합니다. 순간적인 열정과 카리스마로 모두를 몰입하게 만들지만, 장기적인 계획이나 세부적인 조율은 다소 부족할 수 있습니다. 그래서 불꽃 리더는 **‘순간의 힘’과 ‘즉각적인 몰입’**을 팀에 불어넣는 존재이며, 주변 사람들에게 영감과 동기를 주는 역할을 합니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>빠른 실행력과 결정력으로 팀의 에너지를 즉시 끌어올림</li>
                    <li>자연스럽게 분위기를 주도하고, 사람들이 따르게 만드는 매력</li>
                    <li>위기 상황에서도 두려움 없이 앞장서며 해결책을 제시</li>
                </ul>
                <h3>보완점</h3>
                <ul>
                    <li>장기 계획과 지속적인 관리에는 주의 필요</li>
                    <li>지나친 성급함으로 팀 의견을 충분히 듣지 못할 수 있음</li>
                    <li>순간의 몰입에 치중해 장기적 성과를 놓칠 위험</li>
                </ul>
                <h3>🔥 다른 유형과의 시너지</h3>
                <p>불꽃 리더는 **뿌리 리더(L+R)**의 장기적인 안정감과 만나면, 불꽃처럼 타오르는 에너지가 지속 가능한 성과로 이어질 수 있습니다. 팀이 지칠 때 서로 역할을 바꾸며 유기적으로 순환할 때 가장 큰 시너지를 냅니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>순간의 열정뿐 아니라 장기적인 목표를 세우는 연습을 해보세요. 팀원들의 의견을 충분히 듣고 의사결정하는 습관을 들이는 것도 좋습니다.</p>
            `;
        } else {
            resultType = 'LR';
            resultIconChar = '🌱';
            resultDescriptionHTML = `
                <h2>🌱 뿌리 리더 (L+R)</h2>
                <p><strong>나는 뿌리 리더! 팀의 기반을 단단히 다지며 안정감을 선사하는 리더</strong></p>
                <p>“보이지 않는 곳에서 지탱하는 깊은 뿌리”</p>
                <p>당신은 안정과 신뢰를 바탕으로 사람들을 조용히 이끄는 리더입니다. 단기적인 성과보다 장기적인 흐름과 조직의 안정성을 중시하며, 팀이 흔들리지 않도록 든든한 기반을 마련합니다. 위기 상황에서도 감정을 쉽게 드러내지 않고, 꾸준한 리듬과 체계적인 접근으로 팀을 이끌어가는 힘이 있습니다. 당신의 존재 자체가 **‘안정감’과 ‘신뢰’**를 전달하며, 주변 사람들은 그 힘을 바탕으로 더 자유롭게 움직일 수 있습니다. 다만, 변화가 급격히 일어날 때 즉각적인 반응은 다소 느릴 수 있으며, 속도감 있는 결정이나 즉흥적 대응에는 약간 둔감할 수 있습니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>장기적인 전략 수립과 계획에 강함</li>
                    <li>팀원과 조직의 신뢰를 꾸준히 구축</li>
                    <li>흔들림 없는 안정적 리더십으로 팀의 중심 역할</li>
                </ul>
                <h3>보완점</h3>
                <ul>
                    <li>급격한 변화나 돌발 상황에 즉각적 대응이 부족할 수 있음</li>
                    <li>속도감 있는 의사결정보다 체계와 안정에 집중</li>
                    <li>순간적 몰입이나 즉각적 에너지 발산에는 상대적으로 약함</li>
                </ul>
                <h3>🌱 다른 유형과의 시너지</h3>
                <p>뿌리 리더는 **불꽃 리더(L+E)**의 강렬한 추진력을 바탕으로 새로운 도전을 시도할 수 있습니다. 불꽃 리더가 지칠 때 뿌리 리더가 나서서 팀의 안정적인 흐름을 유지합니다. 두 리더가 서로의 장점을 존중하며 역할을 순환할 때, 팀은 단기적 성과와 장기적 성장을 모두 잡을 수 있습니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>급격한 변화나 돌발 상황에 대비해 빠른 판단력을 기르는 연습을 해보세요. 당신의 조언이 팀에 큰 도움이 될 수 있으니, 자신 있게 의견을 표현하는 훈련도 필요합니다.</p>
            `;
        }
    } else { // F Type
        if (totalExpressionScore > totalResponseScore) {
            resultType = 'FE';
            resultIconChar = '⚡';
            resultDescriptionHTML = `
                <h2>⚡ 에너자이저 (F+E)</h2>
                <p><strong>나는 에너자이저! 팀 분위기를 활기차게 만들고 몰입을 이끄는 생동감 전도사</strong></p>
                <p>“분위기를 끌어올리는 생동감의 전도사”</p>
                <p>당신은 어디서든 활력을 불어넣는 에너자이저입니다. 자유롭고 창의적인 발상으로 팀의 흐름을 신선하게 만들고, 상황에 따라 유연하게 반응하며 즉흥적으로 문제를 해결하는 능력을 지니고 있습니다. 함께 있는 사람들에게 즐거움과 활기를 전달하며, 팀의 ‘분위기 메이커’로 자연스럽게 중심이 됩니다. 당신이 있는 곳에는 활기가 넘치고, 주변 사람들은 에너지에 자극을 받아 더욱 몰입하게 됩니다. 다만, 순간의 흥분과 다채로운 아이디어에 치중하다 보면 집중력이 떨어지거나 장기 계획과 현실적 제약을 간과할 수 있습니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>활력과 긍정적 에너지를 팀 전체로 확산</li>
                    <li>창의적이고 즉흥적인 아이디어로 문제 해결 가능</li>
                    <li>유연하게 상황을 읽고 적응하며 팀을 자연스럽게 이끌 수 있음</li>
                </ul>
                <h3>보완점</h3>
                <ul>
                    <li>계획적 접근과 장기적 집중력이 상대적으로 약함</li>
                    <li>현실적 제약이나 규칙을 놓칠 수 있음</li>
                    <li>순간적 에너지에 의존하다가 피로가 쌓일 수 있음</li>
                </ul>
                <h3>⚡ 다른 유형과의 시너지</h3>
                <p>에너자이저는 **공명자(F+R)**의 섬세한 조율 능력과 만나면 더욱 빛을 발합니다. 공명자가 팀의 감정선을 읽고 조화를 만들어낼 때, 에너자이저는 활력을 불어넣어 팀의 사기를 높여줍니다. 서로의 강점을 보완하며, 팀 전체가 감정적, 심리적으로 안정된 상태에서 능동적으로 움직일 수 있도록 돕습니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>흥분과 즉흥성보다는 장기적인 계획과 현실적인 제약을 고려하는 습관을 들이세요. 당신의 에너지를 효과적으로 분배하여 지속 가능한 활력을 유지하는 것이 중요합니다.</p>
            `;
        } else {
            resultType = 'FR';
            resultIconChar = '🌊';
            resultDescriptionHTML = `
                <h2>🌊 공명자 (F+R)</h2>
                <p><strong>나는 공명자! 팀의 감정을 읽고 균형과 조화를 만드는 조율자</strong></p>
                <p>“공감의 파동으로 울림을 만드는 조율자”</p>
                <p>당신은 타인의 감정과 흐름을 민감하게 감지하며, 그 안에서 자연스럽게 균형을 찾아냅니다. 상대의 이야기를 진심으로 경청하고, 갈등이나 오해가 생길 때 부드럽게 완화하며 팀을 하나로 묶는 능력이 탁월합니다. 당신의 존재 자체가 안정감을 주며, 사람들은 당신과 함께 있을 때 편안함과 신뢰를 느낍니다. 또한, 팀 내 다양한 의견과 감정을 조율하며 서로 연결되는 다리를 만들어내는 중요한 역할을 수행합니다. 다만, 타인을 우선하다 보니 자기주장이 약해질 수 있고, 결정이 늦어지거나 우유부단해 보일 위험이 있습니다.</p>
                <h3>강점</h3>
                <ul>
                    <li>높은 공감 능력으로 팀원과 조직의 심리적 안정에 기여</li>
                    <li>갈등 상황에서 부드럽게 조율하며 협력적 분위기 조성</li>
                    <li>사람들을 하나로 연결하고 신뢰를 구축하는 능력</li>
                </ul>
                <h3>보완점</h3>
                <ul>
                    <li>자기주장이 약해 핵심 결정에서 밀릴 수 있음</li>
                    <li>결정 지연이나 우유부단으로 속도가 느려질 수 있음</li>
                    <li>과도한 배려로 자신의 목표나 의견을 충분히 표현하지 못할 위험</li>
                </ul>
                <h3>🌊 다른 유형과의 시너지</h3>
                <p>공명자는 **에너자이저(F+E)**의 폭발적인 에너지와 만나면, 팀의 역동성이 극대화됩니다. 공명자가 팀의 안정감을 확보하면, 에너자이저가 그 안정감 위에서 자유롭게 활력을 불어넣을 수 있게 됩니다.</p>
                <h3>📈 성장 & 자기 계발 조언</h3>
                <p>타인의 감정을 살피는 만큼, 자신의 목표와 의견을 명확하게 표현하는 연습을 해보세요. 중요한 결정이 필요할 때는 신중하되, 너무 오래 망설이지 않고 결단하는 힘을 길러야 합니다.</p>
            `;
        }
    }

    resultIcon.innerText = resultIconChar;
    resultTitle.innerText = `당신의 성향은 ${resultType}입니다!`;
    resultDescription.innerHTML = resultDescriptionHTML;
}

/**
 * Updates the progress bar based on the current question index.
 */
function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// --- Event Listeners ---

// Handle the "Start" button click
startBtn.addEventListener('click', () => {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    // Show and hide the info message
    quizInfoMessage.classList.remove('hidden');
    setTimeout(() => {
        quizInfoMessage.classList.add('hidden');
    }, 3000);

    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
});

// Handle the "Next" button click
nextBtn.addEventListener('click', () => {
    const selectedBtn = document.querySelector('.answer-btn.selected');
    if (selectedBtn) {
        // Add the score of the selected answer
        const score = parseInt(selectedBtn.dataset.score);
        const category = selectedBtn.dataset.category;
        scores[category] += score;
        
        currentQuestionIndex++;
        updateProgressBar();
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResult();
        }
    } else {
        alert("답변을 선택해주세요!");
    }
});

// Handle clicks on answer buttons
questionBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('answer-btn')) {
        const selectedBtn = document.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            selectedBtn.classList.remove('selected');
        }
        e.target.classList.add('selected');
        nextBtn.disabled = false; // Enable the "Next" button once an option is selected
    }
});

// Handle the "Restart" button click
restartBtn.addEventListener('click', () => {
    resetQuiz();
});

// Handle the "Copy Result" button click
copyBtn.addEventListener('click', () => {
    const resultText = `
        Awoolim Type Test (ATT) 결과: ${resultTitle.innerText}
        ${resultDescription.innerText}
    `.trim();

    navigator.clipboard.writeText(resultText).then(() => {
        alert("결과가 클립보드에 복사되었습니다!");
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
    });
});
