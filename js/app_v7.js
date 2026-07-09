// Main Application Logic
const App = {
  currentView: 'home',
  speechSynthesis: window.speechSynthesis || null,
  selectedSpeechRate: 0.9,

  // Initialize app - check if logged in
  init() {
    const savedId = Storage.getStudentId();
    if (savedId) {
      // 已登录，直接进主应用
      const names = { 'student1': '大宝', 'student2': '二宝', 'parent': '家长' };
      Storage.setStudent(savedId, names[savedId] || savedId);
      this.enterApp();
    }
    // 否则显示登录选学生页面
  },

  // 学生登录
  login(id, name) {
    Storage.setStudent(id, name);
    this.enterApp();
  },

  // 进入主应用
  enterApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    const badge = document.getElementById('student-badge');
    const sid = Storage.getStudentId();
    const names = { 'student1': '👦 大宝', 'student2': '👧 二宝', 'parent': '👨‍👩‍👦 家长' };
    if (badge) badge.textContent = names[sid] || sid;

    if (sid === 'parent') {
      // 家长直接看面板
      this.showView('parent');
    } else {
      // 学生先从服务器拉数据再显示
      Storage.fetchFromServer().then(() => {
        this.showView('home');
        this.updateHomeStats();
        this.renderAchievements();
      }).catch(() => {
        this.showView('home');
        this.updateHomeStats();
        this.renderAchievements();
      });
    }
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
      exam: '🗣️ 口语训练',
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
      case 'authentic': this.showAuthenticListening(); break;
      case 'parent': this.showParentLogin(); break;
    }
  },

  // ============ HOME ============
  updateHomeStats() {
    const stats = Storage.getStats();
    const streak = Storage.getStreak();
    const wordProgress = Storage.getWordProgress();
    const todayData = Storage.getTodayData();
    const allModules = ['words', 'reading', 'listening', 'authentic', 'exam'];

    const el = document.getElementById('home-stats');
    if (!el) return;

    const todayStars = todayData.reduce((s, d) => s + (d.stars || 0), 0);
    const completedToday = new Set(todayData.map(d => d.module));
    const todayModuleCount = completedToday.size;
    const totalModules = allModules.length;
    const accuracy = stats.totalQuestions > 0
      ? Math.round(stats.totalCorrect / stats.totalQuestions * 100)
      : 0;
    const progressPercent = Math.round(todayModuleCount / totalModules * 100);

    // 鼓励语
    let encourage = '';
    if (progressPercent === 0) encourage = '准备好开始今天的学习了吗？💪';
    else if (progressPercent < 40) encourage = '不错！继续加油鸭~ 🦆';
    else if (progressPercent < 80) encourage = '太棒了！马上就全部完成啦！🎉';
    else if (progressPercent < 100) encourage = '就差一点点！冲鸭！🚀';
    else encourage = '全部完成！你是学习小冠军！🏆';

    el.innerHTML = `
      <!-- 今日进度条 -->
      <div class="today-progress-wrap">
        <div class="today-progress-header">
          <span class="today-progress-title">📅 今日进度</span>
          <span class="today-progress-count">${todayModuleCount}/${totalModules}</span>
        </div>
        <div class="today-progress-bar-bg">
          <div class="today-progress-bar-fill" style="width:${progressPercent}%"></div>
        </div>
        <div class="today-progress-encourage">${encourage}</div>
      </div>

      <!-- 数据统计 -->
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

      <!-- 今日获得 -->
      ${todayModuleCount > 0 ? `
      <div class="today-banner">
        ✅ 今天已完成 ${todayModuleCount} 个模块，获得 ${todayStars} ⭐
      </div>
      ` : ''}
    `;

    // 标记今天已完成的模块卡片为绿色
    this._markCompletedModules(todayData);
  },

  _markCompletedModules(todayData) {
    // 获取今天已完成的模块名集合
    const completedModules = new Set(todayData.map(d => d.module));
    
    // 模块名到卡片onclick的映射
    const moduleMap = {
      'words': 'words',
      '单词': 'words',
      'reading': 'reading',
      '阅读': 'reading',
      'listening': 'listening',
      '听力': 'listening',
      'exam': 'exam',
      '口语': 'exam',
      'speaking': 'exam',
      'authentic': 'authentic',
      '真题听力': 'authentic'
    };
    
    const completedViews = new Set();
    completedModules.forEach(m => {
      const view = moduleMap[m];
      if (view) completedViews.add(view);
    });
    
    // 遍历所有模块卡片，标记已完成
    const cards = document.querySelectorAll('.module-card');
    cards.forEach(card => {
      // 获取卡片的onclick里的view名
      const onclick = card.getAttribute('onclick') || '';
      const match = onclick.match(/showView\(['"]([^'"]+)['"]\)/);
      const viewName = match ? match[1] : '';
      
      // 移除旧标记
      card.style.border = '';
      card.style.background = '';
      card.style.opacity = '';
      
      // 找到名字元素和时间元素
      const nameEl = card.querySelector('.module-name');
      const timeEl = card.querySelector('.module-time');
      
      // 移除旧的完成标记
      const oldBadge = card.querySelector('.done-badge');
      if (oldBadge) oldBadge.remove();
      
      if (completedViews.has(viewName)) {
        // 标记为已完成：绿色边框+背景+✅标记
        card.style.border = '2px solid #22c55e';
        card.style.background = 'linear-gradient(135deg,#f0fdf4,#dcfce7)';
        if (timeEl) {
 timeEl.innerHTML = '✅ 今天已完成';
          timeEl.style.color = '#16a34a';
          timeEl.style.fontWeight = 'bold';
        }
      } else {
        // 恢复原始时间文字
        if (timeEl) {
          timeEl.style.color = '';
          timeEl.style.fontWeight = '';
          const def = timeEl.getAttribute('data-default');
          if (def) timeEl.innerHTML = def;
        }
      }
    });
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

  selectedWordDay: null,

  startWords() {
    const el = document.getElementById('view-words');
    if (!el) return;
    const currentDay = Storage.getCurrentWordDay();
    if (!this.selectedWordDay) this.selectedWordDay = currentDay;
    const day = this.selectedWordDay;

    // 生成天数选择按钮 - 根据实际学习记录标绿
    var wordCompletedDays = Storage.get('wordCompletedDays', {}); // {1: true, 2: true, ...}
    var dayButtons = '';
    for (var d = 1; d <= 30; d++) {
      var isCurrent = d === day;
      var isLearned = !!wordCompletedDays[d]; // 根据实际记录判断
      var bg = isCurrent ? '#1890ff' : (isLearned ? '#22c55e' : '#f5f5f5');
      var color = isCurrent ? '#fff' : (isLearned ? '#fff' : '#999');
      var mark = isLearned ? '✓' : d;
      dayButtons += '<button onclick="App.selectWordDay(' + d + ')" style="width:36px; height:36px; border:none; border-radius:8px; background:' + bg + '; color:' + color + '; font-size:14px; font-weight:bold; cursor:pointer;">' + mark + '</button>';
    }

    el.innerHTML =
      '<div class="module-header"><div class="module-progress">📝 单词训练</div></div>' +
      '<div style="padding:10px; background:#f0f7ff; border-radius:10px; margin-bottom:12px;">' +
        '<div style="font-size:13px; color:#666; margin-bottom:8px;">📅 选择天数（绿色=已学，蓝色=当前）：</div>' +
        '<div style="display:flex; flex-wrap:wrap; gap:5px;">' + dayButtons + '</div>' +
      '</div>' +
      '<div style="display:grid; gap:10px;">' +
        '<div style="padding:14px; border-radius:12px; background:#fff; border:2px solid #e8e8e8; cursor:pointer;" onclick="App.startWordMemorize()">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div><div style="font-size:15px; font-weight:bold;">📖 Day ' + day + ' 生词学习</div>' +
            '<div style="font-size:12px; color:#888; margin-top:3px;">10个新词 · 看词选意</div></div>' +
            '<div style="font-size:22px;">📖</div>' +
          '</div></div>' +
        '<div style="padding:14px; border-radius:12px; background:#fff3e0; border:2px solid #ffe0b2; cursor:pointer;" onclick="App.startWordExam()">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div><div style="font-size:15px; font-weight:bold;">✏️ Day ' + day + ' 词汇真题</div>' +
            '<div style="font-size:12px; color:#e65100; margin-top:3px;">KET真题格式 · 选词填空 + 填词</div></div>' +
            '<div style="font-size:22px;">✏️</div>' +
          '</div></div>' +
      '</div>' +
      '<div style="text-align:center; margin-top:15px;"><button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button></div>';
  },

  selectWordDay(d) {
    this.selectedWordDay = d;
    this.startWords();
  },

  startWordMemorize() {
    const day = this.selectedWordDay || Storage.getCurrentWordDay();
    // Day 1-15用第一批，Day 16-30用第二批
    var allWords = (typeof KET_WORDS_BATCH2 !== 'undefined') ? KET_WORDS.concat(KET_WORDS_BATCH2) : KET_WORDS;
    const dayWords = allWords.filter(w => w.day === day);
    const wordGlobalIndices = dayWords.map(w => allWords.indexOf(w) + 1);
    this.wordState = { index: 0, words: dayWords, globalIndices: wordGlobalIndices, mode: 'select', correct: 0, total: dayWords.length, startTime: Date.now() };
    this.renderWordQuestion();
  },

  startWordExam() {
    const day = this.selectedWordDay || Storage.getCurrentWordDay();
    // Day 1-15用第一批，Day 16-30用第二批
    var allQuestions = (typeof KET_WORD_QUESTIONS_BATCH2 !== 'undefined') ? KET_WORD_QUESTIONS.concat(KET_WORD_QUESTIONS_BATCH2) : KET_WORD_QUESTIONS;
    const dayQuestions = allQuestions.find(q => q.day === day);
    if (!dayQuestions) {
      const el = document.getElementById('view-words');
      el.innerHTML = '<div style="text-align:center; padding:40px;"><p>暂无Day ' + day + '的词汇真题</p><button class="btn-secondary" onclick="App.startWords()">← 返回</button></div>';
      return;
    }
    this.wordExamState = { day: day, questions: dayQuestions.questions, userAnswers: {}, correct: 0, total: dayQuestions.questions.length, startTime: Date.now() };
    this.renderWordExam();
  },

  renderWordExam() {
    const el = document.getElementById('view-words');
    if (!el) return;
    const { day, questions, userAnswers } = this.wordExamState;

    var html = '<div class="module-header"><div class="module-progress">✏️ Day ' + day + ' 词汇真题（一次性提交）</div></div>';
    html += '<div style="padding:8px 12px; background:#fff3e0; border-radius:8px; margin:8px 0; font-size:13px; color:#e65100;">选择/填写答案，完成后点「提交答案」</div>';
    html += '<div style="margin:15px 0;">';

    for (var qi = 0; qi < questions.length; qi++) {
      var question = questions[qi];
      html += '<div class="word-exam-block" data-qidx="' + qi + '" style="margin:12px 0; padding:12px; background:#fafafa; border-radius:10px; border:1px solid #eee;">';
      html += '<div style="font-size:15px; font-weight:bold; margin-bottom:8px;">Q' + (qi+1) + '. ';
      if (question.type === 'choose') {
        html += question.q.replace('____', '<span style="display:inline-block; border-bottom:2px solid #1890ff; min-width:60px; text-align:center;" id="blank-' + qi + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
        html += '</div>';
        html += '<div class="word-exam-options" data-qidx="' + qi + '">';
        for (var oi = 0; oi < question.options.length; oi++) {
          html += '<button class="word-exam-option" data-qidx="' + qi + '" data-oidx="' + oi + '" onclick="App.selectWordExam(' + qi + ',' + oi + ',\'' + question.options[oi].replace(/'/g, "\\'") + '\')" style="display:inline-block; padding:8px 14px; margin:4px; border:2px solid #e8e8e8; border-radius:8px; background:#fff; cursor:pointer; font-size:14px;">';
          html += String.fromCharCode(65 + oi) + '. ' + question.options[oi];
          html += '</button>';
        }
        html += '</div>';
      } else {
        // fill in the blank
        html += question.q + '</div>';
        html += '<input type="text" id="word-fill-' + qi + '" oninput="App.fillWordExam(' + qi + ', this.value)" placeholder="输入单词..." style="padding:8px 12px; border:2px solid #e8e8e8; border-radius:8px; font-size:15px; width:80%;">';
      }
      html += '</div>';
    }

    html += '</div>';
    html += '<div style="text-align:center; margin:15px 0;">';
    html += '<button class="btn-primary" id="submit-wordexam-btn" onclick="App.submitWordExam()" style="font-size:18px; padding:12px 50px;">📝 提交答案</button>';
    html += '</div>';
    html += '<div class="feedback" id="wordexam-feedback"></div>';
    html += '<div style="text-align:center; margin:10px 0;"><button class="btn-secondary" onclick="App.startWords()">← 返回</button></div>';

    el.innerHTML = html;
  },

  selectWordExam(qIdx, oIdx, wordText) {
    this.wordExamState.userAnswers[qIdx] = { type: 'choose', value: oIdx };
    // 更新空格显示
    var blank = document.getElementById('blank-' + qIdx);
    if (blank) blank.textContent = wordText;
    // 高亮选中
    var container = document.querySelector('.word-exam-options[data-qidx="' + qIdx + '"]');
    if (container) {
      container.querySelectorAll('.word-exam-option').forEach(function(btn) {
        btn.style.borderColor = '#e8e8e8';
        btn.style.background = '#fff';
      });
      var selected = container.querySelector('.word-exam-option[data-oidx="' + oIdx + '"]');
      if (selected) {
        selected.style.borderColor = '#1890ff';
        selected.style.background = '#e6f7ff';
      }
    }
  },

  fillWordExam(qIdx, value) {
    this.wordExamState.userAnswers[qIdx] = { type: 'fill', value: value.trim().toLowerCase() };
  },

  submitWordExam() {
    var state = this.wordExamState;
    var correct = 0;
    var html = '<div style="margin:10px 0;">';

    for (var qi = 0; qi < state.questions.length; qi++) {
      var q = state.questions[qi];
      var userAns = state.userAnswers[qi];
      var isCorrect = false;
      var userDisplay = '(未答)';

      if (q.type === 'choose') {
        if (userAns && userAns.value === q.answer) { isCorrect = true; correct++; }
        if (userAns) userDisplay = q.options[userAns.value];
      } else {
        if (userAns && userAns.value === q.answer.toLowerCase()) { isCorrect = true; correct++; }
        if (userAns) userDisplay = userAns.value;
      }

      Storage.recordAnswer(isCorrect, 'words', q.q || ('第' + (qi+1) + '题'), {
        question: q.q || '',
        userAnswer: userDisplay || '',
        correctAnswer: q.answer || ''
      });

      html += '<div style="padding:10px; margin:6px 0; border-radius:8px; background:' + (isCorrect ? '#f6ffed' : '#fff2f0') + '; border:1px solid ' + (isCorrect ? '#b7eb8f' : '#ffa39e') + '">';
      html += '<div>' + (isCorrect ? '✅' : '❌') + ' <b>Q' + (qi+1) + '</b>. ';
      if (q.type === 'choose') {
        html += q.q.replace('____', '<b style="color:#1890ff;">' + q.options[q.answer] + '</b>');
      } else {
        html += q.q.replace(/_+/g, '<b style="color:#1890ff;">' + q.answer + '</b>');
      }
      html += '<br><span style="font-size:13px; color:#666;">你的答案: ' + userDisplay;
      if (!isCorrect) html += ' | 正确: <b>' + (q.type === 'choose' ? q.options[q.answer] : q.answer) + '</b>';
      html += '</span></div></div>';
    }

    html += '</div>';
    html += '<div style="text-align:center; padding:15px; background:#f0f7ff; border-radius:12px; margin-top:10px;">';
    html += '<div style="font-size:22px; font-weight:bold; color:#1890ff;">' + correct + '/' + state.total + '</div>';
    html += '<div style="font-size:14px; margin-top:5px;">' + (correct === state.total ? '全对！太棒了！🎉' : correct >= Math.ceil(state.total/2) ? '不错！继续加油！🌟' : '要多练哦！💪') + '</div>';
    html += '<button class="btn-primary" onclick="App.startWords()" style="margin-top:10px;">🔄 返回单词训练</button>';
    html += '</div>';

    var submitBtn = document.getElementById('submit-wordexam-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    var fb = document.getElementById('wordexam-feedback');
    if (fb) fb.innerHTML = html;

    // 记录
    const timeSpent = Math.round((Date.now() - state.startTime) / 1000);
    const stars = correct >= 4 ? 3 : correct >= 3 ? 2 : 1;
    const examDay = this.selectedWordDay || Storage.getCurrentWordDay();
    Storage.recordSession('words', { stars, correct, total: state.total, timeSpent });
    // 记录已完成的天数（词汇真题）
    if (correct >= 3) {
      var wordCompletedDays = Storage.get('wordCompletedDays', {});
      wordCompletedDays[examDay] = true;
      Storage.set('wordCompletedDays', wordCompletedDays);
    }
    Storage.checkAchievements();
    this.updateHomeStats();
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
      var allWordsForOptions = (typeof KET_WORDS_BATCH2 !== 'undefined') ? KET_WORDS.concat(KET_WORDS_BATCH2) : KET_WORDS;
      const otherTranslations = allWordsForOptions
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
          <div class="word-english">
            ${word.word}
            <button class="btn-small" onclick="App.speak('${word.word}', 'assets/audio/words/word_${this.wordState.globalIndices[index]}.mp3')" style="margin-left:8px; font-size:16px; vertical-align:middle;">🔊</button>
          </div>
          <div class="word-pos">${word.pos}</div>
          <div class="word-example" style="background:#f9f9f9; padding:10px; border-radius:8px; margin:10px 0; font-size:14px; color:#555;">
            📝 ${word.example}
            <button class="btn-small" onclick="App.speak('${word.example.replace(/'/g, "\\'")}')" style="margin-left:5px;">🔊 听例句</button>
          </div>
          <div class="word-instruction">这个单词是什么意思？</div>
          <div class="word-options">
            ${options.map((opt, i) => `
              <button class="word-option" onclick="App.answerWord(${i}, ${options.indexOf(word.translation)})" data-value="${opt}">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  answerWord(selectedIdx, correctIdx) {
    const word = this.wordState.words[this.wordState.index];
    const correct = selectedIdx === correctIdx;
    
    // 记录答题结果但不告诉孩子对错
    Storage.recordAnswer(correct, 'words', word.word, {
      question: word.meaning || word.word,
      userAnswer: selectedIdx >= 0 ? ['A','B','C','D'][selectedIdx] : '',
      correctAnswer: ['A','B','C','D'][correctIdx]
    });
    Storage.updateWordStat(word.word, correct);
    this.wordState.answers = this.wordState.answers || [];
    this.wordState.answers.push({ word: word.word, selected: selectedIdx, correct: correct });
    if (correct) this.wordState.correct++;

    // 禁用选项，显示"已选择"状态
    document.querySelectorAll('.word-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === selectedIdx) btn.style.borderColor = '#1890ff';
    });

    // 只显示"下一题"，不显示对错
    const el = document.getElementById('view-words');
    const card = el.querySelector('.word-card');
    const oldFb = card.querySelector('.word-feedback');
    if (oldFb) oldFb.remove();

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'word-feedback';
    feedbackDiv.style.cssText = 'margin-top:15px; padding:15px; border-radius:12px; background:#f0f5ff; text-align:center;';
    feedbackDiv.innerHTML = `<button class="btn-primary" onclick="App.nextWord()" style="font-size:18px; padding:12px 40px;">下一题 →</button>`;
    card.appendChild(feedbackDiv);
  },

  nextWord() {
    this.wordState.index++;
    this.renderWordQuestion();
  },

  finishWords() {
    const timeSpent = Math.round((Date.now() - this.wordState.startTime) / 1000);
    const stars = this.wordState.correct >= 9 ? 3 : this.wordState.correct >= 7 ? 2 : 1;
    const completedDay = this.selectedWordDay || Storage.getCurrentWordDay();

    Storage.recordSession('words', {
      stars: stars,
      correct: this.wordState.correct,
      total: this.wordState.total,
      timeSpent: timeSpent
    });

    // 记录已完成的天数
    if (this.wordState.correct >= 7) {
      var wordCompletedDays = Storage.get('wordCompletedDays', {});
      wordCompletedDays[completedDay] = true;
      Storage.set('wordCompletedDays', wordCompletedDays);
      Storage.advanceWordDay();
    }

    const newAch = Storage.checkAchievements();
    const wrongCount = this.wordState.total - this.wordState.correct;
    const el = document.getElementById('view-words');
    el.innerHTML = `
      <div class="result-card">
        <div class="result-celebrate">${stars >= 3 ? '🎉' : stars >= 2 ? '🌟' : '👍'}</div>
        <h2>单词关卡完成！</h2>
        <div class="result-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="result-stats">
          <p>答题数：${this.wordState.total}</p>
          <p>用时：${this.wordState.timeSpent || timeSpent} 秒</p>
          ${wrongCount > 0 ? `<p style="color:#ff4d4f;">❌ 答错 ${wrongCount} 题，需要加油哦！</p>` : `<p style="color:#52c41a;">✅ 全部答对，太棒了！</p>`}
        </div>
        ${newAch.length > 0 ? this.renderNewAchievements(newAch) : ''}
        <div class="result-actions">
          <button class="btn-secondary" onclick="App.showWordAnswers()">📋 查看答案</button>
          ${wrongCount > 0 ? `<button class="btn-primary" onclick="App.retryWrongWords()">🔄 错题重做 (${wrongCount}题)</button>` : ''}
          <button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button>
        </div>
      </div>
    `;
    this.updateHomeStats();
  },

  // 查看单词答案
  showWordAnswers() {
    const el = document.getElementById('view-words');
    const answers = this.wordState.answers || [];
    const words = this.wordState.words;
    el.innerHTML = `
      <div class="module-header">
        <div class="module-progress">📋 答案详情</div>
      </div>
      ${words.map((w, i) => {
        const ans = answers[i];
        const isWrong = ans && !ans.correct;
        return `
          <div style="padding:12px; margin:8px 0; border-radius:10px; background:${isWrong ? '#fff1f0' : '#f6ffed'}; border:2px solid ${isWrong ? '#ffa39e' : '#b7eb8f'};">
            <div style="font-size:16px; font-weight:bold;">${isWrong ? '❌' : '✅'} ${w.word}</div>
            <div style="font-size:14px; color:#666;">中文：<b>${w.translation}</b></div>
            <div style="font-size:13px; color:#999; margin-top:4px;">📝 ${w.example}</div>
          </div>
        `;
      }).join('')}
      <div style="text-align:center; margin-top:15px;">
        <button class="btn-primary" onclick="App.startWords()">🔄 再练一组</button>
        <button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button>
      </div>
    `;
  },

  // 错题重做（单词）
  retryWrongWords() {
    const answers = this.wordState.answers || [];
    const wrongIndices = answers.map((a, i) => !a.correct ? i : -1).filter(i => i >= 0);
    const wrongWords = wrongIndices.map(i => this.wordState.words[i]);
    const wrongGlobalIndices = wrongIndices.map(i => this.wordState.globalIndices[i]);
    if (wrongWords.length === 0) return;
    this.wordState = { index: 0, words: wrongWords, globalIndices: wrongGlobalIndices, mode: 'select', correct: 0, total: wrongWords.length, startTime: Date.now(), answers: [] };
    this.renderWordQuestion();
  },

  selectedReadingDay: null,

  startReading() {
    const el = document.getElementById('view-reading');
    if (!el) return;
    const currentDay = Storage.getCurrentWordDay(); // 复用单词的天数
    if (!this.selectedReadingDay) this.selectedReadingDay = currentDay;
    const day = this.selectedReadingDay;

    // 生成天数选择按钮
    var dayButtons = '';
    for (var d = 1; d <= 30; d++) {
      var isCurrent = d === day;
      var isLearned = d < currentDay;
      var bg = isCurrent ? '#1890ff' : (isLearned ? '#e8f5e9' : '#f5f5f5');
      var color = isCurrent ? '#fff' : (isLearned ? '#2e7d32' : '#999');
      dayButtons += '<button onclick="App.selectReadingDay(' + d + ')" style="width:36px; height:36px; border:none; border-radius:8px; background:' + bg + '; color:' + color + '; font-size:14px; font-weight:bold; cursor:pointer;">' + d + '</button>';
    }

    var html = '<div class="module-header"><div class="module-progress">📖 阅读真题</div></div>';
    // 天数选择
    html += '<div style="padding:10px; background:#f0f7ff; border-radius:10px; margin-bottom:12px;">';
    html += '<div style="font-size:13px; color:#666; margin-bottom:8px;">📅 选择天数（每天5-7题，轻松完成）：</div>';
    html += '<div style="display:flex; flex-wrap:wrap; gap:5px;">' + dayButtons + '</div>';
    html += '</div>';

    // 当天任务
    var dayTask = this.getReadingDayTask(day);
    html += '<div style="padding:14px; border-radius:12px; background:#fff; border:2px solid #e8e8e8;">';
    html += '<div style="font-size:15px; font-weight:bold;">📖 Day ' + day + '：' + dayTask.title + '</div>';
    html += '<div style="font-size:13px; color:#888; margin-top:4px;">' + dayTask.desc + ' · ' + dayTask.qCount + '题 · 约5分钟</div>';
    html += '<button class="btn-primary" onclick="App.startReadingDay(' + day + ')" style="margin-top:10px; width:100%; font-size:16px; padding:12px;">开始做题 ▶️</button>';
    html += '</div>';

    // 也可以完整做一套
    html += '<div style="margin-top:15px; padding:10px; background:#fafafa; border-radius:10px;">';
    html += '<div style="font-size:13px; color:#888; margin-bottom:8px;">💪 想挑战更多？完整做一套：</div>';
    html += '<div style="display:grid; gap:8px;">';
    var allReadingList = (typeof KET_READING_BATCH2 !== 'undefined') ? KET_READING.concat(KET_READING_BATCH2) : KET_READING;
    for (var i = 0; i < allReadingList.length; i++) {
      var test = allReadingList[i];
      var qCount = test.parts.reduce(function(s, p) { return s + p.questions.length; }, 0);
      html += '<div style="padding:10px; border-radius:10px; background:#fff; border:1px solid #e0e0e0; cursor:pointer; font-size:14px;" onclick="App.startReadingTest(' + test.id + ')">📖 ' + test.title + ' · ' + qCount + '题</div>';
    }
    html += '</div></div>';

    html += '<div style="text-align:center; margin-top:12px;"><button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button></div>';
    el.innerHTML = html;
  },

  selectReadingDay(d) {
    this.selectedReadingDay = d;
    this.startReading();
  },

  // 把6套×3部分=18个Part分配到15天
  getReadingDayTask(day) {
    // 合并第一批和第二批阅读
    var allReading = (typeof KET_READING_BATCH2 !== 'undefined') ? KET_READING.concat(KET_READING_BATCH2) : KET_READING;
    var allParts = [];
    for (var i = 0; i < allReading.length; i++) {
      var test = allReading[i];
      for (var j = 0; j < test.parts.length; j++) {
        allParts.push({ testId: test.id, partIndex: j, part: test.parts[j], testTitle: test.title });
      }
    }
    // 36个Part分30天，每天1个Part
    var partIdx = (day - 1) % allParts.length;
    var item = allParts[partIdx];
    if (!item) { item = allParts[0]; }
    return {
      title: item.testTitle + ' · ' + item.part.name,
      desc: item.part.instruction,
      qCount: item.part.questions.length,
      testId: item.testId,
      partIndex: item.partIndex
    };
  },

  startReadingDay(day) {
    var task = this.getReadingDayTask(day);
    var allReading = (typeof KET_READING_BATCH2 !== 'undefined') ? KET_READING.concat(KET_READING_BATCH2) : KET_READING;
    var test = allReading.find(t => t.id === task.testId);
    if (!test) return;
    // 只取对应的Part
    var singlePart = test.parts[task.partIndex];
    this.readingState = {
      test: { title: 'Day ' + day + ' ' + test.title + ' · ' + singlePart.name, parts: [singlePart] },
      userAnswers: {},
      correct: 0,
      total: singlePart.questions.length,
      startTime: Date.now()
    };
    this.renderReadingAll();
  },

  startReadingTest(testId) {
    var allReadingFind = (typeof KET_READING_BATCH2 !== 'undefined') ? KET_READING.concat(KET_READING_BATCH2) : KET_READING;
    const test = allReadingFind.find(t => t.id === testId);
    if (!test) return;
    this.readingState = { test, userAnswers: {}, correct: 0, total: test.parts.reduce((s, p) => s + p.questions.length, 0), startTime: Date.now() };
    this.renderReadingAll();
  },

  renderReadingAll() {
    const el = document.getElementById('view-reading');
    if (!el) return;
    const { test, userAnswers } = this.readingState;

    var html = '<div class="module-header"><div class="module-progress">📖 ' + test.title + '</div></div>';

    for (var pi = 0; pi < test.parts.length; pi++) {
      var part = test.parts[pi];
      html += '<div style="margin:15px 0; padding:14px; background:#f0f7ff; border-radius:12px;">';
      html += '<div style="font-size:16px; font-weight:bold; color:#1890ff; margin-bottom:5px;">' + part.name + '</div>';
      html += '<div style="font-size:13px; color:#666; margin-bottom:10px;">' + part.instruction + '</div>';
      if (part.passage) {
        html += '<div style="padding:12px; background:#fff; border-radius:8px; margin-bottom:10px; font-size:14px; line-height:1.8; color:#333;">' + part.passage + '</div>';
      }

      for (var qi = 0; qi < part.questions.length; qi++) {
        var q = part.questions[qi];
        var globalIdx = pi * 100 + qi; // unique index across parts
        html += '<div style="margin:10px 0; padding:10px; background:#fafafa; border-radius:8px;">';
        if (q.text) {
          html += '<div style="font-size:13px; color:#555; padding:6px 10px; background:#fffde7; border-radius:6px; margin-bottom:8px;">📋 ' + q.text + '</div>';
        }
        html += '<div style="font-weight:bold; margin-bottom:8px;">Q' + (qi+1) + '. ' + q.q + '</div>';
        html += '<div class="reading-options" data-pidx="' + pi + '" data-qidx="' + qi + '">';
        for (var oi = 0; oi < q.options.length; oi++) {
          html += '<button class="reading-option" data-pidx="' + pi + '" data-qidx="' + qi + '" data-oidx="' + oi + '" onclick="App.selectReadingAnswer(' + pi + ',' + qi + ',' + oi + ')" style="display:block; width:100%; text-align:left; padding:10px 14px; margin:4px 0; border:2px solid #e8e8e8; border-radius:8px; background:#fff; cursor:pointer; font-size:14px;">';
          html += '<span style="display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background:#f0f0f0; border-radius:50%; margin-right:8px; font-weight:bold;">' + String.fromCharCode(65 + oi) + '</span>';
          html += q.options[oi];
          html += '</button>';
        }
        html += '</div></div>';
      }
      html += '</div>';
    }

    html += '<div style="text-align:center; margin:15px 0;">';
    html += '<button class="btn-primary" id="submit-reading-btn" onclick="App.submitReading()" style="font-size:18px; padding:12px 50px;">📝 提交答案</button>';
    html += '</div>';
    html += '<div class="feedback" id="reading-feedback"></div>';
    html += '<div style="text-align:center; margin:10px 0;"><button class="btn-secondary" onclick="App.startReading()">← 返回列表</button></div>';

    el.innerHTML = html;
  },

  selectReadingAnswer(pIdx, qIdx, oIdx) {
    var key = pIdx + '_' + qIdx;
    this.readingState.userAnswers[key] = oIdx;

    // Highlight selected
    var container = document.querySelector('.reading-options[data-pidx="' + pIdx + '"][data-qidx="' + qIdx + '"]');
    if (container) {
      container.querySelectorAll('.reading-option').forEach(function(btn) {
        btn.style.borderColor = '#e8e8e8';
        btn.style.background = '#fff';
      });
      var selected = container.querySelector('.reading-option[data-oidx="' + oIdx + '"]');
      if (selected) {
        selected.style.borderColor = '#1890ff';
        selected.style.background = '#e6f7ff';
      }
    }
  },

  submitReading() {
    var test = this.readingState.test;
    var userAnswers = this.readingState.userAnswers;
    var correct = 0;
    var total = 0;

    // Grade and mark
    for (var pi = 0; pi < test.parts.length; pi++) {
      var part = test.parts[pi];
      for (var qi = 0; qi < part.questions.length; qi++) {
        var key = pi + '_' + qi;
        var userAns = userAnswers[key];
        var correctAns = part.questions[qi].answer;
        var isCorrect = userAns === correctAns;
        if (isCorrect) correct++;
        total++;
        Storage.recordAnswer(isCorrect, 'reading', part.questions[qi].question || ('第' + (qi+1) + '题'), {
          question: part.questions[qi].question || '',
          userAnswer: userAns || '',
          correctAnswer: correctAns || ''
        });

        var container = document.querySelector('.reading-options[data-pidx="' + pi + '"][data-qidx="' + qi + '"]');
        if (container) {
          container.querySelectorAll('.reading-option').forEach(function(btn) {
            var oidx = parseInt(btn.getAttribute('data-oidx'));
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
            if (oidx === correctAns) {
              btn.style.borderColor = '#52c41a';
              btn.style.background = '#f6ffed';
              btn.innerHTML = btn.innerHTML + ' ✅';
            } else if (oidx === userAns) {
              btn.style.borderColor = '#ff4d4f';
              btn.style.background = '#fff2f0';
              btn.innerHTML = btn.innerHTML + ' ❌';
            } else {
              btn.style.opacity = '0.4';
            }
          });
        }
      }
    }

    this.readingState.correct = correct;

    var submitBtn = document.getElementById('submit-reading-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    var fb = document.getElementById('reading-feedback');
    if (fb) {
      fb.innerHTML =
        '<div style="text-align:center; padding:15px; background:#f0f7ff; border-radius:12px; margin-top:10px;">' +
          '<div style="font-size:22px; font-weight:bold; color:#1890ff;">' + correct + '/' + total + '</div>' +
          '<div style="font-size:15px; margin-top:5px;">' + (correct === total ? '全对！太棒了！🎉' : correct >= Math.ceil(total*0.6) ? '不错！继续加油！🌟' : '多读几遍！💪') + '</div>' +
          '<div style="margin-top:12px;">' +
            '<button class="btn-primary" onclick="App.startReading()" style="margin:5px;">🔄 换一套</button>' +
            '<button class="btn-secondary" onclick="App.showView(\'home\')" style="margin:5px;">🏠 返回首页</button>' +
          '</div>' +
        '</div>';
    }

    const timeSpent = Math.round((Date.now() - this.readingState.startTime) / 1000);
    const stars = correct >= total * 0.8 ? 3 : correct >= total * 0.5 ? 2 : 1;
    Storage.recordSession('reading', { stars, correct, total, timeSpent });
    Storage.checkAchievements();
    this.updateHomeStats();
  },

  // ============ LISTENING MODULE ============
  listeningState: { index: 0, qIndex: 0, correct: 0, total: 0, startTime: 0, answers: [] },

  startListening() {
    // Show list of available listening tests
    const el = document.getElementById('view-listening');
    if (!el) return;
    var html = '<div class="module-header"><div class="module-progress">👂 听力真题切片练习</div></div>';
    html += '<div style="padding:10px; background:#e3f2fd; border-radius:10px; margin-bottom:15px; font-size:13px; color:#1565c0;">';
    html += '💡 每个切片是一段真题音频，先听音频再答题。可反复听，建议至少听2遍。';
    html += '</div>';
    html += '<div style="display:grid; gap:10px;">';
    for (var i = 0; i < KET_LISTENING.length; i++) {
      var item = KET_LISTENING[i];
      html += '<div style="padding:14px; border-radius:12px; background:#fff; border:2px solid #e8e8e8; cursor:pointer;" onclick="App.startListeningItem(' + item.id + ')">';
      html += '<div style="display:flex; justify-content:space-between; align-items:center;">';
      html += '<div><div style="font-size:15px; font-weight:bold;">🎧 ' + item.title + '</div>';
      html += '<div style="font-size:12px; color:#888; margin-top:3px;">' + item.subtitle + ' · ' + item.questions.length + '题</div></div>';
      html += '<div style="font-size:22px;">▶️</div>';
      html += '</div></div>';
    }
    html += '</div>';
    html += '<div style="text-align:center; margin-top:15px;"><button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button></div>';
    el.innerHTML = html;
  },

  startListeningItem(itemId) {
    const item = KET_LISTENING.find(l => l.id === itemId);
    if (!item) return;
    this.listeningState = { item, correct: 0, total: item.questions.length, startTime: Date.now(), userAnswers: {} };
    this.renderListeningAllQuestions();
  },

  renderListeningAllQuestions() {
    const el = document.getElementById('view-listening');
    if (!el) return;
    const { item } = this.listeningState;

    var questionsHtml = '';
    for (var qi = 0; qi < item.questions.length; qi++) {
      var question = item.questions[qi];
      questionsHtml += '<div class="listening-question-block" data-qidx="' + qi + '" style="margin:15px 0; padding:12px; background:#fafafa; border-radius:10px; border:1px solid #eee;">';
      questionsHtml += '<div class="question-text" style="font-size:15px; font-weight:bold; margin-bottom:10px;">Q' + (qi+1) + '. ' + question.q + '</div>';
      questionsHtml += '<div class="listening-options" data-qidx="' + qi + '">';
      for (var oi = 0; oi < question.options.length; oi++) {
        questionsHtml += '<button class="listening-option" data-qidx="' + qi + '" data-oidx="' + oi + '" onclick="App.selectListenAnswer(' + qi + ',' + oi + ')" style="display:block; width:100%; text-align:left; padding:10px 14px; margin:5px 0; border:2px solid #e8e8e8; border-radius:8px; background:#fff; cursor:pointer; font-size:14px; transition:all 0.2s;">';
        questionsHtml += '<span class="option-letter" style="display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background:#f0f0f0; border-radius:50%; margin-right:8px; font-weight:bold;">' + String.fromCharCode(65 + oi) + '</span>';
        questionsHtml += question.options[oi];
        questionsHtml += '</button>';
      }
      questionsHtml += '</div></div>';
    }

    el.innerHTML =
      '<div class="module-header">' +
        '<div class="module-progress">' + item.title + '</div>' +
      '</div>' +
      '<div class="listening-card">' +
        '<h3>👂 ' + item.title + '</h3>' +
        '<p class="listening-subtitle">' + item.subtitle + '</p>' +
        '<div style="padding:8px 12px; background:#fff8e1; border-radius:8px; margin:8px 0; font-size:13px; color:#f57c00;">' +
          '🎧 播放音频，边听边答，全部选完后点「提交答案」' +
        '</div>' +
        '<audio id="listening-player-' + item.id + '" controls preload="auto" style="width:100%; margin:10px 0;">' +
          '<source src="' + (item.audio || 'assets/audio/listening_' + item.id + '.mp3') + '" type="audio/mpeg">' +
          '您的浏览器不支持音频播放' +
        '</audio>' +
        '<div class="listening-controls">' +
          '<button class="btn-play" onclick="App.playListening(' + item.id + ')">▶️ 播放听力</button>' +

          '<button class="btn-small" onclick="App.stopListening()">⏹️ 停止</button>' +
        '</div>' +
        '<div style="margin:15px 0;">' + questionsHtml + '</div>' +
        '<div style="text-align:center; margin:15px 0;">' +
          '<button class="btn-primary" id="submit-listening-btn" onclick="App.submitListening()" style="font-size:18px; padding:12px 50px; display:none;">📝 提交答案</button>' +
        '</div>' +
        '<div class="feedback" id="listening-feedback"></div>' +
        '<div class="audio-debug" id="audio-debug" style="color:#999; font-size:12px; margin:5px 0; min-height:18px;"></div>' +
        '<details class="transcript-details">' +
          '<summary>📝 查看听力原文</summary>' +
          '<div class="transcript-text">' + item.transcript + '</div>' +
        '</details>' +
      '</div>';
  },

  selectListenAnswer(qIdx, oIdx) {
    // 记录用户选择
    this.listeningState.userAnswers[qIdx] = oIdx;

    // 更新该题的选项高亮
    var container = document.querySelector('.listening-options[data-qidx="' + qIdx + '"]');
    if (container) {
      container.querySelectorAll('.listening-option').forEach(function(btn) {
        btn.style.borderColor = '#e8e8e8';
        btn.style.background = '#fff';
        var letter = btn.querySelector('.option-letter');
        if (letter) letter.style.background = '#f0f0f0';
      });
      var selected = container.querySelector('.listening-option[data-oidx="' + oIdx + '"]');
      if (selected) {
        selected.style.borderColor = '#1890ff';
        selected.style.background = '#e6f7ff';
        var letter = selected.querySelector('.option-letter');
        if (letter) letter.style.background = '#1890ff';
        if (letter) letter.style.color = '#fff';
      }
    }

    // 检查是否所有题目都答了
    var answered = Object.keys(this.listeningState.userAnswers).length;
    var submitBtn = document.getElementById('submit-listening-btn');
    if (submitBtn && answered >= this.listeningState.total) {
      submitBtn.style.display = 'inline-block';
      submitBtn.textContent = '📝 提交答案（' + answered + '/' + this.listeningState.total + '）';
    } else if (submitBtn) {
      submitBtn.style.display = 'inline-block';
      submitBtn.style.opacity = '0.5';
      submitBtn.textContent = '📝 已答 ' + answered + '/' + this.listeningState.total + '，继续答题';
    }
  },

  submitListening() {
    var item = this.listeningState.item;
    var userAnswers = this.listeningState.userAnswers;
    var correct = 0;

    // 判分并标记对错
    for (var qi = 0; qi < item.questions.length; qi++) {
      var userAns = userAnswers[qi];
      var correctAns = item.questions[qi].answer;
      var isCorrect = userAns === correctAns;
      if (isCorrect) correct++;

      var container = document.querySelector('.listening-options[data-qidx="' + qi + '"]');
      if (container) {
        container.querySelectorAll('.listening-option').forEach(function(btn) {
          var oidx = parseInt(btn.getAttribute('data-oidx'));
          btn.disabled = true;
          btn.style.pointerEvents = 'none';
          if (oidx === correctAns) {
            btn.style.borderColor = '#52c41a';
            btn.style.background = '#f6ffed';
            btn.innerHTML = btn.innerHTML + ' ✅';
          } else if (oidx === userAns) {
            btn.style.borderColor = '#ff4d4f';
            btn.style.background = '#fff2f0';
            btn.innerHTML = btn.innerHTML + ' ❌';
          } else {
            btn.style.opacity = '0.4';
          }
        });
      }
    }

    this.listeningState.correct = correct;

    // 记录答题
    for (var qi2 = 0; qi2 < item.questions.length; qi2++) {
      var lIsCorrect = userAnswers[qi2] === item.questions[qi2].answer;
      Storage.recordAnswer(lIsCorrect, 'listening', item.questions[qi2].question || ('第' + (qi2+1) + '题'), {
        question: item.questions[qi2].question || '',
        userAnswer: userAnswers[qi2] || '',
        correctAnswer: item.questions[qi2].answer || ''
      });
    }

    // 显示结果
    var submitBtn = document.getElementById('submit-listening-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    var fb = document.getElementById('listening-feedback');
    if (fb) {
      var rate = correct === item.questions.length ? '全对！太棒了！🎉' : correct >= Math.ceil(item.questions.length / 2) ? '不错！继续加油！🌟' : '要多听几遍哦！💪';
      fb.innerHTML =
        '<div style="text-align:center; padding:15px; background:#f0f7ff; border-radius:12px; margin-top:10px;">' +
          '<div style="font-size:22px; font-weight:bold; color:#1890ff;">' + correct + '/' + item.questions.length + '</div>' +
          '<div style="font-size:15px; margin-top:5px;">' + rate + '</div>' +
          '<div style="margin-top:12px;">' +
            '<button class="btn-primary" onclick="App.startListening()" style="margin:5px;">🔄 换一段</button>' +
            '<button class="btn-secondary" onclick="App.showView(\'home\')" style="margin:5px;">🏠 返回首页</button>' +
          '</div>' +
        '</div>';
    }

    // 记录session
    const timeSpent = Math.round((Date.now() - this.listeningState.startTime) / 1000);
    const stars = correct >= 3 ? 3 : correct >= 2 ? 2 : 1;
    Storage.recordSession('listening', { stars, correct, total: item.questions.length, timeSpent });
    Storage.checkAchievements();
    this.updateHomeStats();
  },

  playListening(itemId, slow) {
    // itemId是数字（从onclick传参不带引号）
    const item = KET_LISTENING.find(l => l.id === itemId);
    if (!item) {
      console.error('找不到听力项:', itemId);
      return;
    }

    const playBtns = document.querySelectorAll('.btn-play');
    playBtns.forEach(b => { b.textContent = '⏳ 加载中...'; b.disabled = true; });

    // 使用内嵌在卡片中的audio元素（跟测试页面一样）
    const audioEl = document.getElementById('listening-player-' + itemId);
    if (!audioEl) {
      this._showListenFallback(item, playBtns, 'Audio element missing');
      return;
    }

    // 清理
    try { audioEl.pause(); audioEl.currentTime = 0; } catch(e){}
    if (this.speechSynthesis) { try { this.speechSynthesis.cancel(); } catch(e){} }
    clearTimeout(this._audioTimeout);

    // 设置播放速度
    audioEl.playbackRate = slow ? 0.6 : 0.9;

    var self = this;
    audioEl.oncanplay = function() {
      self._updateDebugInfo('音频已加载，可以播放');
    };
    audioEl.onplaying = function() {
      playBtns.forEach(b => { b.textContent = '🔊 正在播放'; b.disabled = false; });
      self._updateDebugInfo('✅正在播放!');
    };
    audioEl.onended = function() {
      playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; });
      self._updateDebugInfo('播放结束');
    };
    audioEl.onerror = function(e) {
      console.error('音频加载失败:', e);
      self._updateDebugInfo('❌加载失败，尝试降级方案');
      self._tryFallbackAudio(itemId, slow, item, playBtns);
    };

    audioEl.play().then(function() {
      self._updateDebugInfo('▶️ play()成功！');
    }).catch(function(err) {
      console.error('MP3播放失败:', err);
      self._updateDebugInfo('❌play失败: ' + err.message + '，尝试降级');
      self._tryFallbackAudio(itemId, slow, item, playBtns);
    });

    this._currentAudioItemId = itemId;
  },

  _tryFallbackAudio(itemId, slow, item, playBtns) {
    this._updateDebugInfo('MP3播放失败，尝试base64...');

    // 尝试base64降级
    const audioKey = 'listening_' + itemId;
    const audioEl = document.getElementById('listening-player-' + itemId);

    if (audioEl && typeof AUDIO_BASE64 !== 'undefined' && AUDIO_BASE64[audioKey]) {
      audioEl.src = AUDIO_BASE64[audioKey];
      audioEl.playbackRate = slow ? 0.6 : 0.9;

      audioEl.play()
        .then(() => {
          playBtns.forEach(b => { b.textContent = '🔊 正在播放(base64)'; b.disabled = false; });
          this._updateDebugInfo('Base64播放成功!');
          audioEl.onended = () => {
            playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; });
          };
        })
        .catch(err => {
          console.error('Base64播放也失败:', err);
          this._updateDebugInfo('Base64播放失败，尝试语音合成...');
          this._trySpeechSynthesis(item, slow, playBtns);
        });
    } else {
      this._updateDebugInfo('没有base64数据，尝试语音合成...');
      this._trySpeechSynthesis(item, slow, playBtns);
    }
  },

  _trySpeechSynthesis(item, slow, playBtns) {
    if (this.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
      try {
        this.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(item.transcript);
        u.lang = 'en-US';
        u.rate = slow ? 0.6 : 0.9;
        u.onstart = () => {
          playBtns.forEach(b => { b.textContent = '🔊 正在播放(TTS)'; b.disabled = false; });
          this._updateDebugInfo('语音合成播放中...');
        };
        u.onend = () => {
          playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; });
          this._updateDebugInfo('语音合成播放结束');
        };
        u.onerror = (e) => {
          console.error('TTS错误:', e);
          this._showListenFallback(item, playBtns, 'TTS错误');
        };
        this.speechSynthesis.speak(u);
        return;
      } catch(e) {
        console.warn('SpeechSynthesis失败:', e);
        this._showListenFallback(item, playBtns, 'TTS异常: ' + e.message);
      }
    } else {
      this._showListenFallback(item, playBtns, '不支持语音合成');
    }
  },

  _showListenFallback(item, playBtns, reason) {
    playBtns.forEach(b => { b.textContent = '▶️ 播放听力'; b.disabled = false; });
    this._updateDebugInfo('降级到原文展示: ' + reason);
    const details = document.querySelector('#view-listening details');
    if (details) details.open = true;
    const feedback = document.getElementById('listening-feedback');
    if (feedback) {
      feedback.innerHTML = `<p style="color:#faad14; padding:10px; background:#fffbe6; border-radius:8px;">⚠️ 音频播放失败(${reason})，已展开原文。请大声朗读练习！</p>`;
    }
  },

  _updateDebugInfo(msg) {
    const debugEl = document.getElementById('audio-debug');
    if (debugEl) {
      const time = new Date().toLocaleTimeString();
      debugEl.innerHTML = `<small>[${time}] ${msg}</small>`;
    }
    console.log('[Audio Debug]', msg);
  },

  stopListening() {
    clearTimeout(this._audioTimeout);
    // 停止所有可能正在播放的audio元素
    document.querySelectorAll('audio[id^="listening-player-"]').forEach(audioEl => {
      try { audioEl.pause(); audioEl.currentTime = 0; } catch(e){}
    });
    if (this.speechSynthesis) {
      try { this.speechSynthesis.cancel(); } catch(e){}
    }
    document.querySelectorAll('.btn-play').forEach(b => {
      b.textContent = '▶️ 播放听力';
      b.disabled = false;
    });
    this._updateDebugInfo('已停止播放');
    this._currentAudioItemId = null;
  },

  speak(text, audioPath) {
    // 如果提供了预生成的音频路径，优先使用
    if (audioPath) {
      var a = new Audio(audioPath);
      a.playbackRate = 0.9;
      a.play().catch(function(){});
      return;
    }
    // 降级到Web Speech API
    if (this.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
      try {
        this.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = this.selectedSpeechRate;
        this.speechSynthesis.speak(u);
        return;
      } catch(e){}
    }
  },


  // ============ SPEAKING MODULE (口语训练) ============
  speakingState: { mode: null, qIndex: 0, topicIndex: 0, showModel: false },

  startExam() {
    this.showSpeakingHome();
  },

  showSpeakingHome() {
    const el = document.getElementById('view-exam');
    if (!el) return;
    el.innerHTML =
      '<div class="module-header"><div class="module-progress">🗣️ KET口语训练</div></div>' +
      '<div style="padding:10px; background:#f3e5f5; border-radius:10px; margin-bottom:15px; font-size:13px; color:#7b1fa2;">' +
      '💡 KET口语考试分两部分：Part 1 考官提问，Part 2 看图讨论。点击🔊听问题，大声说英语回答！</div>' +
      '<div style="display:grid; gap:12px;">' +
        '<div style="padding:16px; border-radius:14px; background:#fff; border:2px solid #e1bee7; cursor:pointer;" onclick="App.startSpeakingPart1()">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;"><div>' +
          '<div style="font-size:16px; font-weight:bold;">🗣️ Part 1 考官提问</div>' +
          '<div style="font-size:12px; color:#888; margin-top:4px;">个人信息·日常生活· 12个问题</div></div>' +
          '<div style="font-size:24px;">🗣️</div></div></div>' +
        '<div style="padding:16px; border-radius:14px; background:#fff; border:2px solid #e1bee7; cursor:pointer;" onclick="App.startSpeakingPart2()">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;"><div>' +
          '<div style="font-size:16px; font-weight:bold;">📷 Part 2 看图讨论</div>' +
          '<div style="font-size:12px; color:#888; margin-top:4px;">食物/爱好/地方等话题 · 6个主题</div></div>' +
          '<div style="font-size:24px;">📷</div></div></div>' +
        '<div style="padding:16px; border-radius:14px; background:#fff3e0; border:2px solid #ffe0b2; cursor:pointer;" onclick="App.showSpeakingPhrases()">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;"><div>' +
          '<div style="font-size:16px; font-weight:bold;">📝 口语常用句型</div>' +
          '<div style="font-size:12px; color:#e65100; margin-top:4px;">10个实用句型·背会加分</div></div>' +
          '<div style="font-size:24px;">📝</div></div></div>' +
      '</div>' +
      '<div style="text-align:center; margin-top:15px;"><button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button></div>';
  },

  startSpeakingPart1() {
    this.speakingState = { mode: 'part1', qIndex: 0, answers: [] };
    this.renderSpeakingQuestion();
  },

  renderSpeakingQuestion() {
    const el = document.getElementById('view-exam');
    if (!el) return;
    const { qIndex } = this.speakingState;
    const questions = KET_SPEAKING.part1.questions;
    if (qIndex >= questions.length) {
      this.finishSpeaking();
      return;
    }
    const q = questions[qIndex];
    el.innerHTML =
      '<div class="module-header"><div class="module-progress">🗣️ Part 1 · 第 ' + (qIndex+1) + ' / ' + questions.length + ' 题</div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + (qIndex/questions.length*100) + '%"></div></div></div>' +
      '<div style="padding:20px; background:#fff; border-radius:16px; margin:10px 0;">' +
        '<div style="font-size:13px; color:#e65100; padding:4px 10px; background:#fff3e0; border-radius:6px; display:inline-block; margin-bottom:10px;">' + q.category + '</div>' +
        '<div style="font-size:22px; font-weight:bold; color:#333; margin:15px 0;">' + q.q + '</div>' +
        '<div style="display:flex; gap:10px; margin:15px 0; flex-wrap:wrap;">' +
          '<button class="btn-primary" onclick="App.speak(\'' + q.q.replace(/'/g, "\\'") + '\')" style="font-size:18px; padding:12px 24px;">🔊 听问题</button>' +
          '<button class="btn-play" onclick="App.showSpeakingHint()" style="font-size:16px; padding:12px 20px;">💡 提示</button>' +
        '</div>' +
        '<div id="speaking-hint" style="display:none; padding:15px; background:#fff8e1; border-radius:10px; margin:10px 0;">' +
          '<div style="font-size:14px; color:#666; margin-bottom:5px;">💡 句型提示：</div>' +
          '<div style="font-size:16px; color:#e65100; font-weight:bold;">' + q.hint + '</div>' +
          '<div style="font-size:14px; color:#52c41a; margin-top:8px;">✅ 示范回答：' + q.model + '</div>' +
          '<button class="btn-small" onclick="App.speak(\'' + q.model.replace(/'/g, "\\'") + '\')" style="margin-top:8px;">🔊 听示范回答</button>' +
        '</div>' +
        '<div style="text-align:center; margin-top:20px;">' +
          '<button class="btn-primary" onclick="App.nextSpeaking()" style="font-size:18px; padding:14px 50px;">下一题 →</button>' +
        '</div>' +
        '<div style="text-align:center; margin-top:10px;"><button class="btn-secondary" onclick="App.showSpeakingHome()">← 返回口语首页</button></div>' +
      '</div>';
  },

  showSpeakingHint() {
    var hint = document.getElementById('speaking-hint');
    if (hint) hint.style.display = (hint.style.display === 'none') ? 'block' : 'none';
  },

  nextSpeaking() {
    this.speakingState.qIndex++;
    this.renderSpeakingQuestion();
  },

  finishSpeaking() {
    const el = document.getElementById('view-exam');
    const total = KET_SPEAKING.part1.questions.length;
    Storage.recordSession('speaking', { stars: 3, correct: total, total: total, timeSpent: 0 });
    Storage.checkAchievements();
    el.innerHTML =
      '<div class="result-card"><div class="result-celebrate">🎉</div>' +
      '<h2>口语练习完成！</h2>' +
      '<div style="padding:15px; background:#f3e5f5; border-radius:12px; margin:10px 0;">' +
      '<div style="font-size:16px; color:#7b1fa2; margin-bottom:8px;">👏 坚持练习，口语会越来越好！</div>' +
      '<div style="font-size:14px; color:#666;">完成了 ' + total + ' 个口语问题练习</div>' +
      '</div>' +
      '<div style="margin-top:15px;">' +
        '<button class="btn-primary" onclick="App.startSpeakingPart1()">🔄 再练一轮</button>' +
        '<button class="btn-secondary" onclick="App.showSpeakingHome()" style="margin-left:10px;">← 返回</button>' +
      '</div></div>';
    this.updateHomeStats();
  },

  startSpeakingPart2() {
    this.renderSpeakingPart2List();
  },

  renderSpeakingPart2List() {
    const el = document.getElementById('view-exam');
    const topics = KET_SPEAKING.part2.topics;
    var html = '<div class="module-header"><div class="module-progress">📷 Part 2 看图讨论</div></div>';
    html += '<div style="padding:10px; background:#e8f5e9; border-radius:10px; margin-bottom:15px; font-size:13px; color:#2e7d32;">💡 选择一个话题，看图片然后用英语描述你的喜好</div>';
    html += '<div style="display:grid; gap:10px;">';
    for (var i = 0; i < topics.length; i++) {
      html += '<div style="padding:14px; border-radius:12px; background:#fff; border:2px solid #c8e6c9; cursor:pointer;" onclick="App.startSpeakingTopic(' + i + ')">';
      html += '<div style="display:flex; justify-content:space-between; align-items:center;"><div>' +
        '<div style="font-size:15px; font-weight:bold;">' + topics[i].emoji + ' ' + topics[i].title + '</div>' +
        '<div style="font-size:12px; color:#888; margin-top:3px;">' + topics[i].items.length + ' 个选项 · 4 个问题</div></div>' +
        '<div style="font-size:22px;">👋</div></div></div>';
    }
    html += '</div><div style="text-align:center; margin-top:15px;"><button class="btn-secondary" onclick="App.showSpeakingHome()">← 返回口语首页</button></div>';
    el.innerHTML = html;
  },

  startSpeakingTopic(topicIdx) {
    this.speakingState = { mode: 'part2', topicIndex: topicIdx, qIndex: 0, showModel: false };
    this.renderSpeakingTopic();
  },

  renderSpeakingTopic() {
    const el = document.getElementById('view-exam');
    const topic = KET_SPEAKING.part2.topics[this.speakingState.topicIndex];
    const qi = this.speakingState.qIndex;
    var html = '<div class="module-header"><div class="module-progress">' + topic.emoji + ' ' + topic.title + ' · 第 ' + (qi+1) + ' / ' + topic.questions.length + ' 题</div></div>';
    html += '<div style="padding:16px; background:#fff; border-radius:14px;">';
    html += '<div style="font-size:13px; color:#666; margin-bottom:10px;">📷 看图选项：</div>';
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">';
    for (var i = 0; i < topic.items.length; i++) {
      html += '<div style="padding:8px 14px; background:#f5f5f5; border-radius:20px; font-size:14px;">' + topic.items[i] + '</div>';
    }
    html += '</div>';
    html += '<div style="font-size:18px; font-weight:bold; color:#333; margin:15px 0;">' + topic.questions[qi] + '</div>';
    html += '<div style="display:flex; gap:10px; margin:15px 0; flex-wrap:wrap;">';
    html += '<button class="btn-primary" onclick="App.speak(\'' + topic.questions[qi].replace(/'/g, "\\'") + '\')" style="font-size:16px; padding:10px 20px;">🔊 听问题</button>';
    html += '<button class="btn-play" onclick="App.toggleSpeakingModel()" style="font-size:16px; padding:10px 20px;">✅ 看示范答案</button>';
    html += '</div>';
    if (this.speakingState.showModel) {
      html += '<div style="padding:15px; background:#e8f5e9; border-radius:10px; margin:10px 0;">' +
        '<div style="font-size:14px; color:#2e7d32; margin-bottom:5px;">✅ 示范回答：</div>' +
        '<div style="font-size:15px; color:#333; line-height:1.8;">' + topic.modelAnswers[qi] + '</div>' +
        '<button class="btn-small" onclick="App.speak(\'' + topic.modelAnswers[qi].replace(/'/g, "\\'") + '\')" style="margin-top:8px;">🔊 听示范</button>' +
        '</div>';
    }
    html += '<div style="text-align:center; margin-top:15px;">';
    if (qi < topic.questions.length - 1) {
      html += '<button class="btn-primary" onclick="App.nextSpeakingTopic()" style="font-size:18px; padding:14px 50px;">下一题 →</button>';
    } else {
      html += '<button class="btn-primary" onclick="App.renderSpeakingPart2List()" style="font-size:18px; padding:14px 50px;">🔄 换个话题</button>';
    }
    html += ' <button class="btn-secondary" onclick="App.renderSpeakingPart2List()" style="margin-left:8px;">← 返回</button></div>';
    html += '</div>';
    el.innerHTML = html;
  },

  toggleSpeakingModel() {
    this.speakingState.showModel = !this.speakingState.showModel;
    this.renderSpeakingTopic();
  },

  nextSpeakingTopic() {
    this.speakingState.qIndex++;
    this.speakingState.showModel = false;
    this.renderSpeakingTopic();
  },

  showSpeakingPhrases() {
    const el = document.getElementById('view-exam');
    const phrases = KET_SPEAKING.usefulPhrases;
    var html = '<div class="module-header"><div class="module-progress">📝 口语常用句型</div></div>';
    html += '<div style="padding:10px; background:#fff3e0; border-radius:10px; margin-bottom:15px; font-size:13px; color:#e65100;">💡 背会这些句型，口语考试加分！点🔊听发音。</div>';
    for (var i = 0; i < phrases.length; i++) {
      var p = phrases[i];
      html += '<div style="padding:14px; margin:8px 0; border-radius:10px; background:#fff; border:1px solid #ffe0b2;">' +
        '<div style="font-size:16px; font-weight:bold; color:#e65100;">' + p.phrase + '</div>' +
        '<div style="font-size:13px; color:#888; margin:4px 0;">' + p.cn + '</div>' +
        '<div style="font-size:14px; color:#555; padding:8px; background:#fafafa; border-radius:6px; margin-top:5px;">' + p.example + '</div>' +
        '<button class="btn-small" onclick="App.speak(\'' + p.example.replace(/'/g, "\\'") + '\')" style="margin-top:6px;">🔊 读例句</button>' +
        '</div>';
    }
    html += '<div style="text-align:center; margin-top:15px;"><button class="btn-secondary" onclick="App.showSpeakingHome()">← 返回口语首页</button></div>';
    el.innerHTML = html;
  },


  showParentLogin() {
    const el = document.getElementById('view-parent');
    el.innerHTML = `
      <div class="parent-login">
        <div class="login-icon">🔒</div>
        <h2>家长面板</h2>
        <p>请输入密码查看学习数据</p>
        <input type="password" class="login-input" id="parent-password" placeholder="请输入密码" autocomplete="off" />
        <button class="btn-primary btn-big" onclick="App.checkParentPassword()">进入</button>
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
    const el = document.getElementById('view-parent');
    el.innerHTML = `
      <div class="parent-login">
        <div class="login-icon">⏳</div>
        <h2>正在加载所有学生数据...</h2>
      </div>
    `;
    this._loadAllStudents();
  },

  async _loadAllStudents() {
    const FIREBASE_URL = 'https://ket-study-default-rtdb.firebaseio.com';
    const students = [
      { id: 'student1', name: '👦 大宝' },
      { id: 'student2', name: '👧 二宝' }
    ];
    
    // 从Firebase直接拉每个学生的完整数据
    for (const s of students) {
      try {
        const resp = await fetch(FIREBASE_URL + '/students/' + s.id + '.json', { cache: 'no-store' });
        if (resp.ok) {
          const data = await resp.json();
          s.data = data || {};
        }
      } catch(e) { console.log('[KET] 加载' + s.id + '数据失败:', e.message); }
    }
    this._parentStudentsData = students; // 缓存供历史查看用
    this._renderParentPanelAll(students);
  },

  _renderParentPanelAll(students) {
    const el = document.getElementById('view-parent');
    let html = '<div class="parent-panel"><div class="parent-header"><h2>👨‍👩‍👦 家长监控面板</h2></div>';

    for (const s of students) {
      const d = s.data || {};
      const stats = d.stats || { totalStars: 0, totalCorrect: 0, totalQuestions: 0 };
      const streak = d.streak || { current: 0, longest: 0 };
      const sessions = d.sessions || [];
      const today = new Date().toISOString().split('T')[0];
      const todaySessions = sessions.filter(ss => ss.date === today);
      const todayStars = todaySessions.reduce((sum, ss) => sum + (ss.stars || 0), 0);
      const todayCorrect = todaySessions.reduce((sum, ss) => sum + (ss.correct || 0), 0);
      const todayTotal = todaySessions.reduce((sum, ss) => sum + (ss.total || 0), 0);
      const todayAcc = todayTotal > 0 ? Math.round(todayCorrect / todayTotal * 100) : 0;
      const overallAcc = stats.totalQuestions > 0 ? Math.round(stats.totalCorrect / stats.totalQuestions * 100) : 0;
      const wordStats = d.wordStats || {};
      const mastered = Object.values(wordStats).filter(w => w.correct >= 3).length;
      const mistakes = d.mistakes || [];

      html += `
        <div class="parent-section" style="border:2px solid #e0f2fe;border-radius:12px;padding:12px;margin:12px 0;">
          <h3>${s.name} 的学习数据</h3>
          <div class="parent-stats-grid">
            <div class="parent-stat">
              <div class="parent-stat-label">⭐ 总星星</div>
              <div class="parent-stat-value">${stats.totalStars || 0}</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">🎯 总正确率</div>
              <div class="parent-stat-value">${overallAcc}%</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">🔥 连续打卡</div>
              <div class="parent-stat-value">${streak.current || 0}天</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">📚 掌握单词</div>
              <div class="parent-stat-value">${mastered}/150</div>
            </div>
          </div>
          <div class="parent-stats-grid" style="margin-top:8px;">
            <div class="parent-stat">
              <div class="parent-stat-label">✅ 今日完成</div>
              <div class="parent-stat-value">${new Set(todaySessions.map(ss => ss.module)).size}模块</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">📊 今日正确率</div>
              <div class="parent-stat-value">${todayAcc}%</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">⭐ 今日星星</div>
              <div class="parent-stat-value">${todayStars}</div>
            </div>
            <div class="parent-stat">
              <div class="parent-stat-label">❌ 错题数</div>
              <div class="parent-stat-value">${mistakes.length}</div>
            </div>
          </div>
          ${todaySessions.length > 0 ? `
            <details style="margin-top:8px;">
              <summary style="cursor:pointer;color:#2563eb;">📋 今日答题详情</summary>
              ${todaySessions.map(ss => `
                <div style="padding:4px 0;border-bottom:1px solid #eee;font-size:14px;">
                  ${ss.module}: ${ss.correct || 0}/${ss.total || 0} 正确 (${ss.stars || 0}⭐)
                </div>
              `).join('')}
            </details>
          ` : '<p style="color:#999;font-size:14px;margin-top:8px;">今天还没学习</p>'}
          ${mistakes.length > 0 ? `
            <details style="margin-top:8px;">
              <summary style="cursor:pointer;color:#ef4444;">❌ 最近错题 (${mistakes.length})</summary>
              ${mistakes.slice(-10).reverse().map(m => `
                <div style="padding:2px 0;font-size:13px;color:#666;">
                  ${m.module}: ${m.word || ''} (${m.date})
                </div>
              `).join('')}
            </details>
          ` : ''}
          <button class="btn-primary" style="width:100%;margin-top:12px;" onclick="App.showHistoryView('${s.id}', '${s.name}')">📅 查看每日学习历史</button>
        </div>
      `;
    }
    html += '</div>';
    el.innerHTML = html;
  },

  _renderParentPanel() {
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
          <button class="btn-primary" style="width:100%;" onclick="App.showHistoryView()">📅 查看每日学习历史（按日查看对/错详情）</button>
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

  // 当前查看的历史日期
  _historyDate: null,

  confirmReset() {
    if (confirm('确定要重置所有学习数据吗？此操作不可撤销！')) {
      Storage.resetAll();
      this.showParentLogin();
    }
  },

  // ============ 每日学习历史 ============
  showHistoryView(studentId, studentName) {
    // 家长端：从已加载的学生数据中读取dailyLog
    // 支持多学生：如果指定了studentId就用对应的，否则默认用student1
    let dailyLog = {};
    let displayName = studentName || '';
    
    if (this._parentStudentsData) {
      // 从家长端缓存的学生数据中找
      const target = studentId 
        ? this._parentStudentsData.find(s => s.id === studentId)
        : this._parentStudentsData[0]; // 默认第一个（大宝）
      if (target && target.data) {
        dailyLog = target.data.dailyLog || {};
        displayName = displayName || target.name;
      }
    } else {
      // 学生端fallback：从本地Storage读
      dailyLog = Storage.get('dailyLog', {});
    }
    const dates = Object.keys(dailyLog).sort().reverse();
    
    const el = document.getElementById('view-parent');
    let datesHtml = '';
    if (dates.length === 0) {
      datesHtml = '<p style="color:#999;text-align:center;padding:20px;">暂无学习记录</p>';
    } else {
      datesHtml = dates.map(d => {
        const dayLog = dailyLog[d] || [];
        const correct = dayLog.filter(e => e.correct).length;
        const total = dayLog.length;
        const acc = total > 0 ? Math.round(correct / total * 100) : 0;
        const modules = [...new Set(dayLog.map(e => e.module))];
        const wrong = total - correct;
        const dateObj = new Date(d);
        const weekDay = ['日','一','二','三','四','五','六'][dateObj.getDay()];
        return `<div class="history-date-item" onclick="App.showHistoryDetail('${d}')" style="padding:12px;margin:8px 0;border-radius:10px;background:#fff;border:1px solid #eee;cursor:pointer;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span style="font-size:16px;font-weight:bold;">📅 ${d}</span>
              <span style="font-size:13px;color:#999;margin-left:8px;">周${weekDay}</span>
            </div>
            <div style="display:flex;gap:12px;font-size:14px;">
              <span style="color:#52c41a;">✅ ${correct}</span>
              ${wrong > 0 ? `<span style="color:#ff4d4f;">❌ ${wrong}</span>` : ''}
              <span style="color:#1890ff;">${acc}%</span>
            </div>
          </div>
          <div style="margin-top:6px;font-size:12px;color:#999;">${modules.join(' · ')} · 共${total}题</div>
        </div>`;
      }).join('');
    }
    
    el.innerHTML = `
      <div class="parent-panel">
        <div class="parent-header">
          <h2>📅 每日学习历史 - ${studentName || ''}</h2>
          <button class="btn-small" onclick="App.showParentLogin()">← 返回</button>
        </div>
        <p style="color:#666;font-size:14px;margin-bottom:12px;">点击任意日期查看当天每道题的详细对错记录</p>
        ${datesHtml}
      </div>
    `;
    el.scrollIntoView({ behavior: 'smooth' });
  },

  showHistoryDetail(dateStr) {
    // 家长端从缓存学生数据读取，学生端从Storage读取
    let dailyLog = {};
    if (this._parentStudentsData) {
      const target = this._parentStudentsData[0];
      dailyLog = (target && target.data && target.data.dailyLog) || {};
    } else {
      dailyLog = Storage.get('dailyLog', {});
    }
    const log = dailyLog[dateStr] || [];
    const dateObj = new Date(dateStr);
    const weekDay = ['日','一','二','三','四','五','六'][dateObj.getDay()];
    
    // 按模块分组
    const moduleGroups = {};
    log.forEach(e => {
      if (!moduleGroups[e.module]) moduleGroups[e.module] = [];
      moduleGroups[e.module].push(e);
    });
    
    const moduleNames = {
      'words': '📝 单词关卡',
      'reading': '📖 阅读理解',
      'listening': '👂 听力练习',
      'speaking': '🗣️ 口语训练',
      'authentic_listening': '🎧 真题听力'
    };
    
    let detailHtml = '';
    Object.keys(moduleGroups).forEach(mod => {
      const entries = moduleGroups[mod];
      const correct = entries.filter(e => e.correct).length;
      const wrong = entries.length - correct;
      detailHtml += `
        <div style="margin:12px 0;padding:12px;border-radius:10px;background:#f8fafc;border:1px solid #e8e8e8;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;color:#1890ff;">${moduleNames[mod] || mod}</h4>
            <span style="font-size:14px;">✅ ${correct} / ❌ ${wrong} (${entries.length}题)</span>
          </div>
          <div style="display:grid;gap:4px;">
            ${entries.map((e, i) => `
              <div style="padding:8px;border-radius:6px;background:${e.correct ? '#f6ffed' : '#fff2f0'};border:1px solid ${e.correct ? '#b7eb8f' : '#ffccc7'};font-size:13px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <span style="margin-right:6px;">${e.correct ? '✅' : '❌'}</span>
                    <span style="font-weight:bold;">${e.word || '第' + (i+1) + '题'}</span>
                  </div>
                  ${!e.correct && e.correctAnswer ? `<span style="color:#999;font-size:12px;">正确答案: ${e.correctAnswer}</span>` : ''}
                </div>
                ${e.question ? `<div style="color:#666;font-size:12px;margin-top:2px;">${e.question}</div>` : ''}
                ${!e.correct && e.userAnswer ? `<div style="color:#ff4d4f;font-size:12px;">你的答案: ${e.userAnswer}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    if (!detailHtml) detailHtml = '<p style="color:#999;text-align:center;padding:20px;">当天无学习记录</p>';
    
    const correct = log.filter(e => e.correct).length;
    const total = log.length;
    const acc = total > 0 ? Math.round(correct / total * 100) : 0;
    
    const el = document.getElementById('view-parent');
    el.innerHTML = `
      <div class="parent-panel">
        <div class="parent-header">
          <h2>📅 ${dateStr} (周${weekDay}) 详情</h2>
          <button class="btn-small" onclick="App.showHistoryView()">← 返回历史列表</button>
        </div>
        <div style="padding:12px;background:#e3f2fd;border-radius:10px;margin-bottom:12px;">
          <div style="display:flex;gap:20px;font-size:15px;">
            <span>📊 总共 <b>${total}</b> 题</span>
            <span style="color:#52c41a;">✅ 答对 <b>${correct}</b></span>
            <span style="color:#ff4d4f;">❌ 答错 <b>${total - correct}</b></span>
            <span style="color:#1890ff;">正确率 <b>${acc}%</b></span>
          </div>
        </div>
        ${detailHtml}
        <div style="text-align:center;margin-top:15px;">
          <button class="btn-secondary" onclick="App.showHistoryView()">← 返回历史列表</button>
        </div>
      </div>
    `;
    el.scrollIntoView({ behavior: 'smooth' });
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
  },

  // ============ AUTHENTIC LISTENING (真题听力) ============

  authListenState: { selectedId: null, startTime: 0 },

  showAuthenticListening() {
    const el = document.getElementById('view-authentic');
    if (!el) return;
    const completed = Storage.get('authenticCompleted', []);
    var self = this;

    el.innerHTML = '\
      <div class="module-header">\
        <div class="module-progress">🎧 KET真题听力 · 2024-2025原版音频</div>\
      </div>\
      <div style="padding:10px; background:#fff3e0; border-radius:10px; margin-bottom:15px; font-size:13px; color:#e65100;">\
        💡 这些是剑桥KET考试的原版听力音频，每套约20-25分钟。建议戴耳机在安静环境下练习，模拟真实考试体验。\
      </div>\
      ' + AUTHENTIC_LISTENING.map(function(test) {
        var isDone = completed.indexOf(test.id) >= 0;
        return '<div style="padding:15px; margin:10px 0; border-radius:14px; background:' + (isDone ? '#f0fff0' : '#fff') + '; border:2px solid ' + (isDone ? '#b7eb8f' : '#e8e8e8') + '; cursor:pointer;" onclick="App.startAuthListen(' + test.id + ')">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div>' +
              '<div style="font-size:16px; font-weight:bold;">🎧 ' + test.title + '</div>' +
              '<div style="font-size:13px; color:#999; margin-top:4px;">⏱️ ' + test.duration + ' · ' + test.year + '年真题</div>' +
            '</div>' +
            '<div style="font-size:24px;">' + (isDone ? '✅' : '▶️') + '</div>' +
          '</div>' +
        '</div>';
      }).join('') + '\
      <div style="text-align:center; margin-top:15px;">\
        <button class="btn-secondary" onclick="App.showView(\'home\')">🏠 返回首页</button>\
      </div>';
  },

  startAuthListen(testId) {
    const test = AUTHENTIC_LISTENING.find(function(t) { return t.id === testId; });
    if (!test) return;

    this.authListenState = { selectedId: testId, startTime: Date.now() };
    const el = document.getElementById('view-authentic');
    var self = this;

    el.innerHTML = '\
      <div class="module-header">\
        <div class="module-progress">🎧 ' + test.title + '</div>\
        <div style="font-size:13px; color:#999; margin-top:4px;">' + test.year + '年真题 · ' + test.duration + '</div>\
      </div>\
      <div style="padding:15px; background:#fafafa; border-radius:14px; margin-bottom:15px;">\
        <audio id="auth-audio" controls preload="auto" style="width:100%;" src="' + test.audio + '">您的浏览器不支持音频播放</audio>\
      </div>\
      <div style="display:grid; gap:8px;">' +
        test.parts.map(function(p) {
          return '<div style="padding:12px; border-radius:10px; background:#f8fafc; border:1px solid #e8e8e8;">' +
            '<div style="font-weight:bold; font-size:15px; color:#1890ff;">' + p.name + '</div>' +
            '<div style="font-size:13px; color:#666; margin-top:3px;">' + p.desc + '</div>' +
          '</div>';
        }).join('') +
      '</div>\
      <div style="margin-top:15px; padding:15px; background:#e3f2fd; border-radius:10px;">\
        <div style="font-weight:bold; margin-bottom:8px;">📝 练习建议：</div>\
        <ul style="font-size:13px; color:#555; padding-left:20px; margin:0;">\
          <li>第一遍：不看字幕，认真听</li>\
          <li>第二遍：对照英文原文听</li>\
          <li>第三遍：跟读模仿发音</li>\
        </ul>\
      </div>' +
      (test.subtitle ? '<details style="margin-top:10px;"><summary style="cursor:pointer; padding:10px; background:#f0f0f0; border-radius:8px; font-size:14px;">📄 点击查看听力原文</summary><div id="subtitle-display" style="padding:15px; background:#fafafa; border-radius:0 0 8px 8px; font-size:14px; line-height:1.8; color:#555; max-height:300px; overflow-y:auto;"><button class="btn-small" onclick="App.loadSubtitle(\'' + test.subtitle + '\')">加载听力原文...</button></div></details>' : '') +
      '<div style="text-align:center; margin-top:15px;">' +
        '<button class="btn-primary" onclick="App.completeAuthListen(' + test.id + ')">✅ 标记为已完成</button> ' +
        '<button class="btn-secondary" onclick="App.showAuthenticListening()">← 返回列表</button>' +
      '</div>';
  },

  loadSubtitle(srtPath) {
    fetch(srtPath)
      .then(function(res) { return res.text(); })
      .then(function(text) {
        var display = document.getElementById('subtitle-display');
        if (!display) return;
        var lines = text.split('\n');
        var html = '';
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (/^\d+$/.test(line)) continue;
          if (/\d{2}:\d{2}:/.test(line)) continue;
          if (line.length > 0) {
            html += line + ' ';
            if (line.match(/[.!?]$/)) html += '<br><br>';
          }
        }
        display.innerHTML = html || '原文加载失败';
      })
      .catch(function() {
        var display = document.getElementById('subtitle-display');
        if (display) display.innerHTML = '<p style="color:#ff4d4f;">原文加载失败</p>';
      });
  },

  completeAuthListen(testId) {
    const completed = Storage.get('authenticCompleted', []);
    if (completed.indexOf(testId) < 0) {
      completed.push(testId);
      Storage.set('authenticCompleted', completed);
    }
    const timeSpent = Math.round((Date.now() - this.authListenState.startTime) / 1000);
    Storage.recordSession('authentic_listening', {
      stars: 3, correct: 1, total: 1, timeSpent: timeSpent, testId: testId
    });
    this.updateHomeStats();
    this.showAuthenticListening();
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
}
