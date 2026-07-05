// Storage Module - 服务器为主，按学生ID分别存储
const API_BASE = 'https://new-steaks-beam.loca.lt';

const Storage = {
  KEY_PREFIX: 'ket_study_',
  _syncTimer: null,
  _studentId: null,    // 当前学生ID
  _studentName: '',    // 当前学生名字

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

  // ===== localStorage 读写（带学生ID前缀）=====
  _key(key) {
    const sid = this.getStudentId() || 'default';
    return this.KEY_PREFIX + sid + '_' + key;
  },

  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this._key(key));
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this._key(key), JSON.stringify(value));
    } catch (e) {}
    this.syncToServer();
  },

  remove(key) {
    localStorage.removeItem(this._key(key));
    this.syncToServer();
  },

  getAll() {
    const sid = this.getStudentId() || 'default';
    const prefix = this.KEY_PREFIX + sid + '_';
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const fullKey = localStorage.key(i);
      if (fullKey && fullKey.startsWith(prefix)) {
        const cleanKey = fullKey.replace(prefix, '');
        try {
          result[cleanKey] = JSON.parse(localStorage.getItem(fullKey));
        } catch(e) {}
      }
    }
    return result;
  },

  // ===== 服务器同步 =====
  syncToServer() {
    if (this._syncTimer) clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => {
      const sid = this.getStudentId() || 'default';
      const data = this.getAll();
      // 加上学生名字信息
      data['_name'] = this._studentName || sid;
      fetch(API_BASE + '/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: sid, data: data })
      }).then(() => {
        console.log('[KET] 已同步到服务器');
      }).catch(() => {
        console.log('[KET] 同步失败，下次自动重试');
      });
    }, 1500);
  },

  async fetchFromServer() {
    try {
      const sid = this.getStudentId() || 'default';
      const resp = await fetch(API_BASE + '/api/data?studentId=' + encodeURIComponent(sid), { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data && Object.keys(data).length > 0) {
          for (const key in data) {
            if (key.startsWith('_')) continue;
            try {
              localStorage.setItem(this._key(key), JSON.stringify(data[key]));
            } catch(e) {}
          }
          console.log('[KET] 从服务器恢复数据成功');
          return true;
        }
      }
    } catch (e) {
      console.log('[KET] 服务器连接失败，使用本地:', e.message);
    }
    return false;
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
    if (streak.lastDate === yesterday) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }
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

  recordAnswer(correct, module, word = null) {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    stats.totalQuestions += 1;
    if (correct) stats.totalCorrect += 1;
    this.set('stats', stats);
    if (!correct) {
      const mistakes = this.get('mistakes', []);
      mistakes.push({ module, word, date: new Date().toISOString().split('T')[0], timestamp: Date.now() });
      if (mistakes.length > 200) mistakes.shift();
      this.set('mistakes', mistakes);
    }
  },

  getTodayData() {
    const today = new Date().toISOString().split('T')[0];
    return this.get('sessions', []).filter(s => s.date === today);
  },

  getLast7Days() {
    const sessions = this.get('sessions', []);
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const daySessions = sessions.filter(s => s.date === dateStr);
      const stars = daySessions.reduce((sum, s) => sum + (s.stars || 0), 0);
      const correct = daySessions.reduce((sum, s) => sum + (s.correct || 0), 0);
      const total = daySessions.reduce((sum, s) => sum + (s.total || 0), 0);
      result.push({
        date: dateStr,
        dayName: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
        checked: daySessions.length > 0,
        modules: daySessions.length,
        stars, correct, total,
        accuracy: total > 0 ? Math.round(correct / total * 100) : 0,
        timeSpent: daySessions.reduce((sum, s) => sum + (s.timeSpent || 0), 0)
      });
    }
    return result.reverse();
  },

  getWordProgress() {
    const wordStats = this.get('wordStats', {});
    const totalWords = typeof KET_WORDS !== 'undefined' ? KET_WORDS.length : 150;
    const learned = Object.keys(wordStats).length;
    const mastered = Object.values(wordStats).filter(s => s.correct >= 3).length;
    return { total: totalWords, learned, mastered };
  },

  updateWordStat(word, correct) {
    const wordStats = this.get('wordStats', {});
    if (!wordStats[word]) wordStats[word] = { correct: 0, wrong: 0, total: 0 };
    wordStats[word].total += 1;
    if (correct) { wordStats[word].correct += 1; }
    else { wordStats[word].wrong += 1; }
    this.set('wordStats', wordStats);
  },

  getMistakes() { return this.get('mistakes', []); },
  getStreak() { return this.get('streak', { current: 0, lastDate: null, longest: 0 }); },
  getStats() { return this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 }); },
  getAchievements() { return this.get('achievements', []); },

  checkAchievements() {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    const streak = this.get('streak', { current: 0, longest: 0 });
    const wordProgress = this.getWordProgress();
    const achievements = this.get('achievements', []);
    const unlocked = new Set(achievements.map(a => a.id));

    const allAchievements = [
      { id: 'first_star', name: '⭐ 初露锋芒', desc: '获得第一颗星星', condition: () => stats.totalStars >= 1 },
      { id: 'ten_stars', name: '🌟 小有成就', desc: '获得10颗星星', condition: () => stats.totalStars >= 10 },
      { id: 'fifty_stars', name: '💫 星光闪耀', desc: '获得50颗星星', condition: () => stats.totalStars >= 50 },
      { id: 'hundred_stars', name: '✨ 百星之王', desc: '获得100颗星星', condition: () => stats.totalStars >= 100 },
      { id: 'streak_3', name: '🔥 三连打卡', desc: '连续学习3天', condition: () => streak.longest >= 3 },
      { id: 'streak_7', name: '📅 坚持一周', desc: '连续学习7天', condition: () => streak.longest >= 7 },
      { id: 'streak_30', name: '🏆 月度冠军', desc: '连续学习30天', condition: () => streak.longest >= 30 },
      { id: 'words_50', name: '📚 词汇达人', desc: '掌握50个单词', condition: () => wordProgress.mastered >= 50 },
      { id: 'words_100', name: '📖 词汇大师', desc: '掌握100个单词', condition: () => wordProgress.mastered >= 100 },
      { id: 'words_150', name: '🎓 词汇博士', desc: '掌握全部150个单词', condition: () => wordProgress.mastered >= 150 },
      { id: 'accuracy_80', name: '🎯 精准射手', desc: '正确率达到80%', condition: () => stats.totalQuestions >= 20 && (stats.totalCorrect / stats.totalQuestions) >= 0.8 },
      { id: 'accuracy_90', name: '🎖️ 神枪手', desc: '正确率达到90%', condition: () => stats.totalQuestions >= 50 && (stats.totalCorrect / stats.totalQuestions) >= 0.9 },
    ];

    const newAchievements = [];
    allAchievements.forEach(a => {
      if (!unlocked.has(a.id) && a.condition()) {
        newAchievements.push(a);
        achievements.push({ id: a.id, name: a.name, desc: a.desc, date: new Date().toISOString() });
      }
    });
    if (newAchievements.length > 0) this.set('achievements', achievements);
    return newAchievements;
  },

  exportData() {
    const data = this.getAll();
    data._exportDate = new Date().toISOString();
    data._appVersion = '3.0';
    return data;
  },

  getCurrentWordDay() { return this.get('currentWordDay', 1); },

  advanceWordDay() {
    let day = this.get('currentWordDay', 1);
    day = (day % 15) + 1;
    this.set('currentWordDay', day);
    return day;
  },

  resetAll() {
    const prefix = this.KEY_PREFIX + (this.getStudentId() || 'default') + '_';
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
    this.syncToServer();
  }
};

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
