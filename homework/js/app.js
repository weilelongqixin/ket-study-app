/**
 * 学习打卡·AI批改 - 核心应用
 */
(function() {
  'use strict';

  // =================== 状态管理 ===================
  var state = {
    currentView: 'home',
    selectedSubject: 'chinese',
    selectedLessonId: null,
    selectedLessonName: '',
    capturedImage: null,
    capturedImageBase64: null,
    parentUnlocked: false,
    editingAnswerKey: null
  };

  // =================== 鼓励语 ===================
  var PRAISES = [
    '太棒了！你真是学习小达人！🌟',
    '继续加油，越来越厉害了！💪',
    '每一道题都是进步的阶梯！📈',
    '认真的孩子最可爱！😍',
    '今天又进步了一点点！🎉',
    '坚持就是胜利，为你点赞！👍',
    '聪明的小脑瓜，转转转！🧠✨',
    '错题不可怕，弄懂就是收获！📚'
  ];

  function getRandomPraise() {
    return PRAISES[Math.floor(Math.random() * PRAISES.length)];
  }

  // =================== 视图切换 ===================
  function switchView(viewName) {
    state.currentView = viewName;
    var views = document.querySelectorAll('.view');
    views.forEach(function(v) {
      v.classList.remove('active');
    });
    var target = document.getElementById('view-' + viewName);
    if (target) {
      target.classList.add('active');
    }
    // 更新底部导航
    var tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(function(t) {
      t.classList.remove('active');
    });
    var tab = document.querySelector('.tab-item[data-view="' + viewName + '"]');
    if (tab) {
      tab.classList.add('active');
    }
    // 渲染对应视图
    if (viewName === 'home') renderHome();
    if (viewName === 'camera') renderCamera();
    if (viewName === 'records') renderRecords();
    if (viewName === 'answers') renderAnswers();
    // 滚动到顶部
    window.scrollTo(0, 0);
  }

  // =================== 首页（打卡） ===================
  function renderHome() {
    var today = new Date();
    var dateStr = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
    var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    var weekDay = '星期' + weekDays[today.getDay()];

    var chineseDone = Storage.hasCheckedIn('chinese');
    var mathDone = Storage.hasCheckedIn('math');
    var englishDone = Storage.hasCheckedIn('english');
    var streak = Storage.getStreak();
    var stats = Storage.getStats();

    // 周末检测
    var dayOfWeek = new Date().getDay(); // 0=周日, 6=周六
    var isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    var html = '';
    // 周末提示
    if (isWeekend) {
      html += '<div class="card" style="background:linear-gradient(135deg, #fff9c4, #fff3e0); text-align:center; padding:30px 20px;">';
      html += '<div style="font-size:48px; margin-bottom:10px;">🎉</div>';
      html += '<div style="font-size:20px; font-weight:bold; color:#e65100;">周末休息！</div>';
      html += '<div style="font-size:14px; color:#999; margin-top:8px;">好好玩吧～周一继续加油！💪</div>';
      html += '</div>';
    }
    // 顶部日期卡片
    html += '<div class="card date-card">';
    html += '<div class="date-text">📅 ' + dateStr + ' ' + weekDay + '</div>';
    html += '<div class="streak-badge">🔥 连续打卡 <span class="streak-num">' + streak + '</span> 天</div>';
    html += '</div>';

    // 总体统计
    if (stats.totalDays > 0) {
      html += '<div class="card stats-card">';
      html += '<div class="stats-title">📊 累计统计</div>';
      html += '<div class="stats-row">';
      html += '<div class="stats-item"><div class="stats-num">' + stats.totalDays + '</div><div class="stats-label">打卡天数</div></div>';
      html += '<div class="stats-item"><div class="stats-num">' + stats.totalQuestions + '</div><div class="stats-label">总题数</div></div>';
      html += '<div class="stats-item"><div class="stats-num">' + stats.accuracy + '%</div><div class="stats-label">正确率</div></div>';
      html += '</div>';
      html += '</div>';
    }

    // 语文入口
    html += '<div class="card subject-card ' + (chineseDone ? 'done' : '') + '" onclick="App.selectSubjectFromHome(\'chinese\')">';
    html += '<div class="subject-icon">📖</div>';
    html += '<div class="subject-info">';
    html += '<div class="subject-name">语文</div>';
    html += '<div class="subject-sub">部编版五年级上册</div>';
    html += '</div>';
    html += '<div class="subject-status">' + (chineseDone ? '✅ 已完成' : '❌ 未打卡') + '</div>';
    html += '</div>';

    // 数学入口
    html += '<div class="card subject-card ' + (mathDone ? 'done' : '') + '" onclick="App.selectSubjectFromHome(\'math\')">';
    html += '<div class="subject-icon">🔢</div>';
    html += '<div class="subject-info">';
    html += '<div class="subject-name">数学</div>';
    html += '<div class="subject-sub">人教版五年级上册</div>';
    html += '</div>';
    html += '<div class="subject-status">' + (mathDone ? '✅ 已完成' : '❌ 未打卡') + '</div>';
    html += '</div>';

    // 英语入口
    html += '<div class="card subject-card ' + (englishDone ? 'done' : '') + '" onclick="App.selectSubjectFromHome(\'english\')">';
    html += '<div class="subject-icon">🔤</div>';
    html += '<div class="subject-info">';
    html += '<div class="subject-name">英语</div>';
    html += '<div class="subject-sub">人教精通版五年级上册</div>';
    html += '</div>';
    html += '<div class="subject-status">' + (englishDone ? '✅ 已完成' : '❌ 未打卡') + '</div>';
    html += '</div>';

    // 鼓励语
    html += '<div class="card encourage-card">';
    html += '<div class="encourage-text">' + getRandomPraise() + '</div>';
    html += '</div>';

    document.getElementById('home-content').innerHTML = html;
  }

  // =================== 拍照页 ===================
  function renderCamera() {
    var html = '';

    // 科目选择
    html += '<div class="section-title">选择科目</div>';
    html += '<div class="subject-tabs">';
    html += '<button class="subject-tab ' + (state.selectedSubject === 'chinese' ? 'active' : '') + '" onclick="App.selectSubject(\'chinese\')">📖 语文</button>';
    html += '<button class="subject-tab ' + (state.selectedSubject === 'math' ? 'active' : '') + '" onclick="App.selectSubject(\'math\')">🔢 数学</button>';
    html += '</div>';

    // 课时选择
    html += '<div class="section-title">选择课文/课时</div>';
    var lessons = LESSONS[state.selectedSubject] || [];
    html += '<select class="lesson-select" id="lesson-select">';
    html += '<option value="">请选择...</option>';
    lessons.forEach(function(l) {
      var sel = state.selectedLessonId === l.id ? ' selected' : '';
      html += '<option value="' + l.id + '" data-name="' + l.name + '"' + sel + '>' + l.name + '</option>';
    });
    html += '</select>';

    // 自定义课时输入
    html += '<input type="text" class="custom-lesson" id="custom-lesson" placeholder="或输入自定义课时名称" value="">';

    // 拍照区域
    html += '<div class="section-title">拍照上传作业</div>';
    html += '<div class="camera-area" id="camera-area">';
    html += '<label for="file-input" class="camera-label">';
    html += '<div class="camera-placeholder">';
    html += '<div class="camera-icon">📷</div>';
    html += '<div>点击拍照或选择图片</div>';
    html += '</div>';
    html += '</label>';
    html += '<input type="file" id="file-input" accept="image/*" capture="environment" style="display:none">';
    html += '</div>';

    // 图片预览
    html += '<div class="image-preview" id="image-preview" style="display:none">';
    html += '<img id="preview-img" src="" alt="作业预览">';
    html += '<button class="btn btn-secondary btn-small" onclick="App.clearImage()">重新拍照</button>';
    html += '</div>';

    // 参考答案显示
    html += '<div id="reference-answer-area"></div>';

    // 提交按钮
    html += '<button class="btn btn-primary btn-large" id="submit-btn" onclick="App.submitHomework()" style="display:none">';
    html += '✨ 开始AI批改';
    html += '</button>';

    // 批改结果
    html += '<div id="result-area"></div>';

    document.getElementById('camera-content').innerHTML = html;

    // 绑定事件
    bindCameraEvents();
    updateReferenceAnswer();
  }

  function bindCameraEvents() {
    var fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileSelect);
    }
    var lessonSelect = document.getElementById('lesson-select');
    if (lessonSelect) {
      lessonSelect.addEventListener('change', function() {
        var sel = this.selectedOptions[0];
        state.selectedLessonId = parseInt(this.value) || null;
        state.selectedLessonName = sel ? sel.getAttribute('data-name') : '';
        updateReferenceAnswer();
      });
    }
  }

  function handleFileSelect(e) {
    var file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('图片太大了，请选择10MB以内的图片');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(ev) {
      state.capturedImageBase64 = ev.target.result;
      var preview = document.getElementById('image-preview');
      var img = document.getElementById('preview-img');
      var cameraArea = document.getElementById('camera-area');
      if (preview && img && cameraArea) {
        img.src = ev.target.result;
        preview.style.display = 'block';
        cameraArea.style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }

  function updateReferenceAnswer() {
    var area = document.getElementById('reference-answer-area');
    if (!area) return;
    if (!state.selectedLessonId) {
      area.innerHTML = '';
      return;
    }
    var answer = Storage.getAnswers(state.selectedSubject, state.selectedLessonId);
    var html = '';
    if (answer && answer.answers) {
      html += '<div class="card answer-hint-card">';
      html += '<div class="answer-hint-title">📝 已有参考答案</div>';
      html += '<div class="answer-hint-count">共 ' + answer.answers.length + ' 题</div>';
      html += '</div>';
    } else {
      html += '<div class="card answer-hint-card warning">';
      html += '<div class="answer-hint-title">⚠️ 还没有参考答案</div>';
      html += '<div class="answer-hint-sub">请家长先在"答案管理"中录入参考答案</div>';
      html += '<div class="answer-hint-sub">也可以直接拍照后手动批改</div>';
      html += '</div>';
    }
    area.innerHTML = html;
  }

  // =================== 批改逻辑 ===================
  async function submitHomework() {
    var lessonSelect = document.getElementById('lesson-select');
    var customLesson = document.getElementById('custom-lesson');
    var lessonName = '';

    if (customLesson && customLesson.value.trim()) {
      lessonName = customLesson.value.trim();
    } else if (lessonSelect && lessonSelect.value) {
      lessonName = state.selectedLessonName;
    }

    if (!lessonName) {
      alert('请先选择课文/课时');
      return;
    }

    if (!state.capturedImageBase64) {
      alert('请先拍照上传作业');
      return;
    }

    var submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ AI批改中...';

    var resultArea = document.getElementById('result-area');
    resultArea.innerHTML = '<div class="loading-card"><div class="loading-spinner"></div><div class="loading-text">AI正在识别作业...</div></div>';

    try {
      var result = await analyzeHomeworkImage(state.capturedImageBase64, state.selectedSubject, state.selectedLessonId, lessonName);
      displayResult(result, lessonName);
    } catch (err) {
      console.error('批改失败:', err);
      resultArea.innerHTML = '<div class="card error-card"><div>😅 批改出错了，请重试</div><div class="error-detail">' + (err.message || '未知错误') + '</div></div>';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '✨ 开始AI批改';
    }
  }

  /**
   * AI识别函数（占位）
   * 后续接入真实图片识别API
   */
  async function analyzeHomeworkImage(imageBase64, subject, lessonId, lessonName) {
    var referenceAnswer = Storage.getAnswers(subject, lessonId);

    // 模拟AI处理延迟
    await new Promise(function(resolve) {
      setTimeout(resolve, 1500);
    });

    // 如果有参考答案，进入手动批改模式
    if (referenceAnswer && referenceAnswer.answers && referenceAnswer.answers.length > 0) {
      // 返回需要手动确认的结果
      return {
        mode: 'manual',
        referenceAnswers: referenceAnswer.answers,
        lessonName: lessonName,
        imageBase64: imageBase64
      };
    }

    // 没有参考答案，返回手动输入模式
    return {
      mode: 'no_reference',
      lessonName: lessonName,
      imageBase64: imageBase64
    };
  }

  function displayResult(result, lessonName) {
    var resultArea = document.getElementById('result-area');
    var html = '';

    if (result.mode === 'manual') {
      // 有参考答案，逐题确认
      html += '<div class="card result-card">';
      html += '<div class="result-title">📝 逐题批改</div>';
      html += '<div class="result-sub">对比参考答案，点击每题对/错</div>';
      html += '<div id="manual-grading-list">';
      result.referenceAnswers.forEach(function(ans, i) {
        html += '<div class="grading-item" data-index="' + i + '">';
        html += '<div class="grading-q">第' + (i + 1) + '题</div>';
        html += '<div class="grading-a">参考答案：' + escapeHtml(ans.answer || ans) + '</div>';
        html += '<div class="grading-btns">';
        html += '<button class="grading-btn correct-btn" onclick="App.markQuestion(' + i + ', true)">✅ 对</button>';
        html += '<button class="grading-btn wrong-btn" onclick="App.markQuestion(' + i + ', false)">❌ 错</button>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
      html += '<button class="btn btn-primary btn-large" onclick="App.finishGrading(\'' + escapeAttr(lessonName) + '\', ' + result.referenceAnswers.length + ')" id="finish-grading-btn" disabled>完成批改</button>';
      html += '</div>';
    } else if (result.mode === 'no_reference') {
      // 没有参考答案，手动输入结果
      html += '<div class="card result-card">';
      html += '<div class="result-title">✏️ 手动批改</div>';
      html += '<div class="result-sub">没有找到参考答案，请手动输入批改结果</div>';
      html += '<div class="manual-input-row">';
      html += '<label>总题数：</label>';
      html += '<input type="number" id="manual-total" min="0" value="10" class="manual-input">';
      html += '</div>';
      html += '<div class="manual-input-row">';
      html += '<label>正确数：</label>';
      html += '<input type="number" id="manual-correct" min="0" value="8" class="manual-input">';
      html += '</div>';
      html += '<div class="manual-input-row">';
      html += '<label>错题说明：</label>';
      html += '</div>';
      html += '<textarea id="manual-notes" class="manual-textarea" placeholder="记录错题和需要注意的地方..."></textarea>';
      html += '<button class="btn btn-primary btn-large" onclick="App.submitManualResult(\'' + escapeAttr(lessonName) + '\')">完成批改</button>';
      html += '</div>';
    }

    resultArea.innerHTML = html;

    // 初始化批改状态
    if (result.mode === 'manual') {
      App._gradingState = {};
    }
  }

  // =================== 手动批改 ===================
  function markQuestion(index, isCorrect) {
    App._gradingState[index] = isCorrect;
    var item = document.querySelector('.grading-item[data-index="' + index + '"]');
    if (item) {
      item.classList.remove('unmarked', 'marked-correct', 'marked-wrong');
      item.classList.add(isCorrect ? 'marked-correct' : 'marked-wrong');
    }
    // 检查是否全部完成
    var total = document.querySelectorAll('.grading-item').length;
    var marked = Object.keys(App._gradingState).length;
    var finishBtn = document.getElementById('finish-grading-btn');
    if (finishBtn) {
      finishBtn.disabled = marked < total;
    }
  }

  function finishGrading(lessonName, total) {
    var correct = 0;
    var wrong = 0;
    var details = [];
    for (var i = 0; i < total; i++) {
      if (App._gradingState[i]) {
        correct++;
        details.push({ index: i, correct: true });
      } else {
        wrong++;
        details.push({ index: i, correct: false });
      }
    }
    var result = {
      total: total,
      correct: correct,
      wrong: wrong,
      details: details
    };
    saveAndShowResult(lessonName, result);
  }

  function submitManualResult(lessonName) {
    var total = parseInt(document.getElementById('manual-total').value) || 0;
    var correct = parseInt(document.getElementById('manual-correct').value) || 0;
    var notes = document.getElementById('manual-notes').value;
    if (correct > total) correct = total;
    var result = {
      total: total,
      correct: correct,
      wrong: total - correct,
      details: [],
      notes: notes
    };
    saveAndShowResult(lessonName, result);
  }

  function saveAndShowResult(lessonName, result) {
    var subject = state.selectedSubject;
    var lessonId = state.selectedLessonId || 0;
    Storage.recordCheckin(subject, lessonId, lessonName, result);

    var resultArea = document.getElementById('result-area');
    var rate = result.total > 0 ? Math.round(result.correct / result.total * 100) : 0;
    var isGood = rate >= 80;

    var html = '';
    html += '<div class="card result-summary ' + (isGood ? 'good' : 'need-improve') + '">';
    html += '<div class="result-emoji">' + (isGood ? '🎉' : '💪') + '</div>';
    html += '<div class="result-score">' + result.correct + '/' + result.total + '</div>';
    html += '<div class="result-rate">正确率 ' + rate + '%</div>';
    html += '<div class="result-praise">' + getRandomPraise() + '</div>';
    if (result.wrong > 0) {
      html += '<div class="result-wrong">错题 ' + result.wrong + ' 道，继续加油！</div>';
    } else {
      html += '<div class="result-perfect">🏆 全对！太厉害了！</div>';
    }
    html += '</div>';

    if (result.notes) {
      html += '<div class="card"><div class="notes-title">📝 错题笔记</div><div class="notes-content">' + escapeHtml(result.notes) + '</div></div>';
    }

    html += '<button class="btn btn-primary btn-large" onclick="App.goHome()">✅ 完成，返回首页</button>';

    resultArea.innerHTML = html;

    // 隐藏提交按钮
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    // 滚动到结果
    resultArea.scrollIntoView({ behavior: 'smooth' });
  }

  // =================== 记录页 ===================
  function renderRecords() {
    var history = Storage.getCheckinHistory(7);
    var stats = Storage.getStats();

    var html = '';

    // 统计概览
    html += '<div class="card stats-overview">';
    html += '<div class="stats-overview-title">📊 学习统计</div>';
    html += '<div class="stats-row">';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalDays + '</div><div class="stats-label">打卡天数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalQuestions + '</div><div class="stats-label">总题数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalCorrect + '</div><div class="stats-label">答对题数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.accuracy + '%</div><div class="stats-label">正确率</div></div>';
    html += '</div>';
    html += '</div>';

    // 最近7天
    html += '<div class="section-title">最近7天记录</div>';
    var hasAny = false;
    history.forEach(function(day) {
      var dateParts = day.date.split('-');
      var displayDate = parseInt(dateParts[1]) + '月' + parseInt(dateParts[2]) + '日';
      var today = new Date();
      var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      var isToday = day.date === todayStr;
      var d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
      var weekLabel = '周' + weekDays[d.getDay()];

      if (day.records.length === 0) {
        html += '<div class="card record-day-card empty">';
        html += '<div class="record-date">' + displayDate + ' ' + weekLabel + (isToday ? '（今天）' : '') + '</div>';
        html += '<div class="record-empty">😴 未打卡</div>';
        html += '</div>';
      } else {
        hasAny = true;
        html += '<div class="card record-day-card">';
        html += '<div class="record-date">' + displayDate + ' ' + weekLabel + (isToday ? '（今天）' : '') + '</div>';
        day.records.forEach(function(r) {
          var subjectIcon = r.subject === 'chinese' ? '📖' : (r.subject === 'math' ? '🔢' : '🔤');
          var subjectName = r.subject === 'chinese' ? '语文' : (r.subject === 'math' ? '数学' : '英语');
          var rate = r.total > 0 ? Math.round(r.correct / r.total * 100) : 0;
          html += '<div class="record-item">';
          html += '<div class="record-item-header">';
          html += '<span class="record-subject">' + subjectIcon + ' ' + subjectName + '</span>';
          html += '<span class="record-lesson">' + escapeHtml(r.lessonName || '') + '</span>';
          html += '</div>';
          html += '<div class="record-item-score">';
          html += '<span class="score-text">' + r.correct + '/' + r.total + '</span>';
          html += '<span class="rate-badge rate-' + (rate >= 80 ? 'good' : rate >= 60 ? 'ok' : 'bad') + '">' + rate + '%</span>';
          html += '</div>';
          html += '</div>';
        });
        html += '</div>';
      }
    });

    if (!hasAny) {
      html += '<div class="card empty-hint"><div class="empty-icon">📝</div><div>还没有打卡记录</div><div class="empty-sub">完成第一次打卡开始记录吧！</div></div>';
    }

    document.getElementById('records-content').innerHTML = html;
  }

  // =================== 答案管理 ===================
  function renderAnswers() {
    var html = '';

    if (!state.parentUnlocked) {
      html += '<div class="card unlock-card">';
      html += '<div class="unlock-icon">🔐</div>';
      html += '<div class="unlock-title">家长入口</div>';
      html += '<div class="unlock-sub">请输入密码进入答案管理</div>';
      html += '<input type="password" class="password-input" id="parent-password" placeholder="请输入密码" maxlength="4">';
      html += '<button class="btn btn-primary btn-large" onclick="App.unlockParent()">进入</button>';
      html += '</div>';
      document.getElementById('answers-content').innerHTML = html;
      return;
    }

    // 已解锁
    html += '<div class="answers-header">';
    html += '<span>📝 答案管理</span>';
    html += '<button class="btn btn-secondary btn-small" onclick="App.lockParent()">🔒 退出</button>';
    html += '</div>';

    // 录入区域
    html += '<div class="card answer-form-card">';
    html += '<div class="form-title">录入参考答案</div>';
    html += '<div class="subject-tabs">';
    html += '<button class="subject-tab ' + (state.selectedSubject === 'chinese' ? 'active' : '') + '" onclick="App.selectSubject(\'chinese\')">📖 语文</button>';
    html += '<button class="subject-tab ' + (state.selectedSubject === 'math' ? 'active' : '') + '" onclick="App.selectSubject(\'math\')">🔢 数学</button>';
    html += '</div>';
    var lessons = LESSONS[state.selectedSubject] || [];
    html += '<select class="lesson-select" id="answer-lesson-select">';
    html += '<option value="">请选择课文/课时...</option>';
    lessons.forEach(function(l) {
      html += '<option value="' + l.id + '" data-name="' + l.name + '">' + l.name + '</option>';
    });
    html += '</select>';
    html += '<div class="form-label">参考答案（每行一道题，格式：1. 答案内容）</div>';
    html += '<textarea id="answer-input" class="answer-textarea" placeholder="1. 答案一&#10;2. 答案二&#10;3. 答案三"></textarea>';
    html += '<button class="btn btn-primary btn-large" onclick="App.saveAnswer()">💾 保存答案</button>';
    html += '</div>';
    html += '<div id="answer-save-result"></div>';

    // 已录入答案列表
    html += '<div class="section-title">已录入的答案</div>';
    var allAnswers = Storage.getAllAnswers();
    var keys = Object.keys(allAnswers);
    if (keys.length === 0) {
      html += '<div class="card empty-hint"><div class="empty-icon">📋</div><div>还没有录入答案</div></div>';
    } else {
      keys.forEach(function(key) {
        var a = allAnswers[key];
        var icon = a.subject === 'chinese' ? '📖' : (a.subject === 'math' ? '🔢' : '🔤');
        var subjectName = a.subject === 'chinese' ? '语文' : '数学';
        html += '<div class="card answer-list-card">';
        html += '<div class="answer-list-header">';
        html += '<span class="answer-list-title">' + icon + ' ' + subjectName + ' · ' + escapeHtml(a.lessonName || '') + '</span>';
        html += '</div>';
        html += '<div class="answer-list-count">共 ' + (a.answers ? a.answers.length : 0) + ' 题</div>';
        html += '<div class="answer-list-actions">';
        html += '<button class="btn btn-secondary btn-small" onclick="App.editAnswer(\'' + a.subject + '\', ' + a.lessonId + ')">✏️ 编辑</button>';
        html += '<button class="btn btn-danger btn-small" onclick="App.deleteAnswer(\'' + a.subject + '\', ' + a.lessonId + ')">🗑️ 删除</button>';
        html += '</div>';
        html += '</div>';
      });
    }

    document.getElementById('answers-content').innerHTML = html;
  }

  function saveAnswer() {
    var lessonSelect = document.getElementById('answer-lesson-select');
    if (!lessonSelect || !lessonSelect.value) {
      alert('请选择课文/课时');
      return;
    }
    var lessonId = parseInt(lessonSelect.value);
    var lessonName = lessonSelect.selectedOptions[0].getAttribute('data-name');
    var input = document.getElementById('answer-input').value.trim();
    if (!input) {
      alert('请输入参考答案');
      return;
    }

    // 解析答案：支持 "1. xxx" 或直接每行一条
    var lines = input.split('\n').filter(function(l) { return l.trim(); });
    var answers = lines.map(function(line, i) {
      var match = line.match(/^\d+[.、．]\s*(.*)/);
      return { answer: match ? match[1] : line };
    });

    Storage.saveAnswer(state.selectedSubject, lessonId, answers, lessonName);

    var result = document.getElementById('answer-save-result');
    result.innerHTML = '<div class="card success-msg">✅ 答案已保存！共 ' + answers.length + ' 题</div>';
    setTimeout(function() {
      result.innerHTML = '';
    }, 2000);

    document.getElementById('answer-input').value = '';
    renderAnswers();
  }

  function editAnswer(subject, lessonId) {
    var answer = Storage.getAnswers(subject, lessonId);
    if (!answer) return;
    state.selectedSubject = subject;
    renderAnswers();
    // 选中对应课时
    var lessonSelect = document.getElementById('answer-lesson-select');
    if (lessonSelect) {
      lessonSelect.value = lessonId;
      // 填充文本框
      var text = answer.answers.map(function(a, i) {
        return (i + 1) + '. ' + (a.answer || a);
      }).join('\n');
      document.getElementById('answer-input').value = text;
    }
  }

  function deleteAnswer(subject, lessonId) {
    if (!confirm('确定删除这组答案吗？')) return;
    Storage.deleteAnswer(subject, lessonId);
    renderAnswers();
  }

  // =================== 工具函数 ===================
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // =================== 公开API ===================
  window.App = {
    _gradingState: {},
    init: function() {
      // 绑定底部导航
      var tabs = document.querySelectorAll('.tab-item');
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          switchView(this.getAttribute('data-view'));
        });
      });
      switchView('home');
    },
    switchView: switchView,
    goHome: function() {
      switchView('home');
    },
    selectSubject: function(subject) {
      state.selectedSubject = subject;
      state.selectedLessonId = null;
      renderCamera();
    },
    selectSubjectFromHome: function(subject) {
      state.selectedSubject = subject;
      state.selectedLessonId = null;
      switchView('camera');
    },
    clearImage: function() {
      state.capturedImageBase64 = null;
      var fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      renderCamera();
    },
    submitHomework: submitHomework,
    markQuestion: markQuestion,
    finishGrading: finishGrading,
    submitManualResult: submitManualResult,
    unlockParent: function() {
      var pwd = document.getElementById('parent-password').value;
      var settings = Storage.getSettings();
      if (pwd === settings.parentPassword) {
        state.parentUnlocked = true;
        renderAnswers();
      } else {
        alert('密码错误');
      }
    },
    lockParent: function() {
      state.parentUnlocked = false;
      renderAnswers();
    },
    saveAnswer: saveAnswer,
    editAnswer: editAnswer,
    deleteAnswer: deleteAnswer
  };

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.App.init);
  } else {
    window.App.init();
  }
})();
