import { spectrums, typeResults } from './data.js';

// === STATE ===
const state = {
  currentSpectrum: 0,
  currentQuestion: 0,
  answers: [], // answers for current spectrum: ['a' or 'b', ...]
  results: [], // confirmed results per spectrum: 'a' or 'b' (index 0 = first label)
  totalQuestionsAnswered: 0,
  isAnimating: false,
};

// === DOM REFS ===
const $ = (id) => document.getElementById(id);
const startScreen = $('start-screen');
const quizScreen = $('quiz-screen');
const resultScreen = $('result-screen');
const startBtn = $('start-btn');
const card = $('card');
const cardLabel = $('card-label');
const cardQuestion = $('card-question');
const choiceAText = $('choice-a-text');
const choiceBText = $('choice-b-text');
const btnA = $('btn-a');
const btnB = $('btn-b');
const hintLeft = $('hint-left');
const hintRight = $('hint-right');
const progressSlots = $('progress-slots');
const progressFill = $('progress-fill');
const resultContent = $('result-content');

// === INIT ===
function init() {
  startBtn.addEventListener('click', startQuiz);
  btnA.addEventListener('click', () => answer('a'));
  btnB.addEventListener('click', () => answer('b'));
  setupSwipe();
  buildProgressSlots();
}

function startQuiz() {
  state.currentSpectrum = 0;
  state.currentQuestion = 0;
  state.answers = [];
  state.results = [];
  state.totalQuestionsAnswered = 0;
  state.isAnimating = false;
  resetProgressSlots();
  switchScreen(quizScreen);
  showQuestion();
}

// === SCREEN MANAGEMENT ===
function switchScreen(target) {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.remove('active'));
  target.classList.add('active');
}

// === PROGRESS BAR ===
function buildProgressSlots() {
  progressSlots.innerHTML = '';
  spectrums.forEach((sp, i) => {
    if (i > 0) {
      const divider = document.createElement('span');
      divider.className = 'slot-divider';
      divider.textContent = '·';
      progressSlots.appendChild(divider);
    }
    const slot = document.createElement('div');
    slot.className = 'progress-slot';
    slot.innerHTML = `
      <div class="slot-pair" data-spectrum="${i}">
        <span data-side="a">${sp.labels[0]}</span>
        <span data-side="b">${sp.labels[1]}</span>
      </div>
    `;
    progressSlots.appendChild(slot);
  });
}

function resetProgressSlots() {
  document.querySelectorAll('.slot-pair span').forEach((el) => {
    el.classList.remove('confirmed', 'dimmed');
  });
  progressFill.style.width = '0%';
}

function confirmProgressSlot(spectrumIdx, side) {
  const pair = document.querySelector(`.slot-pair[data-spectrum="${spectrumIdx}"]`);
  if (!pair) return;
  const confirmedEl = pair.querySelector(`[data-side="${side}"]`);
  const dimmedEl = pair.querySelector(`[data-side="${side === 'a' ? 'b' : 'a'}"]`);
  confirmedEl.classList.add('confirmed', 'spectrum-confirmed-flash');
  dimmedEl.classList.add('dimmed');
}

function updateProgressBar() {
  const total = spectrums.length;
  const completed = state.results.length;
  progressFill.style.width = `${(completed / total) * 100}%`;
}

// === QUESTION DISPLAY ===
function showQuestion() {
  const sp = spectrums[state.currentSpectrum];
  const q = sp.questions[state.currentQuestion];

  cardLabel.textContent = `${sp.fullLabels[0]} vs ${sp.fullLabels[1]}`;
  cardQuestion.textContent = q.text;
  choiceAText.textContent = q.a;
  choiceBText.textContent = q.b;

  // Update hint labels
  hintLeft.textContent = `← B`;
  hintRight.textContent = `A →`;

  // Animate card in
  card.classList.remove('card-enter');
  void card.offsetWidth; // force reflow
  card.classList.add('card-enter');
}

// === ANSWER LOGIC ===
function answer(choice) {
  if (state.isAnimating) return;

  state.answers.push(choice);
  state.totalQuestionsAnswered++;

  const qIdx = state.currentQuestion;

  if (qIdx === 0) {
    // After Q1: always go to Q2
    state.currentQuestion = 1;
    showQuestion();
  } else if (qIdx === 1) {
    // After Q2: check consistency
    if (state.answers[0] === state.answers[1]) {
      // Consistent! Confirm and skip Q3
      confirmSpectrum(state.answers[0]);
    } else {
      // Inconsistent: need tie-breaker Q3
      state.currentQuestion = 2;
      showQuestion();
    }
  } else if (qIdx === 2) {
    // After Q3: majority vote
    const aCount = state.answers.filter((a) => a === 'a').length;
    confirmSpectrum(aCount >= 2 ? 'a' : 'b');
  }
}

function confirmSpectrum(side) {
  state.results.push(side);
  confirmProgressSlot(state.currentSpectrum, side);
  updateProgressBar();

  if (state.currentSpectrum < spectrums.length - 1) {
    // Move to next spectrum
    state.currentSpectrum++;
    state.currentQuestion = 0;
    state.answers = [];
    showQuestion();
  } else {
    // All spectrums done — show results
    showResults();
  }
}

