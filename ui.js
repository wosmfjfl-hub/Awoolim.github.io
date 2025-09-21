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
const compatibilitySection = document.getElementById('compatibility-section');
const scoreCanvas = document.getElementById('score-chart');
const scoreChartSection = document.querySelector('#result-container section.my-8');
const restartBtn = document.getElementById('restart-btn');
const copyBtn = document.getElementById('copy-btn');
const summaryCopyBtn = document.getElementById('summary-copy-btn');
const shareKakao = document.getElementById('share-kakao');
const shareFacebook = document.getElementById('share-facebook');
const shareTwitter = document.getElementById('share-twitter');
const modalOverlay = document.getElementById('modal-overlay');
const modalPanel = document.getElementById('modal-panel');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// 👇 통계 관련 요소 추가
const statsBtn = document.getElementById('stats-btn');
const statsModalOverlay = document.getElementById('stats-modal-overlay');
const statsModalPanel = document.getElementById('stats-modal-panel');
const statsModalCloseBtn = document.getElementById('stats-modal-close-btn');
const statsChartCanvas = document.getElementById('stats-chart');
const statsLoadingText = document.getElementById('stats-loading-text');

let myChart = null;
let statsChart = null; // 통계 차트 인스턴스 변수

/**
 * HEX 색상 코드를 RGBA로 변환하는 헬퍼 함수
 */
function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 테마 색상을 초기화하는 함수
function resetTheme() {
    const root = document.documentElement;
    root.style.removeProperty('--theme-color');
    root.style.removeProperty('--theme-color-light');
}

