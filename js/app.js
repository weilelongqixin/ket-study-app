// Main Application Logic
const App = {
  currentView: 'home',
  speechSynthesis: window.speechSynthesis || null,
  selectedSpeechRate: 0.9,

  // Initialize app
  init() {
    this.showView('home');
    this.updateHomeStats();
    this.renderAchievements();
  },

  // Navigation
  showView(view) {
    this.currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const el = document.getElementById('view-' + view);
    if (el) el.classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navEl = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (navEl) navEl.classList.add('active');

    // Update title
    const titles = {
      home: '🏠 KET学习营',
      words: '📝 单词关卡',
      reading: '📖 阅读理解',
      listening: '👂 听力练习',
      exam: '✏️ 真题训练',
      parent: '👨‍👩‍👦 家长面板'
    };
    const titleEl = document.getElementById('app-title');
    if (titleEl) titleEl.textContent = titles[view] || 'KET学习营';

    // Load view content
    switch (view) {
      case 'home': this.updateHomeStats(); this.renderAchievements(); break;
      case 'words': this.startWords(); break;
      case 'reading': this.startReading(); break;
      case 'listening': this.startListening(); break;
      case 'exam': this.startExam(); break;
      case 'parent': this.showParentLogin(); break;
    }
  },

  // ============ HOME ============
  updateHomeStats() {
    const stats = Storage.getStats();
    const streak = Storage.getStreak();
    const wordProgress = Storage.getWordProgress();
    const todayData = Storage.getTodayData();

    const el = document.getElementById('home-stats');
    if (!el) return;

    const todayStars = todayData.reduce((s, d) => s + (d.stars || 0), 0);
    const todayModules = new Set(todayData.map(d => d.module)).size;
    const accuracy = stats.totalQuestions > 0
      ? Math.round(stats.totalCorrect / stats.totalQuestions * 100)
      : 0;

    el.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card stat-stars">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${stats.totalStars}</div>
          <div class="stat-label">总星星</div>
        </div>
        <div class="stat-card stat-streak">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${streak.current}</div>
          <div class="stat-label">连续打卡</div>
        </div>
        <div class="stat-card stat-accuracy">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">正确率</div>
        </div>
        <div class="stat-card stat-words">
          <div class="stat-icon">📚</div>
          <div class="stat-value">${wordProgress.mastered}/${wordProgress.total}</div>
          <div class="stat-label">已掌握单词</div>
        </div>
      </div>
      <div class="today-banner">
        ${todayModules > 0
          ? `✅ 今天已完成 ${todayModules} 个模块，获得 ${todayStars} ⭐`
          : '👋 今天还没开始学习哦，加油！'}
      </div>
    `;
  },

  renderAchievements() {
    const achievements = Storage.getAchievements();
    const allAchievements = [
      { id: 'first_star', name: '⭐ 初露锋芒', desc: '获得第一颗星星' },
      { id: 'ten_stars', name: '🌟 小有成就', desc: '获得10颗星星' },
      { id: 'fifty_stars', name: '💫 星光闪耀', desc: '获得50颗星星' },
      { id: 'hundred_stars', name: '✨ 百星之王', desc: '获得100颗星星' },
      { id: 'streak_3', name: '🔥 三连打卡', desc: '连续学习3天' },
      { id: 'streak_7', name: '📅 坚持一周', desc: '连续学习7天' },
      { id: 'streak_30', name: '🏆 月度冠军', desc: '连续学习30天' },
      { id: 'words_50', name: '📚 词汇达人', desc: '掌握50个单词' },
      { id: 'words_100', name: '📖 词汇大师', desc: '掌握100个单词' },
      { id: 'words_150', name: '🎓 词汇博士', desc: '掌握全部150个单词' },
      { id: 'accuracy_80', name: '🎯 精准射手', desc: '正确率达到80%' },
      { id: 'accuracy_90', name: '🎖️ 神枪手', desc: '正确率达到90%' },
    ];
    const unlocked = new Set(achievements.map(a => a.id));
    const el = document.getElementById('home-achievements');
    if (!el) return;
    el.innerHTML = allAchievements.map(a => `
      <div class="achievement-badge ${unlocked.has(a.id) ? 'unlocked' : 'locked'}">
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
      </div>
    `).join('');
  },

  // ============ WORDS MODULE ============
  wordState: { index: 0, words: [], mode: 'select', correct: 0, total: 0, startTime: 0 },

  startWords() {
    const day = Storage.getCurrentWordDay();
    const dayWords = KET_WORDS.filter(w => w.day === day);
    this.wordState = { index: 0, words: dayWords, mode: 'select', correct: 0, total: dayWords.length, startTime: Date.now() };
    this.renderWordQuestion();
  },

  renderWordQuestion() {
    const el = document.getElementById('view-words');
    if (!el) return;
    const { index, words } = this.wordState;

    if (index >= words.length) {
      this.finishWords();
      return;
    }

    const word = words[index];
    const progress = `第 ${index + 1} / ${words.length} 题`;

    if (this.wordState.mode === 'select') {
      // Generate 4 options including the correct translation
      const otherTranslations = KET_WORDS
        .filter(w => w.word !== word.word)
        .map(w => w.translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...otherTranslations, word.translation].sort(() => Math.random() - 0.5);

      el.innerHTML = `
        <div class="module-header">
          <div class="module-progress">${progress} | Day ${word.day}</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(index / words.length) * 100}%"></div></div>
        </div>
        <div class="word-card">
          <div class="word-english">${word.word}</div>
          <div class="word-pos">${word.pos}</div>
          <div class="word-instruction">这个单词是什么意思？</div>
          <div class="word-options">
            ${options.map((opt, i) => `
              <button class="word-option" onclick="App.answerWord(${i === options.indexOf(word.translation)})" data-value="${opt}">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  answerWord(correct) {
    const word = this.wordState.words[this.wordState.index];
    Storage.recordAnswer(correct, 'words', word.word);
    Storage.updateWordStat(word.word, correct);

    if (correct) {
      this.wordState.correct++;
      this.showFeedback(true, `✅ 正确！${word.word} = ${word.translation}`);
      // Play sound
      this.playSound('correct');
    } else {
      this.showFeedback(false, `❌ 正确答案是：${word.translation}`);
      this.playSound('wrong');
    }

    // Show example after feedback
    setTimeout(() => {
      const el = document.getElementById('view-words');
      const feedback = el.querySelector('.feedback');
      if (feedback) {
        feedback.innerHTML += `
          <div class="word-example">
            <div class="example-label">📝 例句：</div>
            <div class="example-text">${word.example}</div>
            <button class="btn-small" onclick="App.speak('${word.example}')">🔊 听发音</button>
            <button class="btn-small btn-next" onclick="App.nextWord()">下一题 →</button>
          </div>
        `;
      }
    }, 500);
  },

  nextWord() {
    this.wordState.index++;
    this.renderWordQuestion();
  },

  finishWords() {
    const timeSpent = Math.round((Date.now() - this.wordState.startTime) / 1000);
    const stars = this.wordState.correct >= 9 ? 3 : this.wordState.correct >= 7 ? 2 : 1;

    Storage.recordSession('words', {
      stars: stars,
      correct: this.wordState.correct,
      total: this.wordState.total,
      timeSpent: timeSpent
    });

    // Advance word day if all correct or user has seen all words
    if (this.wordState.correct >= 7) {
      Storage.advanceWordDay();
    }

    const newAch = Storage.checkAchievements();
    const el = document.getElementById('view-words');
    el.innerHTML = `
      <div class="result-card">
        <div class="result-celebrate">${stars >= 3 ? '🎉' : stars >= 2 ? '🌟' : '👍'}</div>
        <h2>单词关卡完成！</h2>
        <div class="result-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="result-stats">
          <p>正确：${this.wordState.correct} / ${this.wordState.total}</p>
          <p>用时：${this.wordState.timeSpent || timeSpent} 秒</p>
        </div>
        ${newAch.length > 0 ? this.renderNewAchievements(newAch) : ''}
        <div class="result-actions">
          <button class="btn-primary" onclick="App.startWords()">🔄 再练一组</button>
          <button class="btn-secondary" onclick="App.showView('home')">🏠 返回首页</button>
        </div>
      </div>
    `;
    this.updateHomeStats();
  },

  // ============ READING MODULE ============
  readingState: { index: 0, qIndex: 0, correct: 0, total: 0, startTime: 0 },

  startReading() {
    const idx = Math.floor(Math.random() * KET_READING.length);
    const passage = KET_READING[idx];
    this.readingState = { passage, qIndex: 0, correct: 0, total: passage.questions.length, startTime: Date.now() };
    this.renderReadingQuestion();
  },

  renderReadingQuestion() {
    const el = document.getElementById('view-reading');
    if (!el) return;
    const { passage, qIndex } = this.readingState;

    if (qIndex >= passage.questions.length) {
      this.finishReading();
      return;
    }

    const question = passage.questions[qIndex];

    el.innerHTML = `
      <div class="module-header">
        <div class="module-progress">第 ${qIndex + 1} / ${passage.questions.length} 题</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / passage.questions.length) * 100}%"></div></div>
      </div>
      <div class="reading-card">
        <h3>${passage.title} <span class="difficulty-badge difficulty-${passage.difficulty.toLowerCase()}">${passage.difficulty}</span></h3>
        <div class="reading-passage">${passage.passage}</div>
        <div class="reading-question">
          <div class="question-text">${question.q}</div>
          <div class="reading-options">
            ${question.options.map((opt, i) => `
              <button class="reading-option" onclick="App.answerReading(${i === question.answer})">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span> ${opt}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="feedback" id="reading-feedback"></div>
      </div>
    `;
  },

  answerReading(correct) {
    const { passage, qIndex } = this.readingState;
    const question = passage.questions[qIndex];
    Storage.recordAnswer(correct, 'reading');

    if (correct) {
      this.readingState.correct++;
      this.showFeedback(true, `✅ 回答正确！`);
      this.playSound('correct');
    } else {
      const correctAnswer = question.options[question.answer];
      this.showFeedback(false, `❌ 正确答案是：${correctAnswer}`);
      this.playSound('wrong');
    }

    setTimeout(() => {
      const fb = document.getElementById('reading-feedback');
      if (fb) {
        fb.innerHTML += `
          <button class="btn-small btn-next" onclick="App.nextReading()">下一题 →</button>
        `;
      }
    }, 500);
  },

  nextReading() {
    this.readingState.qIndex++;
    this.renderReadingQuestion();
  },

  finishReading() {
    const timeSpent = Math.round((Date.now() - this.readingState.startTime) / 1000);
    const stars = this.readingState.correct >= 4 ? 3 : this.readingState.correct >= 3 ? 2 : 1;

    Storage.recordSession('reading', {
      stars, correct: this.readingState.correct, total: this.readingState.total, timeSpent
    });

    const newAch = Storage.checkAchievements();
    const el = document.getElementById('view-reading');
    el.innerHTML = `
      <div class="result-card">
        <div class="result-celebrate">${stars >= 3 ? '🎉' : stars >= 2 ? '🌟' : '👍'}</div>
        <h2>阅读理解完成！</h2>
        <div class="result-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="result-stats">
          <p>正确：${this.readingState.correct} / ${this.readingState.total}</p>
          <p>用时：${timeSpent} 秒</p>
        </div>
        ${newAch.length > 0 ? this.renderNewAchievements(newAch) : ''}
        <div class="result-actions">
          <button class="btn-primary" onclick="App.startReading()">🔄 再读一篇</button>
          <button class="btn-secondary" onclick="App.showView('home')">🏠 返回首页</button>
        </div>
      </div>
    `;
    this.updateHomeStats();
  },

  // ============ LISTENING MODULE ============
  listeningState: { index: 0, qIndex: 0, correct: 0, total: 0, startTime: 0 },

  startListening() {
    const idx = Math.floor(Math.random() * KET_LISTENING.length);
    const item = KET_LISTENING[idx];
    this.listeningState = { item, qIndex: 0, correct: 0, total: item.questions.length, startTime: Date.now() };
    this.renderListeningQuestion();
  },

  renderListeningQuestion() {
    const el = document.getElementById('view-listening');
    if (!el) return;
    const { item, qIndex } = this.listeningState;

    if (qIndex >= item.questions.length) {
      this.finishListening();
      return;
    }

    const question = item.questions[qIndex];

    el.innerHTML = `
      <div class="module-header">
        <div class="module-progress">第 ${qIndex + 1} / ${item.questions.length} 题</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / item.questions.length) * 100}%"></div></div>
      </div>
      <div class="listening-card">
        <h3>👂 ${item.title}</h3>
        <p class="listening-subtitle">${item.subtitle}</p>
        <div class="listening-controls">
          <button class="btn-play" onclick="App.playListening('${item.id}')">▶️ 播放听力</button>
          <button class="btn-play" onclick="App.playListening('${item.id}', true)">▶️ 慢速播放</button>
          <button class="btn-small" onclick="App.stopListening()">⏹️ 停止</button>
        </div>
        <div class="listening-question">
          <div class="question-text">${question.q}</div>
          <div class="listening-options">
            ${question.options.map((opt, i) => `
              <button class="listening-option" onclick="App.answerListening(${i === question.answer})">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span> ${opt}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="feedback" id="listening-feedback"></div>
        <details class="transcript-details">
          <summary>📝 查看听力原文</summary>
          <div class="transcript-text">${item.transcript}</div>
        </details>
      </div>
    `;
  },

  playListening(itemId, slow) {
    this.stopListening();
    const item = KET_LISTENING.find(l => l.id === itemId);
    if (!item) return;

    const playBtns = document.querySelectorAll('.btn-play');
    playBtns.forEach(b => { b.textContent = '⏳ 加载中...'; });

    // 创建新的Audio对象（避免复用导致的缓存问题）
    this._audioPlayer = new Audio();
    
    // 音频路径：确保在任何环境下都能找到
    const base = window.location.pathname.replace(/\/[^/]*$/, '/');
    const audioUrl = base + 'assets/audio/listening_' + itemId + '.mp3';
    console.log('音频路径:', audioUrl);
    
    this._audioPlayer.src = audioUrl;
    this._audioPlayer.crossOrigin = 'anonymous';
    this._audioPlayer.preload = 'auto';
    if (slow) this._audioPlayer.playbackRate = 0.6;
    
    this._audioPlayer.addEventListener('canplay', () => {
      console.log('音频已加载，开始播放');
      this._audioPlayer.play().then(() => {
        playBtns.forEach(b => { b.textContent = '🔊 正在播放'; });
      }).catch(err => {
        console.error('播放失败:', err);
        this._trySpeechSynthesis(item, slow, playBtns);
      });
    }, { once: true });
    
    this._audioPlayer.addEventListener('error', (e) => {
      console.error('音频加载失败:', e, '路径:', audioUrl);
      this._trySpeechSynthesis(item, slow, playBtns);
    }, { once: true });
    
    // 触发加载
    this._audioPlayer.load();
    
    // 超时检测：5秒后如果还没播放，尝试降级
    clearTimeout(this._audioTimeout);
    this._audioTimeout = setTimeout(() => {
      if (this._audioPlayer && this._audioPlayer.paused) {
        console.warn('音频5秒未开始播放，降级到语音合成');
        this._trySpeechSynthesis(item, slow, playBtns);
      }
    }, 5000);
  },

  _trySpeechSynthesis(item, slow, playBtns) {
    if (this.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
      try {
        this.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(item.transcript);
        u.lang = 'en-US';
        u.rate = slow ? 0.6 : 0.9;
        u.onstart = () => playBtns.forEach(b => { b.textContent = '🔊 正在播放'; });
        u.onend = () => playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; });
        this.speechSynthesis.speak(u);
        return;
      } catch(e) { console.warn('SpeechSynthesis也失败:', e); }
    }
    this._showListenFallback(item, playBtns);
  },

  _showListenFallback(item, playBtns) {
    playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; });
    const details = document.querySelector('#view-listening details');
    if (details) details.open = true;
    const feedback = document.getElementById('listening-feedback');
    if (feedback) {
      feedback.innerHTML = '<p style="color:#faad14; padding:10px; background:#fffbe6; border-radius:8px;">⚠️ 语音播放失败，已展开原文。请大声朗读练习！</p>';
    }
  },

  stopListening() {
    clearTimeout(this._audioTimeout);
    if (this._audioPlayer) {
      try { this._audioPlayer.pause(); this._audioPlayer.currentTime = 0; } catch(e){}
    }
    if (this.speechSynthesis) {
      try { this.speechSynthesis.cancel(); } catch(e){}
    }
    document.querySelectorAll('.btn-play').forEach(b => { b.textContent = '▶️ 播放听力'; });
  },

  speak(text) {
    if (!this.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      // 降级：用Google TTS
      const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`);
      audio.play().catch(() => {});
      return;
    }
    this.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = this.selectedSpeechRate;
    this.speechSynthesis.speak(u);
  },

  answerListening(correct) {
    const { item, qIndex } = this.listeningState;
    const question = item.questions[qIndex];
    Storage.recordAnswer(correct, 'listening');

    if (correct) {
      this.listeningState.correct++;
      this.showFeedback(true, `✅ 回答正确！`);
      this.playSound('correct');
    } else {
      const correctAnswer = question.options[question.answer];
      this.showFeedback(false, `❌ 正确答案是：${correctAnswer}`);
      this.playSound('wrong');
    }

    setTimeout(() => {
      const fb = document.getElementById('listening-feedback');
      if (fb) {
        fb.innerHTML += `<button class="btn-small btn-next" onclick="App.nextListening()">下一题 →</button>`;
      }
    }, 500);
  },

  nextListening() {
    this.listeningState.qIndex++;
    this.renderListeningQuestion();
  },

  finishListening() {
    const timeSpent = Math.round((Date.now() - this.listeningState.startTime) / 1000);
    const stars = this.listeningState.correct >= 3 ? 3 : this.listeningState.correct >= 2 ? 2 : 1;

    Storage.recordSession('listening', {
      stars, correct: this.listeningState.correct, total: this.listeningState.total, timeSpent
    });

    const newAch = Storage.checkAchievements();
    const el = document.getElementById('view-listening');
    el.innerHTML = `
      <div class="result-card">
        <div class="result-celebrate">${stars >= 3 ? '🎉' : stars >= 2 ? '🌟' : '👍'}</div>
        <h2>听力练习完成！</h2>
        <div class="result-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="result-stats">
          <p>正确：${this.listeningState.correct} / ${this.listeningState.total}</p>
          <p>用时：${timeSpent} 秒</p>
        </div>
        ${newAch.length > 0 ? this.renderNewAchievements(newAch) : ''}
        <div class="result-actions">
          <button class="btn-primary" onclick="App.startListening()">🔄 再练一段</button>
          <button class="btn-secondary" onclick="App.showView('home')">🏠 返回首页</button>
        </div>
      </div>
    `;
    this.updateHomeStats();
  },

  // ============ EXAM MODULE ============
  examState: { questions: [], qIndex: 0, correct: 0, total: 0, startTime: 0, section: '' },

  startExam() {
    const dayMap = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday',
      4: 'thursday', 5: 'friday', 6: 'saturday'
    };
    const today = new Date().getDay();
    const dayKey = dayMap[today];
    const examData = KET_EXAM[dayKey];

    if (!examData) {
      document.getElementById('view-exam').innerHTML = '<p>今日无真题训练内容</p>';
      return;
    }

    // Saturday: use listening data
    if (dayKey === 'saturday') {
      const listenItem = KET_LISTENING[Math.floor(Math.random() * KET_LISTENING.length)];
      this.examState = {
        questions: listenItem.questions,
        qIndex: 0,
        correct: 0,
        total: listenItem.questions.length,
        startTime: Date.now(),
        section: '听力综合模拟',
        listeningItem: listenItem
      };
      this.renderExamListening();
      return;
    }

    this.examState = {
      questions: examData.questions,
      qIndex: 0,
      correct: 0,
      total: examData.questions.length,
      startTime: Date.now(),
      section: examData.title
    };

    // Show exam intro
    const el = document.getElementById('view-exam');
    el.innerHTML = `
      <div class="exam-intro">
        <div class="exam-day-badge">${['周日','周一','周二','周三','周四','周五','周六'][today]}</div>
        <h2>${examData.part}</h2>
        <h3>${examData.title}</h3>
        <p class="exam-instruction">${examData.instruction}</p>
        <p class="exam-count">共 ${examData.questions.length} 题</p>
        <button class="btn-primary btn-big" onclick="App.renderExamQuestion()">开始答题 →</button>
      </div>
    `;
  },

  renderExamListening() {
    const el = document.getElementById('view-exam');
    const { questions, qIndex, section, listeningItem } = this.examState;

    if (qIndex >= questions.length) {
      this.finishExam();
      return;
    }

    const question = questions[qIndex];
    el.innerHTML = `
      <div class="module-header">
        <div class="module-progress">${section} | 第 ${qIndex + 1} / ${questions.length} 题</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
      </div>
      <div class="listening-card">
        <h3>👂 ${listeningItem.title}</h3>
        <div class="listening-controls">
          <button class="btn-play" onclick="App.playListening(${listeningItem.id})">▶️ 播放</button>
          <button class="btn-play" onclick="App.playListening(${listeningItem.id}, true)">▶️ 慢速</button>
          <button class="btn-small" onclick="App.stopListening()">⏹️ 停止</button>
        </div>
        <div class="listening-question">
          <div class="question-text">${question.q}</div>
          <div class="listening-options">
            ${question.options.map((opt, i) => `
              <button class="listening-option" onclick="App.answerExam(${i === question.answer})">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span> ${opt}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="feedback" id="exam-feedback"></div>
        <details class="transcript-details">
          <summary>📝 查看原文</summary>
          <div class="transcript-text">${listeningItem.transcript}</div>
        </details>
      </div>
    `;
  },

  renderExamQuestion() {
    const el = document.getElementById('view-exam');
    const { questions, qIndex, section } = this.examState;

    if (qIndex >= questions.length) {
      this.finishExam();
      return;
    }

    const question = questions[qIndex];

    // Handle different question types
    if (question.type === 'fill') {
      el.innerHTML = `
        <div class="module-header">
          <div class="module-progress">${section} | 第 ${qIndex + 1} / ${questions.length} 题</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
        </div>
        <div class="exam-card">
          <div class="exam-section-tag">${question.section || section}</div>
          <div class="fill-question">
            <div class="question-text">${question.text}</div>
            <p class="fill-hint">💡 提示：${question.hint || ''}</p>
            <input type="text" class="fill-input" id="fill-answer" placeholder="输入单词..." autocomplete="off" />
            <button class="btn-primary" onclick="App.answerFill()">提交答案</button>
          </div>
          <div class="feedback" id="exam-feedback"></div>
        </div>
      `;
      setTimeout(() => {
        const input = document.getElementById('fill-answer');
        if (input) {
          input.focus();
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') App.answerFill();
          });
        }
      }, 100);
      return;
    }

    if (question.type === 'writing') {
      el.innerHTML = `
        <div class="module-header">
          <div class="module-progress">${section} | 第 ${qIndex + 1} / ${questions.length} 题</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
        </div>
        <div class="exam-card">
          <div class="exam-section-tag">${question.section || 'Writing'}</div>
          <div class="writing-question">
            <div class="question-text">${question.text || question.prompt}</div>
            ${question.model ? `<p class="writing-tip">📝 范文参考：<br><span class="model-answer">${question.model.replace(/\n/g, '<br>')}</span></p>` : ''}
            <textarea class="writing-input" id="writing-answer" rows="8" placeholder="在此输入你的英文写作（至少25个单词）..."></textarea>
            <div class="word-count" id="word-count">0 words</div>
            <div class="writing-actions">
              <button class="btn-primary" onclick="App.submitWriting()">提交完成 ✓</button>
              <button class="btn-small" onclick="App.speakWriting()">🔊 朗读范文</button>
            </div>
          </div>
          <div class="feedback" id="exam-feedback"></div>
        </div>
      `;
      setTimeout(() => {
        const ta = document.getElementById('writing-answer');
        if (ta) {
          ta.addEventListener('input', () => {
            const wc = ta.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            document.getElementById('word-count').textContent = `${wc} words`;
            document.getElementById('word-count').className = 'word-count ' + (wc >= 25 ? 'word-count-ok' : 'word-count-low');
          });
        }
      }, 100);
      return;
    }

    // Standard multiple choice
    el.innerHTML = `
      <div class="module-header">
        <div class="module-progress">${section} | 第 ${qIndex + 1} / ${questions.length} 题</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
      </div>
      <div class="exam-card">
        ${question.section ? `<div class="exam-section-tag">${question.section}</div>` : ''}
        <div class="exam-text">${question.text}</div>
        ${question.q ? `<div class="question-text">${question.q}</div>` : ''}
        <div class="exam-options">
          ${(question.options || []).map((opt, i) => `
            <button class="exam-option" onclick="App.answerExam(${i === question.answer})">
              <span class="option-letter">${String.fromCharCode(65 + i)}</span> ${opt}
            </button>
          `).join('')}
        </div>
        <div class="feedback" id="exam-feedback"></div>
      </div>
    `;
  },

  answerExam(correct) {
    Storage.recordAnswer(correct, 'exam');
    if (correct) {
      this.examState.correct++;
      this.showFeedback(true, '✅ 正确！');
      this.playSound('correct');
    } else {
      const question = this.examState.questions[this.examState.qIndex];
      const correctAns = question.options ? question.options[question.answer] : '';
      this.showFeedback(false, `❌ 正确答案：${correctAns}`);
      this.playSound('wrong');
    }
    setTimeout(() => {
      const fb = document.getElementById('exam-feedback');
      if (fb) fb.innerHTML += `<button class="btn-small btn-next" onclick="App.nextExam()">下一题 →</button>`;
    }, 500);
  },

  answerFill() {
    const input = document.getElementById('fill-answer');
    if (!input) return;
    const userAns = input.value.trim().toUpperCase().replace(/_/g, '').replace(/\s/g, '');
    const question = this.examState.questions[this.examState.qIndex];
    const correctAns = question.answer.toUpperCase().replace(/\s/g, '');
    const correct = userAns === correctAns;

    Storage.recordAnswer(correct, 'exam');
    if (correct) {
      this.examState.correct++;
      this.showFeedback(true, `✅ 正确！答案是：${question.answer}`);
      this.playSound('correct');
    } else {
      this.showFeedback(false, `❌ 正确答案：${question.answer}`);
      this.playSound('wrong');
    }
    setTimeout(() => {
      const fb = document.getElementById('exam-feedback');
      if (fb) fb.innerHTML += `<button class="btn-small btn-next" onclick="App.nextExam()">下一题 →</button>`;
    }, 500);
  },

  submitWriting() {
    const ta = document.getElementById('writing-answer');
    if (!ta || ta.value.trim().length < 25) {
      const fb = document.getElementById('exam-feedback');
      if (fb) fb.innerHTML = '<div class="feedback-wrong">⚠️ 请至少写25个单词！</div>';
      return;
    }

    Storage.recordAnswer(true, 'exam');
    this.examState.correct++;
    this.showFeedback(true, '✅ 写作完成！做得很好！');

    const question = this.examState.questions[this.examState.qIndex];
    if (question.model) {
      const fb = document.getElementById('exam-feedback');
      fb.innerHTML += `
        <div class="writing-comparison">
          <h4>📝 范文参考：</h4>
          <div class="model-answer">${question.model.replace(/\n/g, '<br>')}</div>
        </div>
        <button class="btn-small btn-next" onclick="App.nextExam()">下一题 →</button>
      `;
    }
  },

  speakWriting() {
    const question = this.examState.questions[this.examState.qIndex];
    if (question.model) {
      this.speak(question.model);
    }
  },

  nextExam() {
    this.examState.qIndex++;
    if (this.examState.section.includes('听力')) {
      this.renderExamListening();
    } else {
      this.renderExamQuestion();
    }
  },

  finishExam() {
    const timeSpent = Math.round((Date.now() - this.examState.startTime) / 1000);
    const { correct, total, section } = this.examState;
    const stars = correct >= total * 0.9 ? 3 : correct >= total * 0.6 ? 2 : 1;

    Storage.recordSession('exam', {
      stars, correct, total, timeSpent,
      detail: section
    });

    const newAch = Storage.checkAchievements();
    const el = document.getElementById('view-exam');
    el.innerHTML = `
      <div class="result-card">
        <div class="result-celebrate">${stars >= 3 ? '🎉' : stars >= 2 ? '🌟' : '👍'}</div>
        <h2>真题训练完成！</h2>
        <div class="result-section">${section}</div>
        <div class="result-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="result-stats">
          <p>正确：${correct} / ${total}</p>
          <p>正确率：${Math.round(correct / total * 100)}%</p>
          <p>用时：${timeSpent} 秒</p>
        </div>
        ${newAch.length > 0 ? this.renderNewAchievements(newAch) : ''}
        <div class="result-actions">
          <button class="btn-primary" onclick="App.startExam()">🔄 再练一组</button>
          <button class="btn-secondary" onclick="App.showView('home')">🏠 返回首页</button>
        </div>
      </div>
    `;
    this.updateHomeStats();
  },

  // ============ PARENT PANEL ============
  showParentLogin() {
    const el = document.getElementById('view-parent');
    el.innerHTML = `
      <div class="parent-login">
        <div class="login-icon">🔒</div>
        <h2>家长面板</h2>
        <p>请输入密码查看学习数据</p>
        <input type="password" class="login-input" id="parent-password" placeholder="请输入密码" autocomplete="off" />
        <button class="btn-primary btn-big" onclick="App.checkParentPassword()">进入</button>
        <p class="login-hint">默认密码：8888</p>
      </div>
    `;
    setTimeout(() => {
      const input = document.getElementById('parent-password');
      if (input) {
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') App.checkParentPassword();
        });
      }
    }, 100);
  },

  checkParentPassword() {
    const input = document.getElementById('parent-password');
    if (input && input.value === '8888') {
      this.showParentPanel();
    } else {
      const el = document.getElementById('view-parent');
      el.innerHTML = `
        <div class="parent-login">
          <div class="login-icon">❌</div>
          <h2>密码错误</h2>
          <button class="btn-primary" onclick="App.showParentLogin()">重试</button>
        </div>
      `;
    }
  },

  showParentPanel() {
    const stats = Storage.getStats();
    const streak = Storage.getStreak();
    const wordProgress = Storage.getWordProgress();
    const last7 = Storage.getLast7Days();
    const mistakes = Storage.getMistakes();
    const todayData = Storage.getTodayData();

    const todayStars = todayData.reduce((s, d) => s + (d.stars || 0), 0);
    const todayCorrect = todayData.reduce((s, d) => s + (d.correct || 0), 0);
    const todayTotal = todayData.reduce((s, d) => s + (d.total || 0), 0);
    const todayTime = todayData.reduce((s, d) => s + (d.timeSpent || 0), 0);
    const todayAccuracy = todayTotal > 0 ? Math.round(todayCorrect / todayTotal * 100) : 0;
    const overallAccuracy = stats.totalQuestions > 0 ? Math.round(stats.totalCorrect / stats.totalQuestions * 100) : 0;

    const el = document.getElementById('view-parent');
    el.innerHTML = `
      <div class="parent-panel">
        <div class="parent-header">
          <h2>👨‍👩‍👦 家长监控面板</h2>
          <button class="btn-small btn-export" onclick="App.exportReport()">📋 导出报告</button>
        </div>

        <div class="parent-section">
          <h3>📊 今日学习概况</h3>
          <div class="parent-stats-grid">
            <div class="parent-stat">
              <div class="parent-stat-label">完成模块</div>
              <div class="parent-stat-value">${new Set(todayData.map(d => d.module)).size} / 4</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">今日正确率</div>
              <div class="parent-stat-value">${todayAccuracy}%</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">今日星星</div>
              <div class="parent-stat-value">⭐ ${todayStars}</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">今日用时</div>
              <div class="parent-stat-value">${Math.round(todayTime / 60)} 分钟</div>
            </div>
          </div>
          ${new Set(todayData.map(d => d.module)).size < 4 ? `<div class="parent-alert">⚠️ 今日还有 ${4 - new Set(todayData.map(d => d.module)).size} 个模块未完成</div>` : `<div class="parent-success">✅ 今日学习任务已全部完成！</div>`}
        </div>

        <div class="parent-section">
          <h3>📅 最近7天打卡</h3>
          <div class="checkin-grid">
            ${last7.map(d => `
              <div class="checkin-day ${d.checked ? 'checked' : 'missed'}">
                <div class="checkin-day-name">${d.dayName}</div>
                <div class="checkin-icon">${d.checked ? '✅' : '⚪'}</div>
                <div class="checkin-stars">${d.stars > 0 ? '⭐' + d.stars : ''}</div>
                <div class="checkin-accuracy">${d.accuracy > 0 ? d.accuracy + '%' : ''}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="parent-section">
          <h3>📈 总体数据</h3>
          <div class="parent-stats-grid">
            <div class="parent-stat">
              <div class="parent-stat-label">总星星</div>
              <div class="parent-stat-value">⭐ ${stats.totalStars}</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">总体正确率</div>
              <div class="parent-stat-value">${overallAccuracy}%</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">最长连续</div>
              <div class="parent-stat-value">🔥 ${streak.longest} 天</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">词汇掌握</div>
              <div class="parent-stat-value">📚 ${wordProgress.mastered}/${wordProgress.total}</div>
            </div>
          </div>
          <div class="progress-bar overall">
            <div class="progress-fill" style="width:${wordProgress.mastered / wordProgress.total * 100}%">
              ${Math.round(wordProgress.mastered / wordProgress.total * 100)}%
            </div>
          </div>
        </div>

        <div class="parent-section">
          <h3>❌ 错题本 (最近${Math.min(mistakes.length, 20)}条)</h3>
          ${mistakes.length === 0 ? '<p class="empty-hint">暂无错题，继续保持！</p>' : `
            <div class="mistake-list">
              ${mistakes.slice(-20).reverse().map(m => `
                <div class="mistake-item">
                  <span class="mistake-module">${m.module}</span>
                  <span class="mistake-word">${m.word || ''}</span>
                  <span class="mistake-date">${m.date}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div class="parent-section">
          <h3>📚 词汇掌握详情</h3>
          <div class="word-progress-detail">
            <div class="word-stat-row">
              <span class="word-stat-label">已学习</span>
              <span class="word-stat-value">${wordProgress.learned} 词</span>
            </div>
            <div class="word-stat-row">
              <span class="word-stat-label">已掌握(答对≥3次)</span>
              <span class="word-stat-value">${wordProgress.mastered} 词</span>
            </div>
            <div class="word-stat-row">
              <span class="word-stat-label">未学习</span>
              <span class="word-stat-value">${wordProgress.total - wordProgress.learned} 词</span>
            </div>
          </div>
        </div>

        <div class="parent-actions">
          <button class="btn-small btn-danger" onclick="App.confirmReset()">🗑️ 重置所有数据</button>
        </div>
      </div>
    `;
  },

  exportReport() {
    const data = Storage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ket-study-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  confirmReset() {
    if (confirm('确定要重置所有学习数据吗？此操作不可撤销！')) {
      Storage.resetAll();
      this.showParentLogin();
    }
  },

  // ============ UTILITIES ============
  showFeedback(correct, message) {
    const feedback = document.querySelector('.feedback') || document.getElementById('exam-feedback');
    if (feedback) {
      feedback.className = 'feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');
      feedback.innerHTML = `<div class="feedback-message">${message}</div>`;
    }
  },

  playSound(type) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
      } else {
        oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime + 0.15);
      }

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // Audio not supported
    }
  },

  renderNewAchievements(achievements) {
    if (!achievements || achievements.length === 0) return '';
    return `
      <div class="new-achievements">
        <h3>🏆 新成就解锁！</h3>
        ${achievements.map(a => `
          <div class="new-achievement">
            <span class="ach-name">${a.name}</span>
            <span class="ach-desc">${a.desc}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
}
