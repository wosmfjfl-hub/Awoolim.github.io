// 모든 코드를 즉시 실행 함수(IIFE)로 감싸서 전역 스코프 오염 방지
(function() {
    // HTML 요소 참조
    const introContainer = document.getElementById('intro-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const questionBox = document.getElementById('question-box');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const progressBar = document.getElementById('progressBar');
    const shareKakao = document.getElementById('share-kakao');
    const shareFacebook = document.getElementById('share-facebook');
    const shareTwitter = document.getElementById('share-twitter');

    // 퀴즈 데이터 (수정 없음)
    const questions = [
        { question: "1. 모임에서 자연스럽게 중심을 잡고 의견을 제시한다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "2. 문제 발생 시 먼저 해결책을 제시한다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "3. 팀의 방향이나 결정을 주도하는 역할을 즐긴다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "4. 나는 다른 사람의 의견을 따라가며 조화를 이루는 편이다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "5. 팀에서 안정적이고 조화로운 역할을 맡는 것이 편하다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "6. 주도권보다는 팀 흐름에 맞추어 움직이는 것이 더 편하다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "7. 내 감정과 생각을 바로 말하거나 행동으로 표현한다.", category: "expression", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "8. 단기적 성과나 눈에 보이는 결과가 나를 동기부여한다.", category: "expression", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "9. 중요한 의견이 있으면 바로 공유하는 편이다.", category: "expression", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "10. 상황과 사람들의 신호를 살피고 세심하게 대응한다.", category: "response", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "11. 장기적 신뢰와 관계 안정이 나를 더 중시하게 한다.", category: "response", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "12. 다른 사람의 감정과 분위기를 먼저 살피고 대응하는 편이다.", category: "response", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "13. 나는 다른 사람들에게 활기차고 재미있는 사람으로 인식되는 편이다.", category: "expression", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "14. 나는 다른 사람들에게 진지하고 책임감 있는 사람으로 인식되는 편이다.", category: "response", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "15. 나는 갈등 상황에서 '중재자' 역할을 맡는 경우가 많다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "16. 나는 팀에서 '주도자' 역할을 맡는 경우가 많다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "17. 팀 프로젝트에서 새로운 아이디어를 제시하고 실행하는 것을 즐긴다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "18. 나는 팀의 안정적인 관계를 유지하는 것이 성과보다 더 중요하다고 생각한다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "19. 팀원 간 갈등이 생기면, 직접 나서서 문제를 해결하려고 한다.", category: "lead", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] },
        { question: "20. 갈등이 생기면, 상대방의 감정을 먼저 살피고 공감하려 노력한다.", category: "flow", options: [{ text: "매우 아니다", score: 1 }, { text: "아니다", score: 2 }, { text: "보통이다", score: 3 }, { text: "그렇다", score: 4 }, { text: "매우 그렇다", score: 5 }] }
    ];

    // 결과 데이터
    const resultsData = {
        'LP': {
            icon: '🔥',
            title: '강호동형 (LP)',
            description: '현장을 압도하고 몰입과 퍼포먼스로 팀을 이끄는 리더',
            details: [
                { type: 'h2', content: '현장을 압도하고 몰입과 퍼포먼스로 팀을 이끄는 리더' },
                { type: 'p', content: '“현장을 압도하는 몰입과 퍼포먼스의 리더”' },
                { type: 'p', content: '당신은 강력한 카리스마와 몰입으로 현장을 단숨에 장악하는 리더입니다. 즉각적인 반응과 퍼포먼스로 팀과 주변 사람들을 몰입시키며, 위기 상황에서도 침착하게 임기응변으로 돌파할 수 있습니다. 마치 무대를 이끄는 주인공처럼, 사람들의 시선과 에너지를 집중시키는 능력을 가지고 있으며, 팀 분위기를 단번에 끌어올립니다. 순간적인 퍼포먼스와 에너지 전달에 탁월하며, 팀의 활력을 끌어올려 단기적인 성과를 내는 데 가장 큰 강점이 있습니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['강력한 현장 장악력과 몰입으로 팀 집중력 극대화', '에너지와 재미를 동시에 제공하며 팀 분위기를 활성화', '위기 상황에서 빠르고 효과적인 임기응변 가능'] },
                { type: 'h3', content: '🔥 다른 유형과의 시너지' },
                { type: 'p', content: '강호동형은 리더들이 지쳤을 때 나서서 팀의 에너지를 끌어올리고, 유연하게 돌아가는 시스템을 만들 수 있도록 돕습니다. 특히 **뿌리 리더(L+R)**와 함께하면, 강력한 추진력을 바탕으로 새로운 목표에 도전할 수 있습니다. 이처럼 강호동형은 단단한 기반 위에서 팀의 성장 동력을 확보하는 핵심적인 역할을 수행합니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '강력한 카리스마가 때로는 팀원들에게 압박이 될 수 있습니다. 개개인의 의견을 경청하고 반영하는 노력을 통해 진정한 리더십을 발휘하세요.' }
            ],
            socialTips: {
                tips: ['회의나 모임에서 주제를 명확히 제시하고 토론을 주도하세요.', '팀원들의 의견을 경청하고 최종 결정을 내릴 때 이를 반영하세요.', '리더십을 발휘하되, 모두가 참여할 수 있는 분위기를 만드는 데 집중하세요.'],
                advice: ['지나친 주도성이 독단적으로 보이지 않도록 \'우리의 의견은 어떤가요?\'와 같은 질문을 자주 던지세요.', '목표 달성에 너무 집중하여 팀원들의 감정을 놓치지 않도록 주의하세요.']
            }
        },
        'LC': {
            icon: '🌬️',
            title: '유재석형 (LC)',
            description: '유연하게 흐름을 조율하며 팀에 안정과 신뢰를 주는 리더',
            details: [
                { type: 'h2', content: '유연하게 흐름을 조율하며 팀에 안정과 신뢰를 주는 리더' },
                { type: 'p', content: '“바람처럼 유연하게 흐름을 조율하는 리더”' },
                { type: 'p', content: '당신은 균형 잡힌 리더십을 가진 조율자로, 누구와도 자연스럽게 어울리며 주변 사람들에게 편안함과 신뢰를 줍니다. 중립성과 유연성을 바탕으로 팀의 장기적인 흐름과 안정성을 관리하며, 꾸준히 성과를 만들어 내는 능력이 뛰어납니다. 위기 상황에서도 침착하게 조율하며, 팀의 다양한 의견과 감정을 조화롭게 연결할 수 있습니다. 순간적인 주도권이나 단기적인 몰입보다, 장기적인 관점에서 팀의 지속적인 성장과 안정성을 확보하는 데 가장 큰 강점이 있습니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['균형 잡힌 조율과 팀 내 신뢰 구축', '장기적 흐름에서 안정적 성과 창출', '다양한 의견과 상황을 유연하게 연결하며 팀을 조화롭게 운영'] },
                { type: 'h3', content: '🌬️ 다른 유형과의 시너지' },
                { type: 'p', content: '유재석형은 강호동형이 에너지를 모두 쏟아냈을 때, 팀의 중심을 잡아주고 장기적인 안정성을 확보하는 역할을 합니다. 특히 **불꽃 리더(L+E)**와 함께하면, 불꽃 리더의 추진력이 지나쳐 장기적 성과를 놓치는 것을 막고, 팀원들의 의견을 모아 균형 잡힌 방향으로 나아가도록 조율합니다. 유재석형은 팀이 지치거나 갈등을 겪을 때 나서서 팀의 에너지를 회복시키는 중요한 역할을 수행합니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '조율자의 역할에 너무 몰입하다 보면 결정이 늦어질 수 있습니다. 때로는 신중함보다 빠른 결단이 필요하다는 것을 기억하고, 주도적으로 의사를 결정하는 훈련을 해보세요.' }
            ],
            socialTips: {
                tips: ['팀원들의 감정적 동기나 고민을 먼저 파악하고 접근하세요.', '갈등 상황에서 중재자 역할을 맡아 원만한 해결을 유도하세요.', '새로운 아이디어를 제시할 때, 그 아이디어가 팀 전체에 어떤 긍정적 영향을 줄지 설명하세요.'],
                advice: ['때로는 \'No\'라고 말하거나 자신의 의견을 명확히 표현하는 연습이 필요합니다.', '모든 사람을 만족시키려다 자신의 에너지를 소진하지 않도록 주의하세요.']
            }
        },
        'LE': {
            icon: '🔥',
            title: '불꽃 리더 (L+E)',
            description: '순간의 열정으로 팀을 밝히고 몰입시키는 점화자',
            details: [
                { type: 'h2', content: '순간의 열정으로 팀을 밝히고 몰입시키는 점화자' },
                { type: 'p', content: '“순간의 열정으로 모두를 이끌어가는 점화자”' },
                { type: 'p', content: '당신은 불꽃처럼 강렬하고, 어느 자리든 단숨에 주목받는 리더입니다. 새로운 아이디어가 떠오르면 망설임 없이 행동으로 옮기며, 주변 사람들의 관심과 에너지를 순식간에 끌어올립니다. 팀이 막막해 하거나 위기에 처했을 때도 당황하지 않고 앞장서서 방향을 제시하며, 짧은 시간 안에 분위기를 집중시키는 능력이 탁월합니다. 순간적인 열정과 카리스마로 모두를 몰입하게 만들지만, 장기적인 계획이나 세부적인 조율은 다소 부족할 수 있습니다. 그래서 불꽃 리더는 **‘순간의 힘’과 ‘즉각적인 몰입’**을 팀에 불어넣는 존재이며, 주변 사람들에게 영감과 동기를 주는 역할을 합니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['빠른 실행력과 결정력으로 팀의 에너지를 즉시 끌어올림', '자연스럽게 분위기를 주도하고, 사람들이 따르게 만드는 매력', '위기 상황에서도 두려움 없이 앞장서며 해결책을 제시'] },
                { type: 'h3', content: '보완점' },
                { type: 'ul', items: ['장기 계획과 지속적인 관리에는 주의 필요', '지나친 성급함으로 팀 의견을 충분히 듣지 못할 수 있음', '순간의 몰입에 치중해 장기적 성과를 놓칠 위험'] },
                { type: 'h3', content: '🔥 다른 유형과의 시너지' },
                { type: 'p', content: '불꽃 리더는 **뿌리 리더(L+R)**의 장기적인 안정감과 만나면, 불꽃처럼 타오르는 에너지가 지속 가능한 성과로 이어질 수 있습니다. 팀이 지칠 때 서로 역할을 바꾸며 유기적으로 순환할 때 가장 큰 시너지를 냅니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '순간의 열정뿐 아니라 장기적인 목표를 세우는 연습을 해보세요. 팀원들의 의견을 충분히 듣고 의사결정하는 습관을 들이는 것도 좋습니다.' }
            ],
            socialTips: {
                tips: ['회의나 모임에서 주도적으로 의견을 제시하고 분위기를 이끄세요.', '말과 행동으로 자신의 생각과 감정을 명확히 표현하세요.', '새로운 도전 과제에 가장 먼저 나서며 팀에 활력을 불어넣으세요.'],
                advice: ['지나친 주도성이 독단으로 비치지 않도록 경청하는 자세를 보여주세요.', '순간의 몰입만큼 장기적인 계획과 지속적인 관리를 중요하게 생각하세요.']
            }
        },
        'LR': {
            icon: '🌱',
            title: '뿌리 리더 (L+R)',
            description: '팀의 기반을 단단히 다지며 안정감을 선사하는 리더',
            details: [
                { type: 'h2', content: '팀의 기반을 단단히 다지며 안정감을 선사하는 리더' },
                { type: 'p', content: '“보이지 않는 곳에서 지탱하는 깊은 뿌리”' },
                { type: 'p', content: '당신은 안정과 신뢰를 바탕으로 사람들을 조용히 이끄는 리더입니다. 단기적인 성과보다 장기적인 흐름과 조직의 안정성을 중시하며, 팀이 흔들리지 않도록 든든한 기반을 마련합니다. 위기 상황에서도 감정을 쉽게 드러내지 않고, 꾸준한 리듬과 체계적인 접근으로 팀을 이끌어가는 힘이 있습니다. 당신의 존재 자체가 **‘안정감’과 ‘신뢰’**를 전달하며, 주변 사람들은 그 힘을 바탕으로 더 자유롭게 움직일 수 있습니다. 다만, 변화가 급격히 일어날 때 즉각적인 반응은 다소 느릴 수 있으며, 속도감 있는 결정이나 즉흥적 대응에는 약간 둔감할 수 있습니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['장기적인 전략 수립과 계획에 강함', '팀원과 조직의 신뢰를 꾸준히 구축', '흔들림 없는 안정적 리더십으로 팀의 중심 역할'] },
                { type: 'h3', content: '보완점' },
                { type: 'ul', items: ['급격한 변화나 돌발 상황에 즉각적 대응이 부족할 수 있음', '속도감 있는 의사결정보다 체계와 안정에 집중', '순간적 몰입이나 즉각적 에너지 발산에는 상대적으로 약함'] },
                { type: 'h3', content: '🌱 다른 유형과의 시너지' },
                { type: 'p', content: '뿌리 리더는 **불꽃 리더(L+E)**의 강렬한 추진력을 바탕으로 새로운 도전을 시도할 수 있습니다. 불꽃 리더가 지칠 때 뿌리 리더가 나서서 팀의 안정적인 흐름을 유지합니다. 두 리더가 서로의 장점을 존중하며 역할을 순환할 때, 팀은 단기적 성과와 장기적 성장을 모두 잡을 수 있습니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '급격한 변화나 돌발 상황에 대비해 빠른 판단력을 기르는 연습을 해보세요. 당신의 조언이 팀에 큰 도움이 될 수 있으니, 자신 있게 의견을 표현하는 훈련도 필요합니다.' }
            ],
            socialTips: {
                tips: ['팀원들의 감정적 동기나 고민을 먼저 파악하고 접근하세요.', '갈등 상황에서 중재자 역할을 맡아 원만한 해결을 유도하세요.', '새로운 아이디어를 제시할 때, 그 아이디어가 팀 전체에 어떤 긍정적 영향을 줄지 설명하세요.'],
                advice: ['때로는 \'No\'라고 말하거나 자신의 의견을 명확히 표현하는 연습이 필요합니다.', '모든 사람을 만족시키려다 자신의 에너지를 소진하지 않도록 주의하세요.']
            }
        },
        'FE': {
            icon: '⚡',
            title: '에너자이저 (F+E)',
            description: '팀 분위기를 활기차게 만들고 몰입을 이끄는 생동감 전도사',
            details: [
                { type: 'h2', content: '팀 분위기를 활기차게 만들고 몰입을 이끄는 생동감 전도사' },
                { type: 'p', content: '“분위기를 끌어올리는 생동감의 전도사”' },
                { type: 'p', content: '당신은 어디서든 활력을 불어넣는 에너자이저입니다. 자유롭고 창의적인 발상으로 팀의 흐름을 신선하게 만들고, 상황에 따라 유연하게 반응하며 즉흥적으로 문제를 해결하는 능력을 지니고 있습니다. 함께 있는 사람들에게 즐거움과 활기를 전달하며, 팀의 ‘분위기 메이커’로 자연스럽게 중심이 됩니다. 당신이 있는 곳에는 활기가 넘치고, 주변 사람들은 에너지에 자극을 받아 더욱 몰입하게 됩니다. 다만, 순간의 흥분과 다채로운 아이디어에 치중하다 보면 집중력이 떨어지거나 장기 계획과 현실적 제약을 간과할 수 있습니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['활력과 긍정적 에너지를 팀 전체로 확산', '창의적이고 즉흥적인 아이디어로 문제 해결 가능', '유연하게 상황을 읽고 적응하며 팀을 자연스럽게 이끌 수 있음'] },
                { type: 'h3', content: '보완점' },
                { type: 'ul', items: ['계획적 접근과 장기적 집중력이 상대적으로 약함', '현실적 제약이나 규칙을 놓칠 수 있음', '순간적 에너지에 의존하다가 피로가 쌓일 수 있음'] },
                { type: 'h3', content: '⚡ 다른 유형과의 시너지' },
                { type: 'p', content: '에너자이저는 **공명자(F+R)**의 섬세한 조율 능력과 만나면 더욱 빛을 발합니다. 공명자가 팀의 감정선을 읽고 조화를 만들어낼 때, 에너자이저는 활력을 불어넣어 팀의 사기를 높여줍니다. 서로의 강점을 보완하며, 팀 전체가 감정적, 심리적으로 안정된 상태에서 능동적으로 움직일 수 있도록 돕습니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '흥분과 즉흥성보다는 장기적인 계획과 현실적인 제약을 고려하는 습관을 들이세요. 당신의 에너지를 효과적으로 분배하여 지속 가능한 활력을 유지하는 것이 중요합니다.' }
            ],
            socialTips: {
                tips: ['활발한 소통으로 팀의 분위기 메이커 역할을 자처하세요.', '새로운 관계를 맺고 팀원들 간의 연결고리를 만드세요.', '아이디어를 낼 때, \'이런 아이디어는 어떨까요?\'와 같이 긍정적이고 개방적인 태도를 보이세요.'],
                advice: ['친밀함을 넘어 업무의 효율성이 떨어지지 않도록 때로는 진지한 태도를 보여줄 필요가 있습니다.', '모든 사람과 친해지려 하기보다 중요한 관계에 집중하세요.']
            }
        },
        'FR': {
            icon: '🌊',
            title: '공명자 (F+R)',
            description: '팀의 감정을 읽고 균형과 조화를 만드는 조율자',
            details: [
                { type: 'h2', content: '팀의 감정을 읽고 균형과 조화를 만드는 조율자' },
                { type: 'p', content: '“공감의 파동으로 울림을 만드는 조율자”' },
                { type: 'p', content: '당신은 타인의 감정과 흐름을 민감하게 감지하며, 그 안에서 자연스럽게 균형을 찾아냅니다. 상대의 이야기를 진심으로 경청하고, 갈등이나 오해가 생길 때 부드럽게 완화하며 팀을 하나로 묶는 능력이 탁월합니다. 당신의 존재 자체가 안정감을 주며, 사람들은 당신과 함께 있을 때 편안함과 신뢰를 느낍니다. 또한, 팀 내 다양한 의견과 감정을 조율하며 서로 연결되는 다리를 만들어내는 중요한 역할을 수행합니다. 다만, 타인을 우선하다 보니 자기주장이 약해질 수 있고, 결정이 늦어지거나 우유부단해 보일 위험이 있습니다.' },
                { type: 'h3', content: '강점' },
                { type: 'ul', items: ['높은 공감 능력으로 팀원과 조직의 심리적 안정에 기여', '갈등 상황에서 부드럽게 조율하며 협력적 분위기 조성', '사람들을 하나로 연결하고 신뢰를 구축하는 능력'] },
                { type: 'h3', content: '보완점' },
                { type: 'ul', items: ['자기주장이 약해 핵심 결정에서 밀릴 수 있음', '결정 지연이나 우유부단으로 속도가 느려질 수 있음', '과도한 배려로 자신의 목표나 의견을 충분히 표현하지 못할 위험'] },
                { type: 'h3', content: '🌊 다른 유형과의 시너지' },
                { type: 'p', content: '공명자는 **에너자이저(F+E)**의 폭발적인 에너지와 만나면, 팀의 역동성이 극대화됩니다. 공명자가 팀의 안정감을 확보하면, 에너자이저가 그 안정감 위에서 자유롭게 활력을 불어넣을 수 있게 됩니다.' },
                { type: 'h3', content: '📈 성장 & 자기 계발 조언' },
                { type: 'p', content: '타인의 감정을 살피는 만큼, 자신의 목표와 의견을 명확하게 표현하는 연습을 해보세요. 중요한 결정이 필요할 때는 신중하되, 너무 오래 망설이지 않고 결단하는 힘을 길러야 합니다.' }
            ],
            socialTips: {
                tips: ['묵묵히 자신의 역할을 해내고, 팀의 안정감을 유지하는 데 기여하세요.', '팀원의 말에 귀 기울이고 공감하며 신뢰를 쌓으세요.', '데이터 분석이나 보고서 작성 등 섬세함이 필요한 업무에서 강점을 발휘하세요.'],
                advice: ['자신의 기여를 밖으로 드러내는 데 어려움을 느낄 수 있으므로, 작은 성공이라도 스스로 칭찬해 주세요.', '과도한 배려로 인해 본인의 의견을 희생하지 않도록 주의하세요.']
            }
        }
    };

    // 퀴즈 상태 변수
    let currentQuestionIndex = 0;
    let scores = { lead: 0, flow: 0, expression: 0, response: 0 };
    let answerHistory = [];

    /**
     * 퀴즈를 초기 상태로 재설정하고 시작합니다.
     */
    function resetQuiz() {
        currentQuestionIndex = 0;
        scores = { lead: 0, flow: 0, expression: 0, response: 0 };
        answerHistory = [];
        nextBtn.disabled = true;
        
        // 화면 전환
        introContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';

        showQuestion(questions[currentQuestionIndex]);
        updateProgressBar();
        backBtn.classList.add('hidden');
    }

    /**
     * 현재 질문을 화면에 표시합니다.
     * 템플릿 리터럴로 HTML을 동적으로 생성합니다.
     * @param {object} question - 질문 객체
     */
    function showQuestion(question) {
        const questionHtml = `
            <h2>${question.question}</h2>
            <div id="options-container">
                ${question.options.map((option, index) => `
                    <button class="answer-btn" data-score="${option.score}" data-category="${question.category}">${option.text}</button>
                `).join('')}
            </div>
        `;
        questionBox.innerHTML = questionHtml;

        // 이전에 선택한 답변이 있으면 하이라이트
        const previousAnswer = answerHistory[currentQuestionIndex];
        if (previousAnswer) {
            const btns = questionBox.querySelectorAll('.answer-btn');
            btns.forEach(btn => {
                if (parseInt(btn.dataset.score) === previousAnswer.score) {
                    btn.classList.add('selected');
                }
            });
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }

        // 뒤로 가기 버튼 가시성 제어
        if (currentQuestionIndex > 0) {
            backBtn.classList.remove('hidden');
        } else {
            backBtn.classList.add('hidden');
        }
    }

    /**
     * 퀴즈 결과를 계산하고 화면에 표시합니다.
     */
    function showResult() {
        const leadScore = scores.lead;
        const flowScore = scores.flow;
        const expressionScore = scores.expression;
        const responseScore = scores.response;

        const leadQuestionCount = questions.filter(q => q.category === 'lead').length;
        const flowQuestionCount = questions.filter(q => q.category === 'flow').length;
        
        const leadMaxScore = leadQuestionCount * 5;
        const flowMaxScore = flowQuestionCount * 5;

        // 복합형(LP, LC) 판단 로직
        const leadFlowDifference = Math.abs(leadScore - flowScore);
        const totalMaxLeadFlowScore = leadMaxScore + flowMaxScore;
        const isHighAndBalanced = leadFlowDifference <= (totalMaxLeadFlowScore * 0.05) && (leadScore + flowScore) >= (totalMaxLeadFlowScore * 0.7);

        let resultType = '';
        if (isHighAndBalanced) {
            resultType = expressionScore > responseScore ? 'LP' : 'LC';
        } else {
            const leadOrFlow = leadScore > flowScore ? 'L' : 'F';
            const expressionOrResponse = expressionScore > responseScore ? 'E' : 'R';
            resultType = leadOrFlow + expressionOrResponse;
        }

        const result = resultsData[resultType];
        
        // URL에 결과 타입 저장 (공유 용이)
        history.pushState(null, '', `#result=${resultType}`);

        // 결과 페이지에 내용 표시 (동적 생성)
        resultIcon.innerText = result.icon;
        resultTitle.innerText = `당신의 성향은 ${result.title}입니다!`;
        
        let resultDescriptionHtml = '';
        result.details.forEach(detail => {
            if (detail.type === 'ul') {
                const listItems = detail.items.map(item => `<li>${item}</li>`).join('');
                resultDescriptionHtml += `<ul>${listItems}</ul>`;
            } else {
                resultDescriptionHtml += `<${detail.type}>${detail.content}</${detail.type}>`;
            }
        });

        // 사회생활 팁 섹션 추가
        const socialTipsHtml = `
            <div class="result-description-section">
                <h3>💡 사회생활 꿀팁</h3>
                <p><strong>👍 꿀팁</strong></p>
                <ul>
                    ${result.socialTips.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
                <p><strong>🤔 주의할 점</strong></p>
                <ul>
                    ${result.socialTips.advice.map(advice => `<li>${advice}</li>`).join('')}
                </ul>
            </div>
        `;
        resultDescription.innerHTML = resultDescriptionHtml + socialTipsHtml;

        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
    }

    /**
     * 진행바 업데이트
     */
    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }

    // --- 이벤트 리스너 ---
    startBtn.addEventListener('click', resetQuiz);

    backBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            const lastAnswer = answerHistory.pop();
            if (lastAnswer) {
                scores[lastAnswer.category] -= lastAnswer.score;
            }
            currentQuestionIndex--;
            updateProgressBar();
            showQuestion(questions[currentQuestionIndex]);
        }
    });

    nextBtn.addEventListener('click', () => {
        const selectedBtn = document.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            const score = parseInt(selectedBtn.dataset.score);
            const category = selectedBtn.dataset.category;

            answerHistory[currentQuestionIndex] = { score: score, category: category };
            scores[category] += score;
            
            currentQuestionIndex++;
            updateProgressBar();
            
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
            } else {
                showResult();
            }
        } else {
            alert("먼저 답변을 선택해주세요! 😉");
        }
    });

    questionBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-btn')) {
            const currentSelectedBtn = questionBox.querySelector('.answer-btn.selected');
            if (currentSelectedBtn) {
                currentSelectedBtn.classList.remove('selected');
            }
            e.target.classList.add('selected');
            nextBtn.disabled = false;
        }
    });

    restartBtn.addEventListener('click', () => {
        history.pushState(null, '', '/');
        location.reload(); 
    });

    copyBtn.addEventListener('click', () => {
        const resultTitleText = resultTitle.innerText;
        const resultText = `Awoolim Type Test (ATT) 결과: ${resultTitleText}\n\n${resultDescription.innerText}`;
        navigator.clipboard.writeText(resultText.trim()).then(() => {
            alert("결과가 클립보드에 복사되었습니다!");
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            alert("클립보드 복사 실패!");
        });
    });

    shareKakao.addEventListener('click', () => {
        const resultTitleText = resultTitle.innerText;
        const currentUrl = window.location.href;
        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '나의 어울림 성향은? 결과 공유',
                    description: resultTitleText,
                    imageUrl: 'https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png',
                    link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
                },
                buttons: [{ title: '결과 자세히 보기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
            });
        } else {
            alert("카카오톡 SDK가 제대로 초기화되지 않았습니다.");
        }
    });

    shareFacebook.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(resultTitle.innerText);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    });

    shareTwitter.addEventListener('click', () => {
        const text = encodeURIComponent(`나의 어울림 성향은? ${resultTitle.innerText}\n\n`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });

    // 페이지 로드 시 URL 해시 확인
    window.addEventListener('load', () => {
        const hash = window.location.hash;
        if (hash.startsWith('#result=')) {
            const resultType = hash.substring(8);
            if (resultsData[resultType]) {
                // Intro 페이지 숨기고 결과 페이지 표시
                introContainer.style.display = 'none';
                quizContainer.style.display = 'none';
                resultContainer.style.display = 'block';

                const result = resultsData[resultType];
                resultIcon.innerText = result.icon;
                resultTitle.innerText = `당신의 성향은 ${result.title}입니다!`;
                
                // 결과 내용 동적 생성
                let resultDescriptionHtml = '';
                result.details.forEach(detail => {
                    if (detail.type === 'ul') {
                        const listItems = detail.items.map(item => `<li>${item}</li>`).join('');
                        resultDescriptionHtml += `<ul>${listItems}</ul>`;
                    } else {
                        resultDescriptionHtml += `<${detail.type}>${detail.content}</${detail.type}>`;
                    }
                });

                // 사회생활 팁 섹션 추가
                const socialTipsHtml = `
                    <div class="result-description-section">
                        <h3>💡 사회생활 꿀팁</h3>
                        <p><strong>👍 꿀팁</strong></p>
                        <ul>
                            ${result.socialTips.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                        <p><strong>🤔 주의할 점</strong></p>
                        <ul>
                            ${result.socialTips.advice.map(advice => `<li>${advice}</li>`).join('')}
                        </ul>
                    </div>
                `;
                resultDescription.innerHTML = resultDescriptionHtml + socialTipsHtml;
            } else {
                // 잘못된 URL 해시인 경우
                introContainer.style.display = 'block';
            }
        }
    });
})();

