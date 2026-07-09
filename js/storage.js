// Storage Module - Firebase云端数据库，全球同步
const FIREBASE_URL = 'https://ket-study-default-rtdb.firebaseio.com';

const Storage = {
  KEY_PREFIX: 'ket_study_',
  _studentId: null,
  _studentName: '',
  _cache: {}, // 本地内存缓存

  // ===== 学生登录 =====
  setStudent(id, name) {
    this._studentId = id;
    this._studentName = name || id;
    try { localStorage.setItem(this.KEY_PREFIX + 'current_student', id); } catch(e) {}
  },

  getStudentId() {
    if (this._studentId) return this._studentId;
    try {
      return localStorage.getItem(this.KEY_PREFIX + 'current_student') || null;
    } catch(e) { return null; }
  },

  // ===== Firebase 读写 =====
  _path(key) {
    const sid = this.getStudentId() || 'default';
    return `${FIREBASE_URL}/students/${sid}/${key}.json`;
  },

  _studentPath() {
    const sid = this.getStudentId() || 'default';
    return `${FIREBASE_URL}/students/${sid}.json`;
  },

  // 从Firebase读取一个key
  get(key, defaultValue = null) {
    // 先用内存缓存
    if (this._cache[key] !== undefined) return this._cache[key];
    return defaultValue;
  },

  // 写入Firebase（异步）
  async set(key, value) {
    // 更新缓存
    this._cache[key] = value;
    // 异步写入Firebase
    try {
      await fetch(this._path(key), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      console.log('[KET] 已保存:', key);
    } catch(e) {
      console.log('[KET] 保存失败:', key, e.message);
    }
  },

  // 同步写入（用于需要立即完成的场景）
  setSync(key, value) {
    this._cache[key] = value;
    fetch(this._path(key), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    }).catch(() => {});
  },

  // 从Firebase加载全部数据到缓存
  async fetchFromServer() {
    try {
      const resp = await fetch(this._studentPath(), { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data) {
          this._cache = data;
          console.log('[KET] 从Firebase加载数据成功');
          return true;
        }
      }
    } catch(e) {
      console.log('[KET] Firebase连接失败:', e.message);
    }
    return false;
  },

  getAll() {
    return this._cache;
  },

  remove(key) {
    delete this._cache[key];
    fetch(this._path(key), { method: 'DELETE' }).catch(() => {});
  },

  // ===== 学习记录方法 =====
  recordSession(module, data) {
    const today = new Date().toISOString().split('T')[0];
    const sessions = this.get('sessions', []);
    sessions.push({ date: today, module, timestamp: Date.now(), ...data });
    this.set('sessions', sessions);
    this.updateStreak(today);
    this.addStars(data.stars || 0);
  },

  updateStreak(dateStr) {
    const streak = this.get('streak', { current: 0, lastDate: null, longest: 0 });
    if (streak.lastDate === dateStr) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastDate === yesterday) streak.current += 1;
    else streak.current = 1;
    streak.longest = Math.max(streak.longest, streak.current);
    streak.lastDate = dateStr;
    this.set('streak', streak);
  },

  addStars(count) {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    stats.totalStars += count;
    this.set('stats', stats);
    this.checkAchievements();
  },

  recordAnswer(correct, module, word = null, detail = null) {
    const today = new Date().toISOString().split('T')[0];
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    stats.totalQuestions += 1;
    if (correct) stats.totalCorrect += 1;
    this.set('stats', stats);

    // 保存每道题的详细记录（用于家长端按日查看）
    const dailyLog = this.get('dailyLog', {});
    if (!dailyLog[today]) dailyLog[today] = [];
    const entry = {
      module,
      word: word || '',
      correct: !!correct,
      timestamp: Date.now()
    };
    if (detail) {
      entry.question = detail.question || '';
      entry.userAnswer = detail.userAnswer || '';
      entry.correctAnswer = detail.correctAnswer || '';
    }
    dailyLog[today].push(entry);
    // 保留最近90天
    const dates = Object.keys(dailyLog).sort();
    while (dates.length > 90) {
      delete dailyLog[dates.shift()];
    }
    this.set('dailyLog', dailyLog);

    if (!correct) {
      const mistakes = this.get('mistakes', []);
      mistakes.push({ module, word, date: today, timestamp: Date.now() });
      if (mistakes.length > 200) mistakes.shift();
      this.set('mistakes', mistakes);
    }
  },

  // 按日期获取每道题的详细记录
  getDailyLog(dateStr) {
    const dailyLog = this.get('dailyLog', {});
    return dailyLog[dateStr] || [];
  },

  // 获取所有有学习记录的日期列表
  getStudyDates() {
    const dailyLog = this.get('dailyLog', {});
    return Object.keys(dailyLog).sort().reverse();
  },

  // 获取某天的学习汇总
  getDailySummary(dateStr) {
    const log = this.getDailyLog(dateStr);
    if (!log.length) return null;
    const modules = {};
    let correct = 0, total = 0;
    log.forEach(e => {
      if (!modules[e.module]) modules[e.module] = { correct: 0, total: 0 };
      modules[e.module].total++;
      if (e.correct) { modules[e.module].correct++; correct++; }
      total++;
    });
    return { date: dateStr, correct, total, accuracy: total > 0 ? Math.round(correct / total * 100) : 0, modules, details: log };
  },

  getTodayData() {
    const today = new Date().toISOString().split('T')[0];
    return (this.get('sessions', [])).filter(s => s.date === today);
  },

  getLast7Days() {
    const sessions = this.get('sessions', []);
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const ds = sessions.filter(s => s.date === dateStr);
      const stars = ds.reduce((s, x) => s + (x.stars || 0), 0);
      const correct = ds.reduce((s, x) => s + (x.correct || 0), 0);
      const total = ds.reduce((s, x) => s + (x.total || 0), 0);
      result.push({
        date: dateStr,
        dayName: ['日','一','二','三','四','五','六'][d.getDay()],
        checked: ds.length > 0, modules: ds.length,
        stars, correct, total,
        accuracy: total > 0 ? Math.round(correct/total*100) : 0,
        timeSpent: ds.reduce((s,x) => s + (x.timeSpent||0), 0)
      });
    }
    return result.reverse();
  },

  getWordProgress() {
    const ws = this.get('wordStats', {});
    const total = typeof KET_WORDS !== 'undefined' ? KET_WORDS.length : 150;
    const learned = Object.keys(ws).length;
    const mastered = Object.values(ws).filter(s => s.correct >= 3).length;
    return { total, learned, mastered };
  },

  updateWordStat(word, correct) {
    const ws = this.get('wordStats', {});
    if (!ws[word]) ws[word] = { correct: 0, wrong: 0, total: 0 };
    ws[word].total += 1;
    if (correct) ws[word].correct += 1;
    else ws[word].wrong += 1;
    this.set('wordStats', ws);
  },

  getMistakes() { return this.get('mistakes', []); },
  getStreak() { return this.get('streak', { current: 0, lastDate: null, longest: 0 }); },
  getStats() { return this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 }); },
  getAchievements() { return this.get('achievements', []); },

  checkAchievements() {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    const streak = this.get('streak', { current: 0, longest: 0 });
    const wp = this.getWordProgress();
    const ach = this.get('achievements', []);
    const unlocked = new Set(ach.map(a => a.id));
    const all = [
      { id:'first_star', name:'⭐ 初露锋芒', desc:'获得第一颗星星', c:()=>stats.totalStars>=1 },
      { id:'ten_stars', name:'🌟 小有成就', desc:'获得10颗星星', c:()=>stats.totalStars>=10 },
      { id:'fifty_stars', name:'💫 星光闪耀', desc:'获得50颗星星', c:()=>stats.totalStars>=50 },
      { id:'hundred_stars', name:'✨ 百星之王', desc:'获得100颗星星', c:()=>stats.totalStars>=100 },
      { id:'streak_3', name:'🔥 三连打卡', desc:'连续学习3天', c:()=>streak.longest>=3 },
      { id:'streak_7', name:'📅 坚持一周', desc:'连续学习7天', c:()=>streak.longest>=7 },
      { id:'streak_30', name:'🏆 月度冠军', desc:'连续学习30天', c:()=>streak.longest>=30 },
      { id:'words_50', name:'📚 词汇达人', desc:'掌握50个单词', c:()=>wp.mastered>=50 },
      { id:'words_100', name:'📖 词汇大师', desc:'掌握100个单词', c:()=>wp.mastered>=100 },
      { id:'words_150', name:'🎓 词汇博士', desc:'掌握全部150个单词', c:()=>wp.mastered>=150 },
      { id:'accuracy_80', name:'🎯 精准射手', desc:'正确率达到80%', c:()=>stats.totalQuestions>=20&&(stats.totalCorrect/stats.totalQuestions)>=0.8 },
      { id:'accuracy_90', name:'🎖️ 神枪手', desc:'正确率达到90%', c:()=>stats.totalQuestions>=50&&(stats.totalCorrect/stats.totalQuestions)>=0.9 },
    ];
    const newAch = [];
    all.forEach(a => {
      if (!unlocked.has(a.id) && a.c()) {
        newAch.push(a);
        ach.push({ id:a.id, name:a.name, desc:a.desc, date:new Date().toISOString() });
      }
    });
    if (newAch.length > 0) this.set('achievements', ach);
    return newAch;
  },

  exportData() {
    return { ...this._cache, _exportDate: new Date().toISOString(), _appVersion: '4.0' };
  },

  getCurrentWordDay() { return this.get('currentWordDay', 1); },
  advanceWordDay() {
    let day = this.get('currentWordDay', 1);
    day = (day % 15) + 1;
    this.set('currentWordDay', day);
    return day;
  },

  resetAll() {
    this._cache = {};
    fetch(this._studentPath(), { method: 'DELETE' }).catch(() => {});
  }
};

if (typeof window !== 'undefined') window.Storage = Storage;
