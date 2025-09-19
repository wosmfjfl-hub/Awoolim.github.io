// HTML 요소를 가져와 변수에 할당합니다.
const introContainer = document.querySelector('.intro-container');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const startBtn = document.getElementById('start-btn');
const questionBox = document.getElementById('question-box');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');

// 검사에 사용될 질문 데이터 배열입니다.
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
        question: "13. 팀의 전체 흐름과 분위기를 섬세하게 읽어 조율한다.",
        category: "lc",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "14. 리더 역할에서 장기적 신뢰와 관계를 중시한다.",
        category: "lc",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "15. 리더 역할에서 강력한 에너지와 즉각적 몰입을 선호한다.",
        category: "lp",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "16. 팀의 목표 달성을 위해 표현적 몰입을 유도한다.",
        category: "lp",
        options: [
            { text: "매우 아니다", score: 1 },
            { text: "아니다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    }
];

// 현재 질문 인덱스와 각 항목의 점수를 저장하는 변수입니다.
let currentQuestionIndex = 0;
let scores = {
    lead: 0,
    flow: 0,
    expression: 0,
    response: 0,
    lc: 0,
    lp: 0
};

// 질문을 화면에 표시하는 함수입니다.
function showQuestion(question) {
    questionBox.innerHTML = `<h2>${question.question}</h2>`;
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('answer-btn');
        button.dataset.score = option.score;
        button.dataset.category = question.category;
        questionBox.appendChild(button);
    });
}

// 다음 질문으로 넘어가거나 결과를 보여주는 함수입니다.
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