// === RESULTS ===
function showResults() {
  // Build type code from results
  const mbtiLetters = state.results.map((side, i) => {
    return spectrums[i].labels[side === 'a' ? 0 : 1];
  });

  // Core 4 MBTI letters
  const mbti4 = mbtiLetters.slice(0, 4).join('');
  // A/T facet
  const at = mbtiLetters[4];
  // H/L facet
  const hl = mbtiLetters[5];

  const fullCode = `${mbti4}-${at}/${hl}`;
  const typeData = typeResults[mbti4];

  if (!typeData) {
    resultContent.innerHTML = `<p>結果の計算中にエラーが発生しました。</p>`;
    switchScreen(resultScreen);
    return;
  }

  // Ojisan emoji mapping by type temperament
  const ojisanEmoji = getOjisanEmoji(mbti4);

  resultContent.innerHTML = `
    <div class="result-type-code">${fullCode}</div>
    <div class="result-catchphrase">${typeData.catchphrase}</div>

    <div class="ojisan-card">
      <div class="ojisan-placeholder">
        <div class="ojisan-emoji">${ojisanEmoji}</div>
        <div class="ojisan-prompt-label">Image Generation Prompt</div>
        <div class="ojisan-prompt-text">${typeData.prompt}</div>
      </div>
    </div>

    <div class="result-description">
      <h3>あなたのタイプ</h3>
      <p>${typeData.description}</p>
      <p style="margin-top: 0.75rem; color: var(--text-dim); font-size: 0.8rem;">
        <strong style="color: var(--accent-light);">${at === 'A' ? 'Assertive（自己確信型）' : 'Turbulent（慎重型）'}</strong>：
        ${at === 'A' ? 'ストレスに強く、自分の判断を信頼する。感情に振り回されにくい。' : '完璧を求め、常に改善を意識する。繊細だが成長への意欲が高い。'}
      </p>
      <p style="margin-top: 0.5rem; color: var(--text-dim); font-size: 0.8rem;">
        <strong style="color: var(--accent-light);">${hl === 'H' ? 'Harmony（協調型）' : 'Lone Wolf（独立型）'}</strong>：
        ${hl === 'H' ? 'チームワークと調和を重視。共有された目標に向かって人と協力することに喜びを感じる。' : '独立して働くことを好む。個人の専門性と独自の価値を追求するスペシャリスト。'}
      </p>
    </div>

    <div class="spectrum-breakdown">
      ${state.results.map((side, i) => {
        const sp = spectrums[i];
        const isA = side === 'a';
        const pct = isA ? 75 : 25;
        return `
          <div class="spectrum-row">
            <span class="spectrum-label-left">${sp.labels[0]}</span>
            <div class="spectrum-bar-track">
              <div class="spectrum-bar-fill ${isA ? 'left' : 'right'}" style="width: ${isA ? '75%' : '75%'}; ${isA ? '' : 'margin-left: 25%;'}"></div>
            </div>
            <span class="spectrum-label-right">${sp.labels[1]}</span>
            <span class="spectrum-confirmed">${sp.labels[isA ? 0 : 1]}</span>
          </div>
        `;
      }).join('')}
    </div>

    <button class="btn-retry" id="btn-retry">もう一度診断する</button>
  `;

  document.getElementById('btn-retry').addEventListener('click', () => {
    switchScreen(startScreen);
  });

  switchScreen(resultScreen);
  resultScreen.scrollTop = 0;
}

function getOjisanEmoji(type) {
  const map = {
    INTJ: '🧠', INTP: '🔬', ENTJ: '👔', ENTP: '💡',
    INFJ: '🕯️', INFP: '📖', ENFJ: '🎓', ENFP: '🎨',
    ISTJ: '📋', ISFJ: '🌿', ESTJ: '🏢', ESFJ: '☀️',
    ISTP: '🔧', ISFP: '🎨', ESTP: '🏍️', ESFP: '🎸',
  };
  return map[type] || '🧔';
}

// === SWIPE HANDLING ===
function setupSwipe() {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;
  const THRESHOLD = 80;

  function onStart(x, y) {
    if (state.isAnimating) return;
    isDragging = true;
    startX = x;
    startY = y;
    currentX = 0;
    card.classList.add('swiping');
  }

  function onMove(x, y) {
    if (!isDragging) return;
    const dx = x - startX;
    const dy = y - startY;

    // If vertical movement is dominant, don't swipe
    if (Math.abs(dy) > Math.abs(dx) * 1.5 && Math.abs(dx) < 20) {
      return;
    }

    currentX = dx;
    const rotation = dx * 0.08;
    card.style.transform = `translateX(${dx}px) rotate(${rotation}deg)`;

    // Show hints
    const opacity = Math.min(Math.abs(dx) / THRESHOLD, 1);
    if (dx > 0) {
      hintRight.style.opacity = opacity;
      hintLeft.style.opacity = 0;
    } else {
      hintLeft.style.opacity = opacity;
      hintRight.style.opacity = 0;
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove('swiping');

    if (Math.abs(currentX) >= THRESHOLD) {
      // Animate out
      state.isAnimating = true;
      const direction = currentX > 0 ? 1 : -1;
      card.classList.add('animate-out');
      card.style.transform = `translateX(${direction * 400}px) rotate(${direction * 30}deg)`;
      card.style.opacity = '0';

      setTimeout(() => {
        card.classList.remove('animate-out');
        card.style.transform = '';
        card.style.opacity = '';
        state.isAnimating = false;
        answer(direction > 0 ? 'a' : 'b');
      }, 300);
    } else {
      // Snap back
      card.style.transform = '';
      hintLeft.style.opacity = 0;
      hintRight.style.opacity = 0;
    }
  }

  // Touch events
  card.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    onStart(t.clientX, t.clientY);
  }, { passive: true });

  card.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  }, { passive: true });

  card.addEventListener('touchend', onEnd);
  card.addEventListener('touchcancel', onEnd);

  // Mouse events
  card.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onStart(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    onMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onEnd);
}

// === BOOT ===
init();