function showLastResultBanner(result, onViewResultClick) {
    const banner = document.createElement('div');
    banner.className = 'last-result-banner';
    banner.innerHTML = `
        <p>지난번 결과는 <strong>${result.title}</strong>이었어요. 다시 보시겠어요?</p>
        <div>
            <button id="view-last-result" class="banner-btn view">결과 보기</button>
            <button id="close-banner" class="banner-btn close">닫기</button>
        </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('view-last-result').addEventListener('click', () => {
        onViewResultClick();
        banner.remove();
    });
    document.getElementById('close-banner').addEventListener('click', () => {
        banner.remove();
    });
}

function showLoadingScreen() {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    loadingContainer.style.display = 'block';
}

function showQuizScreen() {
    resetTheme();
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
        scoreChartSection.style.display = 'block';
        drawChart(scores, result);
    } else {
        scoreChartSection.style.display = 'none';
    }
}

function openModal(html) {
    modalContent.innerHTML = html;
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

// 👇 통계 모달 제어 함수 추가
function openStatsModal() {
    statsModalOverlay.classList.remove('hidden');
    statsLoadingText.textContent = '통계를 불러오는 중입니다...'; // 로딩 텍스트 초기화
    statsLoadingText.style.display = 'block';
    if (statsChart) {
        statsChart.destroy(); // 이전 차트가 있다면 파괴
    }

    // 서버에 통계 데이터 요청
    fetch('https://awoolim-backend.onrender.com')
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            return response.json();
        })
        .then(statsData => {
            statsLoadingText.style.display = 'none'; // 로딩 텍스트 숨기기
            drawStatsChart(statsData); // 새 차트 그리기
        })
        .catch(error => {
            console.error('통계 로딩 오류:', error);
            statsLoadingText.textContent = '통계를 불러오는 데 실패했습니다. 서버가 켜져 있는지 확인해주세요.';
        });
}

function closeStatsModal() {
    statsModalOverlay.classList.add('hidden');
}


function renderQuestion(question, previousAnswer) {
    questionBox.classList.add('question-fade-out');
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
        if (previousAnswer) {
            const btnToSelect = questionBox.querySelector(`.answer-btn[data-score="${previousAnswer.score}"]`);
            if(btnToSelect) {
                btnToSelect.classList.add('selected');
                nextBtn.disabled = false;
            }
        } else {
            nextBtn.disabled = true;
        }
        if (question.question.startsWith('1.')) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
        questionBox.classList.remove('question-fade-out');
        questionBox.classList.add('question-fade-in');
    }, 300);
}

function renderResult(result) {
    const root = document.documentElement;
    root.style.setProperty('--theme-color', result.themeColor);
    root.style.setProperty('--theme-color-light', result.themeColorLight);
    const resultType = Object.keys(resultsData).find(key => resultsData[key].title === result.title);
    resultIcon.innerHTML = `<img src="${result.imageUrl}" alt="${result.title}" class="w-40 h-40 mx-auto rounded-full shadow-lg border-4" style="border-color: ${result.themeColor};">`;
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
    const bestMatchData = result.compatibility.best;
    const goodMatchData = result.compatibility.good;
    const bestMatchResult = resultsData[bestMatchData.type];
    const goodMatchResult = resultsData[goodMatchData.type];
    const compatibilityHtml = `
        <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">다른 유형과의 관계</h3>
        <div class="compatibility-box" data-my-type="${resultType}" data-target-type="${bestMatchData.type}" data-relation="best">
            <h4><span class="type-icon"><img src="${bestMatchResult.imageUrl}" class="w-10 h-10 rounded-full"></span> 환상의 짝꿍: <span class="type-title ml-2">${bestMatchResult.title}</span></h4>
            <p class="mt-2 text-gray-600">${bestMatchData.summary}</p>
        </div>
        <div class="compatibility-box" data-my-type="${resultType}" data-target-type="${goodMatchData.type}" data-relation="good">
            <h4><span class="type-icon"><img src="${goodMatchResult.imageUrl}" class="w-10 h-10 rounded-full"></span> 좋은 동료: <span class="type-title ml-2">${goodMatchResult.title}</span></h4>
            <p class="mt-2 text-gray-600">${goodMatchData.summary}</p>
        </div>
        <div class="famous-examples">
            <h4 class="font-bold text-gray-800">⭐ 당신과 같은 유형의 유명인</h4>
            <p class="mt-2 text-gray-700">${result.famous_examples.join(', ')}</p>
        </div>
    `;
    compatibilitySection.innerHTML = compatibilityHtml;
    document.querySelector('meta[property="og:title"]').setAttribute('content', '내 어울림 유형 결과는?');
    document.querySelector('meta[property="og:description"]').setAttribute('content', titleText);
}

function updateProgressBar(currentIndex, total) {
    const progress = (currentIndex / total) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function drawChart(scores, result) {
    if (myChart) myChart.destroy();
    const chartBackgroundColor = hexToRgba(result.themeColor, 0.4);
    const chartBorderColor = result.themeColor;
    const ctx = scoreCanvas.getContext('2d');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['리드(L)', '플로우(F)', '표현(E)', '감응(R)'],
            datasets: [{
                label: '나의 어울림 성향',
                data: [scores.lead, scores.flow, scores.expression, scores.response],
                backgroundColor: chartBackgroundColor,
                borderColor: chartBorderColor,
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

// 👇 통계 차트를 그리는 함수 추가
function drawStatsChart(statsData) {
    if (statsChart) statsChart.destroy();
    const ctx = statsChartCanvas.getContext('2d');
    
    const labels = Object.keys(statsData);
    const data = Object.values(statsData);
    
    // 각 유형의 테마 색상을 차트 바 색상으로 사용
    const backgroundColors = labels.map(label => resultsData[label] ? resultsData[label].themeColor : '#cccccc');

    statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(label => resultsData[label] ? resultsData[label].title : label),
            datasets: [{
                label: '유형별 참여자 수',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // 가로 막대 차트
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // 눈금을 1 단위로
                    }
                }
            }
        }
    });
}

function initializeUIEventListeners() {
    startBtn.addEventListener('click', window.startQuiz);
    nextBtn.addEventListener('click', () => {
        const selectedBtn = questionBox.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            const score = parseInt(selectedBtn.dataset.score);
            const category = selectedBtn.dataset.category;
            window.goToNextQuestion(score, category);
        } else {
            alert("먼저 답변을 선택해주세요! 😉");
        }
    });
    backBtn.addEventListener('click', window.goToPreviousQuestion);
    restartBtn.addEventListener('click', window.restartQuiz);
    copyBtn.addEventListener('click', () => {
        const resultTitleText = resultTitle.innerText;
        const resultText = `Awoolim Type Test (ATT) 결과: ${resultTitleText}\n\n${resultDescription.innerText}\n\n${compatibilitySection.innerText}`;
        navigator.clipboard.writeText(resultText.trim()).then(() => {
            alert("전체 결과가 클립보드에 복사되었습니다!");
        });
    });
    summaryCopyBtn.addEventListener('click', () => {
        const hash = window.location.hash.substring(1);
        if (!hash) return;
        const resultType = hash.split('&')[0].split('=')[1];
        if (resultType && resultsData[resultType]) {
            const result = resultsData[resultType];
            const cleanUrl = window.location.origin + window.location.pathname;
            const summaryText = `[어울림 성향 테스트] 제 타입은 ${result.title}입니다! 여러분도 참여해보세요!\n${cleanUrl}`;
            navigator.clipboard.writeText(summaryText).then(() => {
                alert("요약 결과가 클립보드에 복사되었습니다!");
            });
        }
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
                    imageUrl: 'https://i.imgur.com/your-default-image.png',
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
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    compatibilitySection.addEventListener('click', (e) => {
        const targetBox = e.target.closest('.compatibility-box');
        if (!targetBox) return;
        const myType = targetBox.dataset.myType;
        const targetType = targetBox.dataset.targetType;
        const relation = targetBox.dataset.relation;
        const myResult = resultsData[myType];
        const targetResult = resultsData[targetType];
        const relationDetails = myResult.compatibility[relation].details;
        const modalHtml = `
            <div class="type-icons flex justify-center items-center gap-4">
                <img src="${myResult.imageUrl}" class="w-24 h-24 rounded-full shadow-md">
                <span class="text-4xl text-red-500 font-bold">❤️</span>
                <img src="${targetResult.imageUrl}" class="w-24 h-24 rounded-full shadow-md">
            </div>
            <h3 class="mt-4">${relationDetails.title}</h3>
            <h4>🤝 함께 일한다면?</h4>
            <p>${relationDetails.collab}</p>
            <h4>💥 갈등이 생긴다면?</h4>
            <p>${relationDetails.conflict}</p>
        `;
        openModal(modalHtml);
    });

    // 👇 통계 모달 이벤트 바인딩 추가
    statsBtn.addEventListener('click', openStatsModal);
    statsModalCloseBtn.addEventListener('click', closeStatsModal);
    statsModalOverlay.addEventListener('click', (e) => {
        if (e.target === statsModalOverlay) {
            closeStatsModal();
        }
    });
}

window.initializeUIEventListeners = initializeUIEventListeners;
window.resetTheme = resetTheme;