// 최종 결과를 계산하고 화면에 표시하는 함수입니다.
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let resultType = '';
    let resultDescriptionHTML = '';

    // 주요 성향 점수 계산
    const totalLeadScore = scores.lead;
    const totalFlowScore = scores.flow;
    const totalExpressionScore = scores.expression;
    const totalResponseScore = scores.response;
    const totalLpScore = scores.lp;
    const totalLcScore = scores.lc;

    const combinedScore = totalLpScore + totalLcScore;
    const combinedThreshold = 12;

    // 복합형 문항 점수에 따라 순수형/복합형을 결정합니다.
    if (combinedScore < combinedThreshold) {
        // 순수형 결과
        if (totalLeadScore > totalFlowScore) {
            // L 유형의 순수형: LE 또는 LR
            if (totalExpressionScore > totalResponseScore) {
                resultType = 'LE';
                resultDescriptionHTML = `
                    <h2>🔥 불꽃 리더 (L+E)</h2>
                    <p><strong>나는 불꽃 리더! 순간의 열정으로 팀을 밝히고 몰입시키는 점화자</strong></p>
                    <p>“순간의 열정으로 모두를 이끌어가는 점화자”</p>
                    <p>당신은 불꽃처럼 강렬하고, 어느 자리든 단숨에 주목받는 리더입니다.<br>
                    새로운 아이디어가 떠오르면 망설임 없이 행동으로 옮기며, 주변 사람들의 관심과 에너지를 순식간에 끌어올립니다.<br>
                    팀이 막막해 하거나 위기에 처했을 때도 당황하지 않고 앞장서서 방향을 제시하며, 짧은 시간 안에 분위기를 집중시키는 능력이 탁월합니다.<br>
                    순간적인 열정과 카리스마로 모두를 몰입하게 만들지만, 장기적인 계획이나 세부적인 조율은 다소 부족할 수 있습니다.<br>
                    그래서 불꽃 리더는 ‘순간의 힘’과 ‘즉각적인 몰입’을 팀에 불어넣는 존재이며, 주변 사람들에게 영감과 동기를 주는 역할을 합니다.</p>
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
                `;
            } else {
                resultType = 'LR';
                resultDescriptionHTML = `
                    <h2>🌱 뿌리 리더 (L+R)</h2>
                    <p><strong>나는 뿌리 리더! 팀의 기반을 단단히 다지며 안정감을 선사하는 리더</strong></p>
                    <p>“보이지 않는 곳에서 지탱하는 깊은 뿌리”</p>
                    <p>당신은 안정과 신뢰를 바탕으로 사람들을 조용히 이끄는 리더입니다.<br>
                    단기적인 성과보다 장기적인 흐름과 조직의 안정성을 중시하며, 팀이 흔들리지 않도록 든든한 기반을 마련합니다.<br>
                    위기 상황에서도 감정을 쉽게 드러내지 않고, 꾸준한 리듬과 체계적인 접근으로 팀을 이끌어가는 힘이 있습니다.<br>
                    당신의 존재 자체가 ‘안정감’과 ‘신뢰’를 전달하며, 주변 사람들은 그 힘을 바탕으로 더 자유롭게 움직일 수 있습니다.<br>
                    다만, 변화가 급격히 일어날 때 즉각적인 반응은 다소 느릴 수 있으며, 속도감 있는 결정이나 즉흥적 대응에는 약간 둔감할 수 있습니다.</p>
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
                `;
            }
        } else {
            // F 유형의 순수형: FE 또는 FR
            if (totalExpressionScore > totalResponseScore) {
                resultType = 'FE';
                resultDescriptionHTML = `
                    <h2>⚡ 에너자이저 (F+E)</h2>
                    <p><strong>나는 에너자이저! 팀 분위기를 활기차게 만들고 몰입을 이끄는 생동감 전도사</strong></p>
                    <p>“분위기를 끌어올리는 생동감의 전도사”</p>
                    <p>당신은 어디서든 활력을 불어넣는 에너자이저입니다.<br>
                    자유롭고 창의적인 발상으로 팀의 흐름을 신선하게 만들고, 상황에 따라 유연하게 반응하며 즉흥적으로 문제를 해결하는 능력을 지니고 있습니다.<br>
                    함께 있는 사람들에게 즐거움과 활기를 전달하며, 팀의 ‘분위기 메이커’로 자연스럽게 중심이 됩니다.<br>
                    당신이 있는 곳에는 활기가 넘치고, 주변 사람들은 에너지에 자극을 받아 더욱 몰입하게 됩니다.<br>
                    다만, 순간의 흥분과 다채로운 아이디어에 치중하다 보면 집중력이 떨어지거나 장기 계획과 현실적 제약을 간과할 수 있습니다.</p>
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
                `;
            } else {
                resultType = 'FR';
                resultDescriptionHTML = `
                    <h2>🌊 공명자 (F+R)</h2>
                    <p><strong>나는 공명자! 팀의 감정을 읽고 균형과 조화를 만드는 조율자</strong></p>
                    <p>“공감의 파동으로 울림을 만드는 조율자”</p>
                    <p>당신은 타인의 감정과 흐름을 민감하게 감지하며, 그 안에서 자연스럽게 균형을 찾아냅니다.<br>
                    상대의 이야기를 진심으로 경청하고, 갈등이나 오해가 생길 때 부드럽게 완화하며 팀을 하나로 묶는 능력이 탁월합니다.<br>
                    당신의 존재 자체가 안정감을 주며, 사람들은 당신과 함께 있을 때 편안함과 신뢰를 느낍니다.<br>
                    또한, 팀 내 다양한 의견과 감정을 조율하며 서로 연결되는 다리를 만들어내는 중요한 역할을 수행합니다.<br>
                    다만, 타인을 우선하다 보니 자기주장이 약해질 수 있고, 결정이 늦어지거나 우유부단해 보일 위험이 있습니다.</p>
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
                `;
            }
        }
    } else {
        // 복합형 결과
        if (totalLeadScore > totalFlowScore) {
            // L 유형의 복합형: LP 또는 LC
            if (totalLpScore >= totalLcScore) {
                resultType = 'LP';
                resultDescriptionHTML = `
                    <h2>🔥 강호동형 (LP)</h2>
                    <p><strong>나는 강호동형! 현장을 압도하고 몰입과 퍼포먼스로 팀을 이끄는 리더</strong></p>
                    <p>“현장을 압도하는 몰입과 퍼포먼스의 리더”</p>
                    <p>당신은 강력한 카리스마와 몰입으로 현장을 단숨에 장악하는 리더입니다.<br>
                    즉각적인 반응과 퍼포먼스로 팀과 주변 사람들을 몰입시키며, 위기 상황에서도 침착하게 임기응변으로 돌파할 수 있습니다.<br>
                    마치 무대를 이끄는 주인공처럼, 사람들의 시선과 에너지를 집중시키는 능력을 가지고 있으며, 팀 분위기를 단번에 끌어올립니다.<br>
                    순간적인 퍼포먼스와 에너지 전달에 탁월하지만, 세밀한 조율이나 장기 계획에서는 상대적으로 약할 수 있으며, 타인의 의견을 충분히 반영하지 못할 때가 있습니다.<br>
                    감정 기복이 큰 날에는 팀 분위기에 영향이 있을 수 있으니, 순간의 몰입과 장기적 조율을 균형 있게 관리하는 것이 중요합니다.</p>
                    <h3>강점</h3>
                    <ul>
                        <li>강력한 현장 장악력과 몰입으로 팀 집중력 극대화</li>
                        <li>에너지와 재미를 동시에 제공하며 팀 분위기를 활성화</li>
                        <li>위기 상황에서 빠르고 효과적인 임기응변 가능</li>
                    </ul>
                    <h3>보완점</h3>
                    <ul>
                        <li>장기 계획과 세밀한 조율에는 다소 약함</li>
                        <li>타인 의견을 충분히 반영하지 못할 가능성</li>
                        <li>감정 기복이 팀 분위기에 영향을 줄 수 있음</li>
                    </ul>
                `;
            } else {
                resultType = 'LC';
                resultDescriptionHTML = `
                    <h2>🌬️ 유재석형 (LC)</h2>
                    <p><strong>나는 유재석형! 유연하게 흐름을 조율하며 팀에 안정과 신뢰를 주는 리더</strong></p>
                    <p>“바람처럼 유연하게 흐름을 조율하는 리더”</p>
                    <p>당신은 균형 잡힌 리더십을 가진 조율자로, 누구와도 자연스럽게 어울리며 주변 사람들에게 편안함과 신뢰를 줍니다.<br>
                    중립성과 유연성을 바탕으로 팀의 장기적인 흐름과 안정성을 관리하며, 꾸준히 성과를 만들어 내는 능력이 뛰어납니다.<br>
                    위기 상황에서도 침착하게 조율하며, 팀의 다양한 의견과 감정을 조화롭게 연결할 수 있습니다.<br>
                    순간적 주도권이나 강렬한 카리스마는 약할 수 있지만, 장기적 관점에서 안정적인 성과를 내고, 팀원들이 자연스럽게 따르게 만드는 힘이 있습니다.</p>
                    <h3>강점</h3>
                    <ul>
                        <li>균형 잡힌 조율과 팀 내 신뢰 구축</li>
                        <li>장기적 흐름에서 안정적 성과 창출</li>
                        <li>다양한 의견과 상황을 유연하게 연결하며 팀을 조화롭게 운영</li>
                    </ul>
                    <h3>보완점</h3>
                    <ul>
                        <li>즉각적 결단이 필요한 상황에서는 다소 지연될 수 있음</li>
                        <li>개성이 강한 리더 스타일에 비해 주목도가 낮을 수 있음</li>
                        <li>순간적 주도권이나 단기 몰입 상황에서 약점이 될 수 있음</li>
                    </ul>
                `;
            }
        } else {
            // F 유형의 복합형: FE 또는 FR
            if (totalExpressionScore > totalResponseScore) {
                resultType = 'FE';
                resultDescriptionHTML = `
                    <h2>⚡ 에너자이저 (F+E)</h2>
                    <p><strong>나는 에너자이저! 팀 분위기를 활기차게 만들고 몰입을 이끄는 생동감 전도사</strong></p>
                    <p>“분위기를 끌어올리는 생동감의 전도사”</p>
                    <p>당신은 어디서든 활력을 불어넣는 에너자이저입니다.<br>
                    자유롭고 창의적인 발상으로 팀의 흐름을 신선하게 만들고, 상황에 따라 유연하게 반응하며 즉흥적으로 문제를 해결하는 능력을 지니고 있습니다.<br>
                    함께 있는 사람들에게 즐거움과 활기를 전달하며, 팀의 ‘분위기 메이커’로 자연스럽게 중심이 됩니다.<br>
                    당신이 있는 곳에는 활기가 넘치고, 주변 사람들은 에너지에 자극을 받아 더욱 몰입하게 됩니다.<br>
                    다만, 순간의 흥분과 다채로운 아이디어에 치중하다 보면 집중력이 떨어지거나 장기 계획과 현실적 제약을 간과할 수 있습니다.</p>
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
                `;
            } else {
                resultType = 'FR';
                resultDescriptionHTML = `
                    <h2>🌊 공명자 (F+R)</h2>
                    <p><strong>나는 공명자! 팀의 감정을 읽고 균형과 조화를 만드는 조율자</strong></p>
                    <p>“공감의 파동으로 울림을 만드는 조율자”</p>
                    <p>당신은 타인의 감정과 흐름을 민감하게 감지하며, 그 안에서 자연스럽게 균형을 찾아냅니다.<br>
                    상대의 이야기를 진심으로 경청하고, 갈등이나 오해가 생길 때 부드럽게 완화하며 팀을 하나로 묶는 능력이 탁월합니다.<br>
                    당신의 존재 자체가 안정감을 주며, 사람들은 당신과 함께 있을 때 편안함과 신뢰를 느낍니다.<br>
                    또한, 팀 내 다양한 의견과 감정을 조율하며 서로 연결되는 다리를 만들어내는 중요한 역할을 수행합니다.<br>
                    다만, 타인을 우선하다 보니 자기주장이 약해질 수 있고, 결정이 늦어지거나 우유부단해 보일 위험이 있습니다.</p>
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
                `;
            }
        }
    }

    resultTitle.innerText = `당신의 성향은 ${resultType}입니다!`;
    resultDescription.innerHTML = resultDescriptionHTML;
}

