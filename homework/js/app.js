/**
 * 学习打卡·AI批改 - 核心应用 v2
 * 2026-07-04 完善版
 * - 三科目（语文/数学/英语）完整支持
 * - 2026秋新版教材目录
 * - 拍照→选课→批改→记录 全流程
 */
(function() {
  'use strict';

  // =================== 状态管理 ===================
  var state = {
    currentView: 'home',
    selectedSubject: 'chinese',
    selectedLessonId: null,
    selectedLessonName: '',
    capturedImageBase64: null,
    parentUnlocked: false
  };

  // =================== 内置参考答案（家长拍摄录入）===================
  var BUILT_IN_ANSWERS = {
    // 第一单元 观察简单组合体
    'math_1': [
      '1.（课本学习内容）',
      '2. 上、左、前',
      '3.(1)A D  (2)C  (3)B',
      '4. 从前面看、从上面看、从左面看（画图题）'
    ],
    'math_2': [
      '知识点：相同、不同；相同、不同',
      '1.(1)②③  (2)①②  (3)图形题',
      '2.(1)C  (2)B',
      '3.(1)①  (2)②④⑥  (3)①③  (4)③⑤',
      '4. 从（前）面看、从（左）面看（画图题）'
    ],
    // 第二单元 小数乘法
    'math_3': [
      '1. 48  4.8  548  5.48（竖式略）',
      '2. D',
      '3. 14.8×4=59.2(元)；14.8×6=88.8(元)；88.8<100，够买6份'
    ],
    'math_4': [
      '1.(1) 39 10 1.95 100  (2) 两 一 2.142 三',
      '2. 3.12  10.92  5.824（竖式略）',
      '3. 4680 4680 46.8 46.8 4.68 4.68',
      '4. 4.8×2.85=13.68(m²)',
      '5.(1)发钗长度 (2)1.6×2.1=3.36(dm) 3.36−1.6=1.76(dm)'
    ],
    'math_5': [
      '1. 0.392  0.039  0.0054（竖式略）',
      '2.(1) 两 两 0.019 四  (2) 三 四  (3) 1.654 1.645',
      '3. 0.7  3.11  0.07（竖式略）',
      '4.(1) 1.5×1.4=2.1(m)，牦牛体长2.1m',
      '4.(2) 0.59×1.7=1.003(t)，牦牛体重1.003t',
      '5. 235.88×0.6≈141.5(元)',
      '6. 0.88×0.88=0.7744(dm²)>0.99×0.77=0.7623(dm²)，正方形面积更大'
    ],
    // 第7天 - 求一个数的小数倍是多少
    'math_6': [
      '1. > = > > < <',
      '2.(1)B  (2)A  (3)A',
      '3. 85.6×1.25=107(元)；85.6+107=192.6(元)',
      '4. 18.6×1.5=27.9(cm)；27.9−18.6=9.3(cm)'
    ],
    // 第8天 - 整数乘法运算律推广到小数
    'math_7': [
      '1.(1)0.8 0.86  (2)4.62 5.38 2.5  (3)7.39 7.39  (4)4 1.25',
      '2. 0.26  63  1269.9  700.92  524  18',
      '3. (16.8+13.2)×180=5400(元)',
      '4. 方法一:4.2×0.25+3.8×0.25=2(km)；方法二:(4.2+3.8)×0.25=2(km)'
    ],
    // 第9天 - 估算解决购物问题
    'math_8': [
      '1.(1)8 240 够  (2)9 270 不够',
      '2. A',
      '3. 往小估:33×2+4×5+5×3=101(元)>100，能参加满减',
      '4. 往大估:38×5+80×2.5+98=488(元)<500，够买扇贝'
    ],
    // 第三单元 小数除法
    // 第12天 - 除数是整数的小数除法(1) - lessonId=9
    'math_9': [
      '1.(竖排)16 1.6 12 1.2 11 1.1',
      '2. 3.8 1.4 2.9 2.5 7.1 3.75（竖式略）',
      '3. 52.5÷3=17.5(元)',
      '4.(1) 4.5÷2=2.25(千米/时)  (2) 4.5×2÷(3+2)=1.8(千米/时)'
    ],
    // 第13天 - 除数是整数的小数除法(2)
    'math_10': [
      '1. 0.6 0.46 0.27 0.75 0.27 0.0168（竖式及验算略）',
      '2. 9.6÷24=0.4  4÷25=0.16  6.63÷17=0.39',
      '3. D',
      '4. 1.25÷5=0.25(m)',
      '5. 45.1-43.6=1.5(元) 1.5÷6=0.25(元)',
      '6. 牛奶3.3÷2=1.65  磷虾皮10.8÷18=0.6  蛋糕15.8  应收29.9  找回70.1'
    ],
    // 第14天 - 循环小数
    'math_11': [
      '1. 0.9  0.450  1.138',
      '2. B',
      '3. 34÷24≈1.42(元) 36÷27≈1.33(元) 1.33<1.42，B超市更划算'
    ],
    // 第15天 - 一个数除以小数
    'math_12': [
      '1. 13 1.5 200（竖式略）',
      '2.(竖排)0.42 0.63 0.9 1.5 4.8 12 6 15 30；小于 等于 大于',
      '3. 7.2÷0.6=12(分) 10÷2.5=4(分)',
      '4. 4.8×240=1152(dm²) 1152÷4.5=256(个)'
    ],
    // 第16天 - 解决问题
    'math_13': [
      '知识点：11.85 3 4',
      '1. 9 8',
      '2. 88.8÷7.8≈11.4',
      '3. 21.6÷0.32=67.5(个)，最多捏67个',
      '4. 0.5×30÷1.2=12.5(次)，至少13次'
    ],
    // 第17天 - 小数除法专项练
    'math_14': [
      '1. 商的小数点与被除数小数点对齐；除数扩大100倍转化成整数',
      '2. 0.83 0.8',
      '3. < > > > < > >',
      '4. 4.95 3.4 7.71（竖式略）',
      '5. 27.55 2.5 0.75',
      '6. 550÷60=9.16，至少需10个瓶子',
      '7. 7.5÷5=1.5(米) 23.5÷1.5=15.6，最多色15个',
      '8. 18.88−1.08×11=7(元) 7÷0.7=10(千克)'
    ],
    // 第四单元 图形的运动
    // 第18天 - 轴对称(1)
    'math_15': [
      '知识点：3 2 1 1 1 相等',
      '1. 2 2 1 1 3 3 是',
      '2.(1)轴对称 对称轴  (2)3 垂直  (3)F 2',
      '3. A',
      '4. E F 5'
    ],
    // 第19天 - 轴对称(2) - 补全轴对称图形
    'math_16': [
      '第1题、第2题为画图题（补全轴对称图形），请对照课本'
    ],
    // 第20天 - 平移(1)
    'math_17': [
      '知识点：右9 右9 右9 右9 右9 相同 相等',
      '1.(1)④①  (2)下 3',
      '第2、3题为画图题（平移图形）'
    ],
    // 第21天 - 平移(2)
    'math_18': [
      '知识点：24 24',
      '1.(1)1500  (2)A B 8',
      '2.(1)4×4=16(dm²)  (2)(9+4)×2=26(cm)',
      '3. 1/4 1/3 1/2 1/4',
      '4.(1)(78−3)×(45−3)=3150(平方米)  (2)(52+28)×2=160(米)'
    ],
    // 第22天 - 旋转(1)
    'math_19': [
      '知识点：360 12 30 30 30 30 顺时针 30'
    ]
  };

  function getAnswerKey(subject, lessonId) {
    return subject + '_' + lessonId;
  }

  function getBuiltInAnswers(subject, lessonId) {
    var key = getAnswerKey(subject, lessonId);
    var builtIn = BUILT_IN_ANSWERS[key];
    if (!builtIn) return null;
    return {
      subject: subject,
      lessonId: lessonId,
      lessonName: '',
      answers: builtIn.map(function(text) { return { answer: text }; }),
      updatedAt: 'built-in'
    };
  }

  // =================== 科目配置 ===================
  var SUBJECTS = {
    chinese: { name: '语文', icon: '📖', sub: '部编版五年级上册（2026秋新版）' },
    math: { name: '数学', icon: '🔢', sub: '人教版五年级上册（2026秋新版）' },
    english: { name: '英语', icon: '🔤', sub: '人教精通版五年级上册' }
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
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active');
    document.querySelectorAll('.tab-item').forEach(function(t) { t.classList.remove('active'); });
    var tab = document.querySelector('.tab-item[data-view="' + viewName + '"]');
    if (tab) tab.classList.add('active');
    if (viewName === 'home') renderHome();
    if (viewName === 'camera') renderCamera();
    if (viewName === 'records') renderRecords();
    if (viewName === 'answers') renderAnswers();
    window.scrollTo(0, 0);
  }

  // =================== 首页（打卡） ===================
  function renderHome() {
    var today = new Date();
    var dateStr = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
    var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    var weekDay = '星期' + weekDays[today.getDay()];
    var dayOfWeek = today.getDay();
    var isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    var streak = Storage.getStreak();
    var stats = Storage.getStats();
    var todayCheckins = Storage.getTodayCheckins();

    var html = '';

    // 周末提示
    if (isWeekend) {
      html += '<div class="card weekend-card">';
      html += '<div style="font-size:48px; margin-bottom:10px;">🎉</div>';
      html += '<div style="font-size:20px; font-weight:bold; color:#e65100;">周末休息！</div>';
      html += '<div style="font-size:14px; color:#999; margin-top:8px;">好好玩吧～周一继续加油！💪</div>';
      html += '</div>';
    }

    // 日期+连续打卡
    html += '<div class="card date-card">';
    html += '<div class="date-text">📅 ' + dateStr + ' ' + weekDay + '</div>';
    html += '<div class="streak-badge">🔥 连续打卡 <span class="streak-num">' + streak + '</span> 天</div>';
    html += '</div>';

    // 统计
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

    // 今日进度
    var doneCount = todayCheckins.length;
    var totalSubjects = 3;
    html += '<div class="card today-progress-card">';
    html += '<div class="progress-title">📝 今日进度 ' + doneCount + '/' + totalSubjects + '</div>';
    html += '<div class="progress-bar-wrap">';
    var pct = Math.round(doneCount / totalSubjects * 100);
    html += '<div class="progress-bar" style="width:' + pct + '%"></div>';
    html += '</div>';
    html += '</div>';

    // 三个科目入口
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      var done = todayCheckins.some(function(r) { return r.subject === subj; });
      html += '<div class="card subject-card ' + (done ? 'done' : '') + '" onclick="App.selectSubjectFromHome(\'' + subj + '\')">';
      html += '<div class="subject-icon">' + conf.icon + '</div>';
      html += '<div class="subject-info">';
      html += '<div class="subject-name">' + conf.name + '</div>';
      html += '<div class="subject-sub">' + conf.sub + '</div>';
      html += '</div>';
      html += '<div class="subject-status">' + (done ? '✅' : '❌') + '</div>';
      html += '</div>';
    });

    // 鼓励语
    html += '<div class="card encourage-card">';
    html += '<div class="encourage-text">' + getRandomPraise() + '</div>';
    html += '</div>';

    document.getElementById('home-content').innerHTML = html;
  }

  // =================== 拍照页 ===================
  function renderCamera() {
    var html = '';

    // 科目选择（三科目）
    html += '<div class="section-title">选择科目</div>';
    html += '<div class="subject-tabs">';
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      html += '<button class="subject-tab ' + (state.selectedSubject === subj ? 'active' : '') + '" onclick="App.selectSubject(\'' + subj + '\')">' + conf.icon + ' ' + conf.name + '</button>';
    });
    html += '</div>';

    // 课时选择
    html += '<div class="section-title">选择课文/课时</div>';
    var lessons = LESSONS[state.selectedSubject] || [];
    html += '<select class="lesson-select" id="lesson-select">';
    html += '<option value="">请选择...</option>';
    // 按单元分组
    var currentUnit = '';
    lessons.forEach(function(l) {
      html += '<option value="' + l.id + '" data-name="' + l.name + '">' + l.name + '</option>';
    });
    html += '</select>';

    // 自定义课时
    html += '<input type="text" class="custom-lesson" id="custom-lesson" placeholder="或输入自定义内容（如：复习卷子）">';

    // 拍照
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

    // 预览
    html += '<div class="image-preview" id="image-preview" style="display:none">';
    html += '<img id="preview-img" src="" alt="作业预览">';
    html += '<button class="btn btn-secondary btn-small" onclick="App.clearImage()">重新拍照</button>';
    html += '</div>';

    // 参考答案提示
    html += '<div id="reference-answer-area"></div>';

    // 提交
    html += '<button class="btn btn-primary btn-large" id="submit-btn" onclick="App.submitHomework()" style="display:none">';
    html += '✨ 开始AI批改';
    html += '</button>';

    // 结果
    html += '<div id="result-area"></div>';

    document.getElementById('camera-content').innerHTML = html;
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
    // 先查localStorage，再查内置答案
    var answer = Storage.getAnswers(state.selectedSubject, state.selectedLessonId);
    if (!answer) answer = getBuiltInAnswers(state.selectedSubject, state.selectedLessonId);
    var html = '';
    if (answer && answer.answers) {
      html += '<div class="card answer-hint-card">';
      html += '<div class="answer-hint-title">📝 已有参考答案</div>';
      html += '<div class="answer-hint-count">共 ' + answer.answers.length + ' 题</div>';
      html += '</div>';
    } else {
      html += '<div class="card answer-hint-card warning">';
      html += '<div class="answer-hint-title">⚠️ 还没有参考答案</div>';
      html += '<div class="answer-hint-sub">请家长先在"答案管理"中录入</div>';
      html += '<div class="answer-hint-sub">也可以直接拍照后手动批改</div>';
      html += '</div>';
    }
    area.innerHTML = html;
  }

  // =================== 批改逻辑 ===================
  function submitHomework() {
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
    submitBtn.textContent = '⏳ 批改中...';

    var resultArea = document.getElementById('result-area');
    resultArea.innerHTML = '<div class="loading-card"><div class="loading-spinner"></div><div class="loading-text">正在准备批改...</div></div>';

    setTimeout(function() {
      var referenceAnswer = Storage.getAnswers(state.selectedSubject, state.selectedLessonId);
      if (!referenceAnswer) referenceAnswer = getBuiltInAnswers(state.selectedSubject, state.selectedLessonId);
      var result;
      if (referenceAnswer && referenceAnswer.answers && referenceAnswer.answers.length > 0) {
        result = { mode: 'manual', referenceAnswers: referenceAnswer.answers, lessonName: lessonName };
      } else {
        result = { mode: 'no_reference', lessonName: lessonName };
      }
      displayResult(result, lessonName);
      submitBtn.disabled = false;
      submitBtn.textContent = '✨ 开始AI批改';
    }, 800);
  }

  function displayResult(result, lessonName) {
    var resultArea = document.getElementById('result-area');
    var html = '';

    if (result.mode === 'manual') {
      html += '<div class="card result-card">';
      html += '<div class="result-title">📝 逐题批改</div>';
      html += '<div class="result-sub">对照参考答案，点击每题对/错</div>';
      html += '<div id="manual-grading-list">';
      result.referenceAnswers.forEach(function(ans, i) {
        html += '<div class="grading-item unmarked" data-index="' + i + '">';
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
      html += '<div class="card result-card">';
      html += '<div class="result-title">✏️ 手动批改</div>';
      html += '<div class="result-sub">没有参考答案，请输入批改结果</div>';
      html += '<div class="manual-input-row">';
      html += '<label>总题数：</label>';
      html += '<input type="number" id="manual-total" min="0" value="10" class="manual-input">';
      html += '</div>';
      html += '<div class="manual-input-row">';
      html += '<label>正确数：</label>';
      html += '<input type="number" id="manual-correct" min="0" value="8" class="manual-input">';
      html += '</div>';
      html += '<div class="form-label">错题说明（可选）：</div>';
      html += '<textarea id="manual-notes" class="manual-textarea" placeholder="记录错题和需要注意的地方..."></textarea>';
      html += '<button class="btn btn-primary btn-large" onclick="App.submitManualResult(\'' + escapeAttr(lessonName) + '\')">完成批改</button>';
      html += '</div>';
    }

    resultArea.innerHTML = html;
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
    var total = document.querySelectorAll('.grading-item').length;
    var marked = Object.keys(App._gradingState).length;
    var finishBtn = document.getElementById('finish-grading-btn');
    if (finishBtn) finishBtn.disabled = marked < total;
  }

  function finishGrading(lessonName, total) {
    var correct = 0, wrong = 0, details = [];
    for (var i = 0; i < total; i++) {
      if (App._gradingState[i]) { correct++; details.push({ index: i, correct: true }); }
      else { wrong++; details.push({ index: i, correct: false }); }
    }
    saveAndShowResult(lessonName, { total: total, correct: correct, wrong: wrong, details: details });
  }

  function submitManualResult(lessonName) {
    var total = parseInt(document.getElementById('manual-total').value) || 0;
    var correct = parseInt(document.getElementById('manual-correct').value) || 0;
    var notes = document.getElementById('manual-notes').value;
    if (correct > total) correct = total;
    saveAndShowResult(lessonName, { total: total, correct: correct, wrong: total - correct, details: [], notes: notes });
  }

  function saveAndShowResult(lessonName, result) {
    Storage.recordCheckin(state.selectedSubject, state.selectedLessonId || 0, lessonName, result);
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
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';
    resultArea.scrollIntoView({ behavior: 'smooth' });
  }

  // =================== 记录页 ===================
  function renderRecords() {
    var history = Storage.getCheckinHistory(7);
    var stats = Storage.getStats();
    var html = '';

    html += '<div class="card stats-overview">';
    html += '<div class="stats-overview-title">📊 学习统计</div>';
    html += '<div class="stats-row">';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalDays + '</div><div class="stats-label">打卡天数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalQuestions + '</div><div class="stats-label">总题数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalCorrect + '</div><div class="stats-label">答对</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.accuracy + '%</div><div class="stats-label">正确率</div></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="section-title">最近7天记录</div>';
    var hasAny = false;
    history.forEach(function(day) {
      var parts = day.date.split('-');
      var displayDate = parseInt(parts[1]) + '月' + parseInt(parts[2]) + '日';
      var today = new Date();
      var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      var isToday = day.date === todayStr;
      var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
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
          var conf = SUBJECTS[r.subject] || { icon: '📝', name: r.subject };
          var rate = r.total > 0 ? Math.round(r.correct / r.total * 100) : 0;
          html += '<div class="record-item">';
          html += '<div class="record-item-header">';
          html += '<span class="record-subject">' + conf.icon + ' ' + conf.name + '</span>';
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

    html += '<div class="answers-header">';
    html += '<span>📝 答案管理</span>';
    html += '<button class="btn btn-secondary btn-small" onclick="App.lockParent()">🔒 退出</button>';
    html += '</div>';

    // 录入
    html += '<div class="card answer-form-card">';
    html += '<div class="form-title">录入参考答案</div>';
    html += '<div class="subject-tabs">';
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      html += '<button class="subject-tab ' + (state.selectedSubject === subj ? 'active' : '') + '" onclick="App.selectSubject(\'' + subj + '\')">' + conf.icon + ' ' + conf.name + '</button>';
    });
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

    // 已录入列表
    html += '<div class="section-title">已录入的答案</div>';
    var allAnswers = Storage.getAllAnswers();
    // 合并内置答案
    Object.keys(BUILT_IN_ANSWERS).forEach(function(key) {
      if (!allAnswers[key]) {
        var parts = key.split('_');
        var subj = parts[0];
        var lid = parseInt(parts[1]);
        var lessons = LESSONS[subj] || [];
        var lesson = lessons.find(function(l) { return l.id === lid; });
        allAnswers[key] = {
          subject: subj,
          lessonId: lid,
          lessonName: lesson ? lesson.name : '',
          answers: BUILT_IN_ANSWERS[key].map(function(t) { return { answer: t }; }),
          updatedAt: 'built-in'
        };
      }
    });
    var keys = Object.keys(allAnswers);
    if (keys.length === 0) {
      html += '<div class="card empty-hint"><div class="empty-icon">📋</div><div>还没有录入答案</div></div>';
    } else {
      keys.forEach(function(key) {
        var a = allAnswers[key];
        var conf = SUBJECTS[a.subject] || { icon: '📝', name: a.subject };
        html += '<div class="card answer-list-card">';
        html += '<div class="answer-list-header">';
        html += '<span class="answer-list-title">' + conf.icon + ' ' + conf.name + ' · ' + escapeHtml(a.lessonName || '') + '</span>';
        html += '</div>';
        html += '<div class="answer-list-count">共 ' + (a.answers ? a.answers.length : 0) + ' 题' + (a.updatedAt === 'built-in' ? ' · 📦 内置' : '') + '</div>';
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
    if (!lessonSelect || !lessonSelect.value) { alert('请选择课文/课时'); return; }
    var lessonId = parseInt(lessonSelect.value);
    var lessonName = lessonSelect.selectedOptions[0].getAttribute('data-name');
    var input = document.getElementById('answer-input').value.trim();
    if (!input) { alert('请输入参考答案'); return; }

    var lines = input.split('\n').filter(function(l) { return l.trim(); });
    var answers = lines.map(function(line) {
      var match = line.match(/^\d+[.、．]\s*(.*)/);
      return { answer: match ? match[1] : line };
    });

    Storage.saveAnswer(state.selectedSubject, lessonId, answers, lessonName);

    var result = document.getElementById('answer-save-result');
    result.innerHTML = '<div class="card success-msg">✅ 答案已保存！共 ' + answers.length + ' 题</div>';
    setTimeout(function() { result.innerHTML = ''; }, 2000);
    document.getElementById('answer-input').value = '';
    renderAnswers();
  }

  function editAnswer(subject, lessonId) {
    var answer = Storage.getAnswers(subject, lessonId);
    if (!answer) return;
    state.selectedSubject = subject;
    renderAnswers();
    var lessonSelect = document.getElementById('answer-lesson-select');
    if (lessonSelect) {
      lessonSelect.value = lessonId;
      var text = answer.answers.map(function(a, i) { return (i + 1) + '. ' + (a.answer || a); }).join('\n');
      document.getElementById('answer-input').value = text;
    }
  }

  function deleteAnswer(subject, lessonId) {
    if (!confirm('确定删除这组答案吗？')) return;
    Storage.deleteAnswer(subject, lessonId);
    renderAnswers();
  }

  // =================== 工具 ===================
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
      document.querySelectorAll('.tab-item').forEach(function(tab) {
        tab.addEventListener('click', function() {
          switchView(this.getAttribute('data-view'));
        });
      });
      switchView('home');
    },
    switchView: switchView,
    goHome: function() { switchView('home'); },
    selectSubject: function(subject) {
      state.selectedSubject = subject;
      state.selectedLessonId = null;
      if (state.currentView === 'camera') renderCamera();
      else if (state.currentView === 'answers') renderAnswers();
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
    lockParent: function() { state.parentUnlocked = false; renderAnswers(); },
    saveAnswer: saveAnswer,
    editAnswer: editAnswer,
    deleteAnswer: deleteAnswer
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.App.init);
  } else {
    window.App.init();
  }
})();
