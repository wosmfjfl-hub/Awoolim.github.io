// ui.js

// HTML 요소 참조
const introContainer = document.getElementById('intro-container');
const quizContainer = document.getElementById('quiz-container');
const loadingContainer = document.getElementById('loading-container');
const resultContainer = document.getElementById('result-container');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const questionBox = document.getElementById('question-box');
const progressBar = document.getElementById('progressBar');
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const compatibilitySection = document.getElementById('compatibility-section'); // 궁합 섹션 참조 추가
const scoreCanvas = document.getElementById('score-chart');
const restartBtn = document.getElementById('restart-btn');
const copyBtn = document.getElementById('copy-btn');
const shareKakao = document.getElementById('share-kakao');
const shareFacebook = document.getElementById('share-facebook');
const shareTwitter = document.getElementById('share-twitter');

let myChart = null; // 차트 객체 변수

// --- 화면 전환 함수 ---
function showLoadingScreen() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    loadingContainer.style.display = 'block';
}

function showQuizScreen() {
    introContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
}

function showResultScreen(result, scores) {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    loadingContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    renderResult(result);
    if (scores) {
        drawChart(scores);
    }
}


// --- 렌더링 함수 ---
function renderQuestion(question, previousAnswer) {
    // 1. 사라지는 애니메이션 적용
    questionBox.classList.add('question-fade-out');
    
    // 2. 애니메이션이 끝날 때쯤 내용 변경 및 나타나는 애니메이션 적용
    setTimeout(() => {
        const questionHtml = `
            <h2>${question.question}</h2>
            <div id="options-container">
                ${question.options.map(option => `
                    <button class="answer-btn" data-score="${option.score}" data-category="${question.category}">${option.text}</button>
                `).join('')}
            </div>
        `;
        questionBox.innerHTML = questionHtml;

        // 답변 버튼에 이벤트 리스너 추가
        questionBox.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentSelected = questionBox.querySelector('.answer-btn.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }
                e.target.classList.add('selected');
                nextBtn.disabled = false;
            });
        });

        // 이전 답변이 있으면 UI에 복원
        if (previousAnswer) {
            const btnToSelect = questionBox.querySelector(`.answer-btn[data-score="${previousAnswer.score}"]`);
            if(btnToSelect) {
                btnToSelect.classList.add('selected');
                nextBtn.disabled = false;
            }
        } else {
            nextBtn.disabled = true;
        }

        // 뒤로 가기 버튼 표시/숨김
        if (question.question.startsWith('1.')) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
        
        // 3. 나타나는 애니메이션을 위해 클래스 변경
        questionBox.classList.remove('question-fade-out');
        questionBox.classList.add('question-fade-in');
    }, 300); // 0.3초
}

function renderResult(result) {
    resultIcon.innerText = result.icon;
    const titleText = `당신의 성향은 ${result.title}입니다!`;
    resultTitle.innerText = titleText;
    
    let descriptionHtml = result.details.map(detail => {
        if (detail.type === 'ul') {
            const listItems = detail.items.map(item => `<li>${item}</li>`).join('');
            return `<ul>${listItems}</ul>`;
        }
        return `<${detail.type}>${detail.content}</${detail.type}>`;
    }).join('');

    const socialTipsHtml = `
        <div class="result-description-section">
            <h3>💡 사회생활 꿀팁</h3>
            <p><strong>👍 꿀팁</strong></p>
            <ul>${result.socialTips.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            <p><strong>🤔 주의할 점</strong></p>
            <ul>${result.socialTips.advice.map(advice => `<li>${advice}</li>`).join('')}</ul>
        </div>
    `;
    resultDescription.innerHTML = descriptionHtml + socialTipsHtml;

    // --- 궁합 및 유명인 예시 렌더링 로직 추가 ---
    const bestMatch = resultsData[result.compatibility.best.type];
    const goodMatch = resultsData[result.compatibility.good.type];

    const compatibilityHtml = `
        <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">다른 유형과의 관계</h3>
        <div class="compatibility-box">
            <h4><span class="type-icon">💖</span> 환상의 짝꿍: <span class="type-title ml-2">${bestMatch.title}</span></h4>
            <p class="mt-2 text-gray-600">${result.compatibility.best.text}</p>
        </div>
        <div class="compatibility-box">
            <h4><span class="type-icon">🤝</span> 좋은 동료: <span class="type-title ml-2">${goodMatch.title}</span></h4>
            <p class="mt-2 text-gray-600">${result.compatibility.good.text}</p>
        </div>
        <div class="famous-examples">
            <h4 class="font-bold text-gray-800">⭐ 당신과 같은 유형의 유명인</h4>
            <p class="mt-2 text-gray-700">${result.famous_examples.join(', ')}</p>
        </div>
    `;
    compatibilitySection.innerHTML = compatibilityHtml;


    // --- OG 태그 업데이트 로직 ---
    document.querySelector('meta[property="og:title"]').setAttribute('content', '내 어울림 유형 결과는?');
    document.querySelector('meta[property="og:description"]').setAttribute('content', titleText);
}

function updateProgressBar(currentIndex, total) {
    const progress = (currentIndex / total) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function drawChart(scores) {
    if (myChart) myChart.destroy();

    const ctx = scoreCanvas.getContext('2d');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['리드(L)', '플로우(F)', '표현(E)', '감응(R)'],
            datasets: [{
                label: '나의 어울림 성향',
                data: [scores.lead, scores.flow, scores.expression, scores.response],
                backgroundColor: 'rgba(74, 144, 226, 0.4)',
                borderColor: 'rgba(74, 144, 226, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { r: { beginAtZero: true, max: 20, display: false } },
            plugins: { legend: { display: false } }
        }
    });
}

// --- 이벤트 바인딩 함수 ---
function bindStartButton(handler) {
    startBtn.addEventListener('click', handler);
}

function bindNextButton(handler) {
    nextBtn.addEventListener('click', () => {
        const selectedBtn = questionBox.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            const score = parseInt(selectedBtn.dataset.score);
            const category = selectedBtn.dataset.category;
            handler(score, category);
        } else {
            alert("먼저 답변을 선택해주세요! 😉");
        }
    });
}

function bindBackButton(handler) {
    backBtn.addEventListener('click', handler);
}

function bindRestartButton(handler) {
    restartBtn.addEventListener('click', handler);
}

function bindCopyButton() {
    copyBtn.addEventListener('click', () => {
        const resultTitleText = resultTitle.innerText;
        const resultText = `Awoolim Type Test (ATT) 결과: ${resultTitleText}\n\n${resultDescription.innerText}\n\n${compatibilitySection.innerText}`;
        navigator.clipboard.writeText(resultText.trim()).then(() => {
            alert("결과가 클립보드에 복사되었습니다!");
        });
    });
}

function bindShareButtons() {
    shareKakao.addEventListener('click', () => {
        const resultTitleText = resultTitle.innerText;
        const currentUrl = window.location.href;
        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '나의 어울림 성향은? 결과 공유',
                    description: resultTitleText,
                    imageUrl: 'https://i.imgur.com/your-default-image.png', // 예시 이미지
                    link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
                },
                buttons: [{ title: '결과 자세히 보기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
            });
        }
    });

    shareFacebook.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });

    shareTwitter.addEventListener('click', () => {
        const text = encodeURIComponent(`나의 어울림 성향은? ${resultTitle.innerText}\n\n`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });
}