// '검사 시작하기' 버튼에 클릭 이벤트를 추가합니다.
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // 인트로 페이지를 숨기고, 검사 페이지를 보여줍니다.
        introContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion(questions[currentQuestionIndex]);
    });
}

// '다음' 버튼에 클릭 이벤트를 추가합니다.
nextBtn.addEventListener('click', () => {
    const selectedBtn = document.querySelector('.answer-btn.selected');
    if (selectedBtn) {
        // 선택된 답변의 점수를 계산에 반영합니다.
        const score = parseInt(selectedBtn.dataset.score);
        const category = selectedBtn.dataset.category;
        scores[category] += score;
        
        handleNextButton();
    } else {
        alert("답변을 선택해주세요!");
    }
});

// 답변 버튼에 클릭 이벤트를 추가합니다.
questionBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('answer-btn')) {
        // 기존에 선택된 버튼의 'selected' 클래스를 제거합니다.
        const selectedBtn = document.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            selectedBtn.classList.remove('selected');
        }
        // 새로 클릭된 버튼에 'selected' 클래스를 추가합니다.
        e.target.classList.add('selected');
    }
});

// '다시 시작하기' 버튼에 클릭 이벤트를 추가합니다.
restartBtn.addEventListener('click', () => {
    // 모든 변수를 초기화하고 검사를 다시 시작합니다.
    currentQuestionIndex = 0;
    scores = {
        lead: 0,
        flow: 0,
        expression: 0,
        response: 0,
        lc: 0,
        lp: 0
    };
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
});
