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
const resultMbti = document.getElementById('result-mbti');
const resultDescription = document.getElementById('result-description');
const compatibilitySection = document.getElementById('compatibility-section');
const scoreCanvas = document.getElementById('score-chart');
const actionTendencyTitle = document.getElementById('action-tendency-title');
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

let myChart = null;

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
    document.documentElement.style.cssText = '';
}

// 지난 결과 보기 배너 표시 함수
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

// 화면 전환 함수들
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

function showResultScreen(result, scores, mbtiType, actionTendency) {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    loadingContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    renderResult(result, mbtiType, actionTendency);

    if (scores) {
        scoreChartSection.style.display = 'block';
        drawChart(scores, result, actionTendency);
    } else {
        scoreChartSection.style.display = 'none';
    }
}

// 모달 관련 함수
function openModal(html) {
    modalContent.innerHTML = html;
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

// 질문을 화면에 렌더링하는 함수
function renderQuestion(question, previousAnswer) {
    questionBox.classList.add('question-fade-out');
    setTimeout(() => {
        const questionHtml = `
            <h2 class="question-fade-in">${question.question}</h2>
            <div id="options-container" class="question-fade-in">
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

        backBtn.style.visibility = question.question.startsWith('1.') ? 'hidden' : 'visible';

        questionBox.classList.remove('question-fade-out');
    }, 300);
}

// 결과 렌더링 함수
function renderResult(result, mbtiType, actionTendency) {
    const root = document.documentElement;
    root.style.setProperty('--theme-color', result.themeColor);
    root.style.setProperty('--theme-color-light', result.themeColorLight);

    const resultType = Object.keys(resultsData).find(key => resultsData[key].title === result.title);
    
    actionTendencyTitle.innerText = actionTendency.text;
    actionTendencyTitle.style.color = result.themeColor;

    resultIcon.innerHTML = `<img src="${result.imageUrl}" alt="${result.title}" class="w-40 h-40 mx-auto rounded-full shadow-lg border-4" style="border-color: ${result.themeColor};">`;
    resultTitle.innerText = result.title;

    if (mbtiType && resultMbti) {
        const relatedTypes = result.similarMbti.split(',').map(t => t.trim());
        const uniqueProfileTypes = [...new Set([mbtiType, ...relatedTypes])];
        const profileHtml = uniqueProfileTypes.map(type => 
            `<span class="font-semibold">${type}</span>`
        ).join('<span class="mx-2 text-gray-400 font-light">+</span>');
        
        resultMbti.innerHTML = `
            <span class="font-bold text-gray-700">MBTI 성향으로 본 프로필</span>
            <div class="mt-2 text-2xl" style="color: ${result.themeColor};">${profileHtml}</div>
        `;
    }

    let descriptionHtml = result.details.map(detail => {
        if (detail.type === 'ul') {
            return `<ul>${detail.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        return `<${detail.type}>${detail.content}</${detail.type}>`;
    }).join('');
    
    resultDescription.innerHTML = descriptionHtml;

    const bestMatchData = result.compatibility.best;
    const goodMatchData = result.compatibility.good;
    const bestMatchResult = resultsData[bestMatchData.type];
    const goodMatchResult = resultsData[goodMatchData.type];

    compatibilitySection.innerHTML = `
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
            <h4 class="font-bold text-gray-800">당신과 같은 유형의 유명인</h4>
            <p class="mt-2 text-gray-700">${result.famous_examples.join(', ')}</p>
        </div>
    `;

    document.querySelector('meta[property="og:title"]').setAttribute('content', `내 어울림 유형은 "${result.title}"!`);
    document.querySelector('meta[property="og:description"]').setAttribute('content', result.description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', result.imageUrl);
}

// 프로그레스 바 업데이트 함수
function updateProgressBar(currentIndex, total) {
    const progress = (currentIndex / total) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// 육각형 레이더 차트를 그리는 함수
function drawChart(scores, result, actionTendency) {
    if (myChart) {
        myChart.destroy();
    }
    
    const actionQuestionCount = actionTendency.count || 0;
    
    const minActionScore = actionQuestionCount * 1;
    const maxActionScore = actionQuestionCount * 5;
    
    const willScore = scores.action > 0 ? scores.action - minActionScore : 0;
    const complianceScore = scores.action > 0 ? maxActionScore - scores.action : 0;

    const chartBackgroundColor = hexToRgba(result.themeColor, 0.4);
    const chartBorderColor = result.themeColor;
    const ctx = scoreCanvas.getContext('2d');
    
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['리드(L)', '표현(E)', '의지(A)', '플로우(F)', '감응(R)', '순응(C)'],
            datasets: [{
                label: '나의 종합 성향',
                data: [
                    scores.lead, 
                    scores.expression, 
                    willScore, 
                    scores.flow, 
                    scores.response, 
                    complianceScore
                ],
                backgroundColor: chartBackgroundColor,
                borderColor: chartBorderColor,
                borderWidth: 2,
                pointBackgroundColor: chartBorderColor,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 40,
                    angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    pointLabels: { font: { size: 14, weight: 'bold' } },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// 모든 UI 이벤트 리스너를 초기화하는 함수
function initializeUIEventListeners() {
    startBtn.addEventListener('click', window.startQuiz);

    nextBtn.addEventListener('click', () => {
        const selectedBtn = questionBox.querySelector('.answer-btn.selected');
        if (selectedBtn) {
            nextBtn.disabled = true;
            const score = parseInt(selectedBtn.dataset.score);
            const category = selectedBtn.dataset.category;
            window.goToNextQuestion(score, category);
        }
    });

    backBtn.addEventListener('click', window.goToPreviousQuestion);
    restartBtn.addEventListener('click', window.restartQuiz);

    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));
            tab.classList.add('active');
            const target = document.querySelector(tab.dataset.tabTarget);
            if (target) {
                target.classList.remove('hidden');
            }
        });
    });

    copyBtn.addEventListener('click', () => {
        const resultTextForCopy = `[어울림 성향 테스트 결과: ${resultTitle.innerText}]\n\n${resultDescription.innerText}\n\n${compatibilitySection.innerText}`;
        navigator.clipboard.writeText(resultTextForCopy.trim()).then(() => {
            alert("전체 결과가 클립보드에 복사되었습니다!");
        });
    });

    summaryCopyBtn.addEventListener('click', () => {
        const cleanUrl = window.location.href.split('#')[0];
        const summaryText = `[어울림 성향 테스트] 제 타입은 ${resultTitle.innerText}래요! 당신의 유형도 알아보세요!\n${cleanUrl}`;
        navigator.clipboard.writeText(summaryText).then(() => {
            alert("요약 결과가 클립보드에 복사되었습니다!");
        });
    });

    shareKakao.addEventListener('click', () => {
        const resultData = resultsData[Object.keys(resultsData).find(key => resultsData[key].title === resultTitle.innerText)];
        if (typeof Kakao !== 'undefined' && Kakao.isInitialized() && resultData) {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `[어울림 테스트] 내 결과는 "${resultData.title}"`,
                    description: resultData.description,
                    imageUrl: resultData.imageUrl,
                    link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
                },
                buttons: [{ title: '나도 테스트하기', link: { mobileWebUrl: window.location.href, webUrl: window.location.href } }],
            });
        }
    });

    shareFacebook.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });

    shareTwitter.addEventListener('click', () => {
        const text = encodeURIComponent(`[어울림 테스트] 제 타입은 ${resultTitle.innerText}래요! 여러분도 참여해보세요!`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
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
                <img src="${myResult.imageUrl}" class="w-24 h-24 rounded-full shadow-md" alt="${myResult.title}">
                <span class="text-4xl text-red-500 font-bold">❤️</span>
                <img src="${targetResult.imageUrl}" class="w-24 h-24 rounded-full shadow-md" alt="${targetResult.title}">
            </div>
            <h3 class="mt-4">${relationDetails.title}</h3>
            <h4>🤝 함께 일한다면?</h4>
            <p>${relationDetails.collab}</p>
            <h4>💥 갈등이 생긴다면?</h4>
            <p>${relationDetails.conflict}</p>
        `;
        openModal(modalHtml);
    });
}

// 전역 스코프에 함수 노출
window.initializeUIEventListeners = initializeUIEventListeners;
window.resetTheme = resetTheme;
window.showQuizScreen = showQuizScreen;
window.showLoadingScreen = showLoadingScreen;
window.showResultScreen = showResultScreen;
window.renderQuestion = renderQuestion;
window.updateProgressBar = updateProgressBar;
window.showLastResultBanner = showLastResultBanner;




