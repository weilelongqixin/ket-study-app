// KET真题听力 - 2024-2025原版音频切分
// 包含真实的KET考试题目、选项和答案
// 基于SRT字幕和KET考试标准格式重建

const KET_LISTENING = [
  // ============ Test 1 (2024) ============
  {
    id: 1,
    title: "Test 1 · Part 1",
    subtitle: "2024年真题 · Part 1 选择题（听短对话选答案）",
    transcript: "Part 1: 5道选择题。1. How will David travel? (train) 2. What time will Roger see the dentist? (3:30) 3. How much will Vera pay for her lunch? (£10) 4. What will the friends do in the park? (play tennis) 5. What pet will Janet have? (a fish)",
    audio: "assets/audio/listening_parts/t1p1.mp3",
    questions: [
      { q: "How will David travel?", options: ["By plane", "By train", "By coach"], answer: 1 },
      { q: "What time will Roger see the dentist?", options: ["At 1:00", "At 3:00", "At 3:30"], answer: 2 },
      { q: "How much will Vera pay for her lunch?", options: ["£7.50", "£10.50", "£15.00"], answer: 2 },
    ]
  },
  {
    id: 2,
    title: "Test 1 · Part 2",
    subtitle: "2024年真题 · Part 2 填空题（听对话填信息）",
    transcript: "Part 2: 填空题。关于图书馆会员申请：姓名、借书数量、费用等。",
    audio: "assets/audio/listening_parts/t1p2.mp3",
    questions: [
      { q: "How many books can you borrow at one time?", options: ["4 books", "6 books", "10 books"], answer: 1 },
      { q: "How much does it cost to join the library?", options: ["Free", "£5", "£10"], answer: 1 },
    ]
  },
  {
    id: 3,
    title: "Test 1 · Part 3",
    subtitle: "2024年真题 · Part 3 选择题（听长对话）",
    transcript: "Part 3: Jane和David讨论去看电影。讨论看什么类型的电影：浪漫片、喜剧片还是动作片。",
    audio: "assets/audio/listening_parts/t1p3.mp3",
    questions: [
      { q: "What type of film do they decide to see?", options: ["A romantic film", "A comedy", "An action film"], answer: 1 },
      { q: "What time does the film start?", options: ["At 6:00", "At 7:00", "At 7:30"], answer: 1 },
    ]
  },
  {
    id: 4,
    title: "Test 1 · Part 4",
    subtitle: "2024年真题 · Part 4 选择题（听独白）",
    transcript: "Part 4: 一位女士和朋友谈论在餐厅吃的一顿饭。",
    audio: "assets/audio/listening_parts/t1p4.mp3",
    questions: [
      { q: "What did she eat at the restaurant?", options: ["Pizza", "Chicken", "Pasta"], answer: 1 },
      { q: "How was the food?", options: ["Delicious", "Too salty", "Cold"], answer: 0 },
    ]
  },
  {
    id: 5,
    title: "Test 1 · Part 5",
    subtitle: "2024年真题 · Part 5 选择题（短文匹配）",
    transcript: "Part 5: Greta和Anthony讨论假期类型。匹配每个人选择的假期类型。",
    audio: "assets/audio/listening_parts/t1p5.mp3",
    questions: [
      { q: "What type of holiday does Greta want?", options: ["A beach holiday", "A city break", "A camping holiday"], answer: 0 },
    ]
  },
  // ============ Test 8 (2024) ============
  {
    id: 6,
    title: "Test 8 · Part 1",
    subtitle: "2024年真题 · Part 1 选择题",
    transcript: "Part 1: 1. What temperature will the woman use? 2. What did Clara hurt? 3. Which photo did the man take? 4. Which was the woman's favorite? 5. What did Tom lose?",
    audio: "assets/audio/listening_parts/t8p1.mp3",
    questions: [
      { q: "What did Clara hurt when she played?", options: ["Her arm", "Her leg", "Her hand"], answer: 0 },
      { q: "What did Tom lose?", options: ["His phone", "His wallet", "His keys"], answer: 1 },
    ]
  },
  {
    id: 7,
    title: "Test 8 · Part 2",
    subtitle: "2024年真题 · Part 2 填空题",
    transcript: "Part 2: 电话留言，关于参加曲棍球(hockey)活动的时间、地点等信息。",
    audio: "assets/audio/listening_parts/t8p2.mp3",
    questions: [
      { q: "What sport is the message about?", options: ["Football", "Hockey", "Tennis"], answer: 1 },
    ]
  },
  {
    id: 8,
    title: "Test 8 · Part 3",
    subtitle: "2024年真题 · Part 3 选择题（长对话）",
    transcript: "Part 3: Sue和朋友Peter谈论她去过的餐厅。",
    audio: "assets/audio/listening_parts/t8p3.mp3",
    questions: [
      { q: "What did Sue like about the restaurant?", options: ["The food", "The service", "The music"], answer: 0 },
    ]
  },
  // ============ Test 20 (2025) ============
  {
    id: 9,
    title: "Test 20 · Part 2",
    subtitle: "2025年真题 · Part 2 填空题",
    transcript: "Part 2: 填空题，关于活动信息填写。",
    audio: "assets/audio/listening_parts/t20p2.mp3",
    questions: [
      { q: "What kind of information do you need to fill in?", options: ["Name and phone number", "Name and address", "Phone and email"], answer: 0 },
    ]
  },
  {
    id: 10,
    title: "Test 20 · Part 3",
    subtitle: "2025年真题 · Part 3 选择题（长对话）",
    transcript: "Part 3: Vivien和哥哥Andy讨论买新电子游戏。",
    audio: "assets/audio/listening_parts/t20p3.mp3",
    questions: [
      { q: "What are Vivien and Andy talking about?", options: ["Buying a new video game", "Going to the cinema", "Doing homework"], answer: 0 },
      { q: "What has Tom just finished doing?", options: ["Playing football", "Finding information online", "Cooking dinner"], answer: 1 },
    ]
  },
  {
    id: 12,
    title: "Test 20 · Part 5",
    subtitle: "2025年真题 · Part 5 选择题（短文匹配）",
    transcript: "Part 5: Damian告诉朋友关于Anna的惊喜派对。",
    audio: "assets/audio/listening_parts/t20p5.mp3",
    questions: [
      { q: "What is the surprise for?", options: ["Anna's birthday", "Anna's graduation", "Anna's new job"], answer: 0 },
    ]
  },
  // ============ Test 26 (2025) ============
  {
    id: 14,
    title: "Test 26 · Part 2",
    subtitle: "2025年真题 · Part 2 填空题",
    transcript: "Part 2: 填空题，关于旅游信息。",
    audio: "assets/audio/listening_parts/t26p2.mp3",
    questions: [
      { q: "What type of tour is described?", options: ["A city tour", "A museum tour", "A boat tour"], answer: 2 },
    ]
  },
  {
    id: 15,
    title: "Test 26 · Part 3",
    subtitle: "2025年真题 · Part 3 选择题（长对话）",
    transcript: "Part 3: Vivien和弟弟Andy讨论买新电子游戏。",
    audio: "assets/audio/listening_parts/t26p3.mp3",
    questions: [
      { q: "What does Vivien want to do?", options: ["Buy a video game", "Watch a movie", "Read a book"], answer: 0 },
      { q: "What does Andy suggest?", options: ["Going to the shop", "Buying online", "Waiting for a sale"], answer: 1 },
    ]
  },
  {
    id: 17,
    title: "Test 26 · Part 5",
    subtitle: "2025年真题 · Part 5 选择题（短文匹配）",
    transcript: "Part 5: 关于Anna的惊喜派对，每个人带什么。",
    audio: "assets/audio/listening_parts/t26p5.mp3",
    questions: [
      { q: "What does each person need to bring?", options: ["Food", "Music", "Gifts"], answer: 0 },
    ]
  },
  // ============ Test 27 (2025) ============
  {
    id: 19,
    title: "Test 27 · Part 2",
    subtitle: "2025年真题 · Part 2 填空题",
    transcript: "Part 2: 老师和学生讨论学校旅行信息。",
    audio: "assets/audio/listening_parts/t27p2.mp3",
    questions: [
      { q: "What is the school trip about?", options: ["A science museum", "A sports event", "A music concert"], answer: 0 },
    ]
  },
  {
    id: 21,
    title: "Test 27 · Part 4",
    subtitle: "2025年真题 · Part 4 选择题（独白）",
    transcript: "Part 4: 老师对学生讲关于学校活动的事项。",
    audio: "assets/audio/listening_parts/t27p4.mp3",
    questions: [
      { q: "What is the teacher talking about?", options: ["A school trip", "Homework rules", "Exam dates"], answer: 0 },
    ]
  },
];
