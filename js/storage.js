// Storage Module - localStorage based data persistence
const Storage = {
  KEY_PREFIX: 'ket_study_',

  // Get data from localStorage
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this.KEY_PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  // Save data to localStorage
  set(key, value) {
    try {
      localStorage.setItem(this.KEY_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  // Remove data
  remove(key) {
    localStorage.removeItem(this.KEY_PREFIX + key);
  },

  // Get all data
  getAll() {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.KEY_PREFIX)) {
        const cleanKey = key.replace(this.KEY_PREFIX, '');
        result[cleanKey] = this.get(cleanKey);
      }
    }
    return result;
  },

  // Record a study session
  recordSession(module, data) {
    const today = new Date().toISOString().split('T')[0];
    const sessions = this.get('sessions', []);
    sessions.push({
      date: today,
      module: module,
      timestamp: Date.now(),
      ...data
    });
    this.set('sessions', sessions);
    this.updateStreak(today);
    this.addStars(data.stars || 0);
  },

  // Update daily streak
  updateStreak(dateStr) {
    const streak = this.get('streak', { current: 0, lastDate: null, longest: 0 });
    
    if (streak.lastDate === dateStr) return; // Already counted today
    
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

  // Add stars
  addStars(count) {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    stats.totalStars += count;
    this.set('stats', stats);
    this.checkAchievements();
  },

  // Record correct/incorrect answer
  recordAnswer(correct, module, word = null) {
    const stats = this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
    stats.totalQuestions += 1;
    if (correct) stats.totalCorrect += 1;
    this.set('stats', stats);

    // Record wrong answers for mistake book
    if (!correct) {
      const mistakes = this.get('mistakes', []);
      mistakes.push({
        module: module,
        word: word,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      });
      // Keep only last 200 mistakes
      if (mistakes.length > 200) mistakes.shift();
      this.set('mistakes', mistakes);
    }
  },

  // Get today's study data
  getTodayData() {
    const today = new Date().toISOString().split('T')[0];
    const sessions = this.get('sessions', []);
    return sessions.filter(s => s.date === today);
  },

  // Get last 7 days check-in data
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
        stars: stars,
        correct: correct,
        total: total,
        accuracy: total > 0 ? Math.round(correct / total * 100) : 0,
        timeSpent: daySessions.reduce((sum, s) => sum + (s.timeSpent || 0), 0)
      });
    }
    return result.reverse();
  },

  // Get word progress
  getWordProgress() {
    const wordStats = this.get('wordStats', {});
    const totalWords = KET_WORDS.length;
    const learned = Object.keys(wordStats).length;
    const mastered = Object.values(wordStats).filter(s => s.correct >= 3).length;
    return { total: totalWords, learned: learned, mastered: mastered };
  },

  // Update word stats
  updateWordStat(word, correct) {
    const wordStats = this.get('wordStats', {});
    if (!wordStats[word]) {
      wordStats[word] = { correct: 0, wrong: 0, total: 0 };
    }
    wordStats[word].total += 1;
    if (correct) {
      wordStats[word].correct += 1;
    } else {
      wordStats[word].wrong += 1;
    }
    this.set('wordStats', wordStats);
  },

  // Get mistakes
  getMistakes() {
    return this.get('mistakes', []);
  },

  // Get streak data
  getStreak() {
    return this.get('streak', { current: 0, lastDate: null, longest: 0 });
  },

  // Get stats
  getStats() {
    return this.get('stats', { totalStars: 0, totalCorrect: 0, totalQuestions: 0 });
  },

  // Get achievements
  getAchievements() {
    return this.get('achievements', []);
  },

  // Check and unlock achievements
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

    if (newAchievements.length > 0) {
      this.set('achievements', achievements);
    }

    return newAchievements;
  },

  // Export all data as JSON
  exportData() {
    const data = this.getAll();
    data._exportDate = new Date().toISOString();
    data._appVersion = '3.0';
    return data;
  },

  // Get current day for word study (1-15, cycles)
  getCurrentWordDay() {
    const wordDay = this.get('currentWordDay', 1);
    return wordDay;
  },

  // Advance to next word day
  advanceWordDay() {
    let day = this.get('currentWordDay', 1);
    day = (day % 15) + 1;
    this.set('currentWordDay', day);
    return day;
  },

  // Reset all data (for testing)
  resetAll() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.KEY_PREFIX)) {
        keys.push(key);
      }
    }
    keys.forEach(k => localStorage.removeItem(k));
  }
};

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
