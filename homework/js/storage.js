/**
 * 数据存储模块
 * 基于 localStorage 实现打卡记录和参考答案的持久化
 */
const Storage = {
  // =================== localStorage 封装 ===================
  get(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage.get error:', key, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage.set error:', key, e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // =================== 参考答案管理 ===================
  _answerKey() {
    return 'hw_answers';
  },

  getAnswers(subject, lessonId) {
    const all = this.get(this._answerKey(), {});
    const key = subject + '_' + lessonId;
    return all[key] || null;
  },

  saveAnswer(subject, lessonId, answers, lessonName) {
    const all = this.get(this._answerKey(), {});
    const key = subject + '_' + lessonId;
    all[key] = {
      subject: subject,
      lessonId: lessonId,
      lessonName: lessonName,
      answers: answers,
      updatedAt: new Date().toISOString()
    };
    this.set(this._answerKey(), all);
  },

  getAllAnswers() {
    return this.get(this._answerKey(), {});
  },

  deleteAnswer(subject, lessonId) {
    const all = this.get(this._answerKey(), {});
    const key = subject + '_' + lessonId;
    delete all[key];
    this.set(this._answerKey(), all);
  },

  // =================== 打卡记录 ===================
  _checkinKey() {
    return 'hw_checkins';
  },

  _todayStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  },

  _dateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  },

  recordCheckin(subject, lessonId, lessonName, result) {
    const all = this.get(this._checkinKey(), {});
    const today = this._todayStr();
    if (!all[today]) {
      all[today] = [];
    }
    // 去重：同一天同一课只保留最新
    all[today] = all[today].filter(function(r) {
      return !(r.subject === subject && r.lessonId === lessonId);
    });
    all[today].push({
      subject: subject,
      lessonId: lessonId,
      lessonName: lessonName,
      total: result.total,
      correct: result.correct,
      wrong: result.wrong,
      details: result.details || [],
      time: new Date().toISOString()
    });
    this.set(this._checkinKey(), all);
  },

  getCheckinHistory(days) {
    const all = this.get(this._checkinKey(), {});
    const result = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = this._dateStr(d);
      result.push({
        date: dateStr,
        records: all[dateStr] || []
      });
    }
    return result;
  },

  getTodayCheckins() {
    const all = this.get(this._checkinKey(), {});
    return all[this._todayStr()] || [];
  },

  hasCheckedIn(subject) {
    const today = this.getTodayCheckins();
    return today.some(function(r) { return r.subject === subject; });
  },

  getStreak() {
    const all = this.get(this._checkinKey(), {});
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = this._dateStr(d);
      if (all[dateStr] && all[dateStr].length > 0) {
        streak++;
      } else {
        // 如果是今天还没打卡，不算断
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  },

  getSubjectStreak(subject) {
    const all = this.get(this._checkinKey(), {});
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = this._dateStr(d);
      if (all[dateStr] && all[dateStr].some(function(r) { return r.subject === subject; })) {
        streak++;
      } else {
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  },

  // =================== 统计 ===================
  getStats() {
    const all = this.get(this._checkinKey(), {});
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalDays = 0;
    Object.keys(all).forEach(function(date) {
      if (all[date] && all[date].length > 0) {
        totalDays++;
        all[date].forEach(function(record) {
          totalQuestions += record.total || 0;
          totalCorrect += record.correct || 0;
        });
      }
    });
    return {
      totalDays: totalDays,
      totalQuestions: totalQuestions,
      totalCorrect: totalCorrect,
      accuracy: totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0
    };
  },

  // =================== 设置 ===================
  getSettings() {
    return this.get('hw_settings', {
      studentName: '小朋友',
      parentPassword: '6666'
    });
  },

  saveSettings(settings) {
    this.set('hw_settings', settings);
  }
};
