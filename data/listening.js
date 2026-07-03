// KET真题听力 - 2024-2025原版音频切分
// 共30个听力练习，来自8套真题

const KET_LISTENING = [
  {
    id: 1,
    title: "Test 1 · Part 1",
    subtitle: "2024年真题 · 选择题（图片匹配）",
    transcript: "Test 1 Part 1 真题听力",
    audio: "assets/audio/listening_parts/t1p1.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 1，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 2,
    title: "Test 1 · Part 2",
    subtitle: "2024年真题 · 填空题（信息匹配）",
    transcript: "two for each Quest question write the two for each Quest question write the correct answer in the Gap write one word correct answer in the Gap write one word correct answer in the Gap write one word or a number or a date or a or a number or a date or a or a number or a date or a time look at questions 6 to 10 time look at questions 6 to 10 time look at questions 6 to 10 now you have 10 seconds you will hear a woman talking to seconds you will hear a woman talking to a group of students about the",
    audio: "assets/audio/listening_parts/t1p2.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 3,
    title: "Test 1 · Part 3",
    subtitle: "2024年真题 · 选择题（长对话）",
    transcript: "three for each question choose the three for each question choose the correct correct correct answer look at questions 11 to 15 now answer look at questions 11 to 15 now answer look at questions 11 to 15 now you have 20 seconds you will hear Jane talking to seconds you will hear Jane talking to her friend David about going to the her friend David about going to the her friend David about going to the cinema hi David cinema hi David cinema hi David have you got any plans for this evening have you",
    audio: "assets/audio/listening_parts/t1p3.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 4,
    title: "Test 1 · Part 4",
    subtitle: "2024年真题 · 选择题（独白）",
    transcript: "four for each question choose the four for each question choose the correct correct correct answer answer answer 16 you will hear a woman talking to her 16 you will hear a woman talking to her 16 you will hear a woman talking to her friend about a meal at a restaurant friend about a meal at a restaurant friend about a meal at a restaurant what did she what did she what did she eat did you enjoy your meal last night M eat did you enjoy your meal last night M eat did you enjoy your meal last night",
    audio: "assets/audio/listening_parts/t1p4.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 5,
    title: "Test 1 · Part 5",
    subtitle: "2024年真题 · 选择题（短文匹配）",
    transcript: "question choose the correct question choose the correct answer look at questions 21 to 25 now answer look at questions 21 to 25 now answer look at questions 21 to 25 now you have 15 seconds you will hear Greta talking to Anthony you will hear Greta talking to Anthony about about about holidays what type of holiday will each holidays what type of holiday will each holidays what type of holiday will each person go person go person go on hello Anthony are you getting ready on hello Anthony are you ",
    audio: "assets/audio/listening_parts/t1p5.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 6,
    title: "Test 8 · Part 1",
    subtitle: "2024年真题 · 选择题（图片匹配）",
    transcript: "two for each question write the correct two for each question write the correct answer in the answer in the answer in the Gap write one word or a number Gap write one word or a number Gap write one word or a number or a date or a or a date or a or a date or a time look at questions 6 to 10 time look at questions 6 to 10 time look at questions 6 to 10 now you have 10 seconds you will hear a phone message seconds you will hear a phone message about going to play a hockey about going to play a hock",
    audio: "assets/audio/listening_parts/t8p1.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 1，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 7,
    title: "Test 8 · Part 2",
    subtitle: "2024年真题 · 填空题（信息匹配）",
    transcript: "Test 8 Part 2 真题听力",
    audio: "assets/audio/listening_parts/t8p2.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 8,
    title: "Test 8 · Part 3",
    subtitle: "2024年真题 · 选择题（长对话）",
    transcript: "for each question choose the correct for each question choose the correct answer look at questions 11 to 15 answer look at questions 11 to 15 answer look at questions 11 to 15 now you have 20 seconds you will hear Sue talking to her friend you will hear Sue talking to her friend Peter about a restaurant she went Peter about a restaurant she went Peter about a restaurant she went to it's a pity you couldn't come to the to it's a pity you couldn't come to the to it's a pity you couldn't come to th",
    audio: "assets/audio/listening_parts/t8p3.mp3",
    questions: [
      { q: "这是2024年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 9,
    title: "Test 20 · Part 2",
    subtitle: "2025年真题 · 填空题（信息匹配）",
    transcript: "Test 20 Part 2 真题听力",
    audio: "assets/audio/listening_parts/t20p2.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 10,
    title: "Test 20 · Part 3",
    subtitle: "2025年真题 · 选择题（长对话）",
    transcript: "three for each question choose the three for each question choose the correct correct correct answer look at questions 11 to 15 now answer look at questions 11 to 15 now answer look at questions 11 to 15 now you have 20 seconds you will hear Vivien talking to her you will hear Vivien talking to her brother Andy about buying a new video brother Andy about buying a new video brother Andy about buying a new video game hi Vivien hi Andy do you want some game hi Vivien hi Andy do you want some game h",
    audio: "assets/audio/listening_parts/t20p3.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 11,
    title: "Test 20 · Part 4",
    subtitle: "2025年真题 · 选择题（独白）",
    transcript: "Test 20 Part 4 真题听力",
    audio: "assets/audio/listening_parts/t20p4.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 12,
    title: "Test 20 · Part 5",
    subtitle: "2025年真题 · 选择题（短文匹配）",
    transcript: "two for each question write the correct two for each question write the correct answer in the Gap write one word or a answer in the Gap write one word or a answer in the Gap write one word or a number or a date or a time look at number or a date or a time look at number or a date or a time look at questions 6 to 10 now you have 10 seconds you will hear Damian telling his seconds you will hear Damian telling his friend about Anna's surprise party hi it's Damian here sorry I didn't party hi it's D",
    audio: "assets/audio/listening_parts/t20p5.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 13,
    title: "Test 26 · Part 1",
    subtitle: "2025年真题 · 选择题（图片匹配）",
    transcript: "Test 26 Part 1 真题听力",
    audio: "assets/audio/listening_parts/t26p1.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 1，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 14,
    title: "Test 26 · Part 2",
    subtitle: "2025年真题 · 填空题（信息匹配）",
    transcript: "Test 26 Part 2 真题听力",
    audio: "assets/audio/listening_parts/t26p2.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 15,
    title: "Test 26 · Part 3",
    subtitle: "2025年真题 · 选择题（长对话）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. Look at questions 11 to 15. Now answer. Look at questions 11 to 15. Now answer. Look at questions 11 to 15. Now you have 20 seconds. You will hear Vivian talking to her You will hear Vivian talking to her brother Andy about buying a new video brother Andy about buying a new video brother Andy about buying a new video game. game. game. Hi Vivian. Hi Andy. Do you want some of Hi Vivian. Hi Andy. Do you want some of",
    audio: "assets/audio/listening_parts/t26p3.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 16,
    title: "Test 26 · Part 4",
    subtitle: "2025年真题 · 选择题（独白）",
    transcript: "Test 26 Part 4 真题听力",
    audio: "assets/audio/listening_parts/t26p4.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 17,
    title: "Test 26 · Part 5",
    subtitle: "2025年真题 · 选择题（短文匹配）",
    transcript: "For each question, write the correct For each question, write the correct answer in the gap. Write one word or a answer in the gap. Write one word or a answer in the gap. Write one word or a number or a date or a number or a date or a number or a date or a time. Look at questions 6 to 10. Now you time. Look at questions 6 to 10. Now you time. Look at questions 6 to 10. Now you have 10 seconds. You will hear Damian telling his friend You will hear Damian telling his friend about Anna's surprise p",
    audio: "assets/audio/listening_parts/t26p5.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 18,
    title: "Test 27 · Part 1",
    subtitle: "2025年真题 · 选择题（图片匹配）",
    transcript: "Test 27 Part 1 真题听力",
    audio: "assets/audio/listening_parts/t27p1.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 1，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 19,
    title: "Test 27 · Part 2",
    subtitle: "2025年真题 · 填空题（信息匹配）",
    transcript: "Test 27 Part 2 真题听力",
    audio: "assets/audio/listening_parts/t27p2.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 20,
    title: "Test 27 · Part 3",
    subtitle: "2025年真题 · 选择题（长对话）",
    transcript: "Test 27 Part 3 真题听力",
    audio: "assets/audio/listening_parts/t27p3.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 21,
    title: "Test 27 · Part 4",
    subtitle: "2025年真题 · 选择题（独白）",
    transcript: "For each question, write the correct For each question, write the correct answer in the gap. Write one word or a answer in the gap. Write one word or a answer in the gap. Write one word or a number or a date or a time. Look at number or a date or a time. Look at number or a date or a time. Look at questions 6 to 10. Now you have 10 questions 6 to 10. Now you have 10 questions 6 to 10. Now you have 10 seconds. You will hear a teacher talking to a You will hear a teacher talking to a group of stud",
    audio: "assets/audio/listening_parts/t27p4.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 22,
    title: "Test 27 · Part 5",
    subtitle: "2025年真题 · 选择题（短文匹配）",
    transcript: "five. For each question, choose the five. For each question, choose the correct answer. Look at questions 21 to correct answer. Look at questions 21 to correct answer. Look at questions 21 to 25. Now you have 15 seconds. You will hear Tess talking to a friend You will hear Tess talking to a friend about the things her family enjoy about the things her family enjoy about the things her family enjoy reading. What does each person enjoy reading. What does each person enjoy reading. What does each p",
    audio: "assets/audio/listening_parts/t27p5.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 23,
    title: "Test 34 · Part 2",
    subtitle: "2025年真题 · 填空题（信息匹配）",
    transcript: "For each question, write the correct For each question, write the correct answer in the gap. Write one word or a answer in the gap. Write one word or a answer in the gap. Write one word or a number or a date or a time. Look at number or a date or a time. Look at number or a date or a time. Look at questions 6 to 10. Now you have 10 questions 6 to 10. Now you have 10 questions 6 to 10. Now you have 10 seconds. You will hear a teacher talking to You will hear a teacher talking to pupils about a sc",
    audio: "assets/audio/listening_parts/t34p2.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 24,
    title: "Test 34 · Part 3",
    subtitle: "2025年真题 · 选择题（长对话）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. answer. answer. Look at questions 11 to 15. Now you have Look at questions 11 to 15. Now you have Look at questions 11 to 15. Now you have 20 seconds. You will hear two friends talking about You will hear two friends talking about their chess club. their chess club. their chess club. >> I'm glad our teacher told us about chess >> I'm glad our teacher told us about chess >> I'm glad our teacher told us about chess",
    audio: "assets/audio/listening_parts/t34p3.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 25,
    title: "Test 34 · Part 4",
    subtitle: "2025年真题 · 选择题（独白）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. 16. 16. You will hear a brother and sister You will hear a brother and sister You will hear a brother and sister talking. talking. talking. What does the girl want the boy to do? What does the girl want the boy to do? What does the girl want the boy to do? >> I'm hungry. Shall we ask mom if we can >> I'm hungry. Shall we ask mom if we can >> I'm hungry. Shall we ask mom if we can have a pizza? have a pizza? have ",
    audio: "assets/audio/listening_parts/t34p4.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 26,
    title: "Test 34 · Part 5",
    subtitle: "2025年真题 · 选择题（短文匹配）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. answer. answer. Look at questions 21 to 25. Now you have Look at questions 21 to 25. Now you have Look at questions 21 to 25. Now you have 15 seconds. You will hear a boy telling his sister You will hear a boy telling his sister about the activities his friends did at about the activities his friends did at about the activities his friends did at the weekend. the weekend. the weekend. What activity did each frien",
    audio: "assets/audio/listening_parts/t34p5.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 27,
    title: "Test 40 · Part 2",
    subtitle: "2025年真题 · 填空题（信息匹配）",
    transcript: "For each question, write the correct For each question, write the correct answer in the gap. answer in the gap. answer in the gap. Write one word or a number or a date or Write one word or a number or a date or Write one word or a number or a date or a time. a time. a time. Look at questions 6 to 10 now. Look at questions 6 to 10 now. Look at questions 6 to 10 now. You have 10 seconds. You will hear a tour guide talking about You will hear a tour guide talking about a boat tour in Venice. a boat",
    audio: "assets/audio/listening_parts/t40p2.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 2，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 28,
    title: "Test 40 · Part 3",
    subtitle: "2025年真题 · 选择题（长对话）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. answer. answer. Look at questions 11 to 15 now. Look at questions 11 to 15 now. Look at questions 11 to 15 now. You have 20 seconds. You will hear Lisa talking to her friend You will hear Lisa talking to her friend Robin about finding a place to live. Robin about finding a place to live. Robin about finding a place to live. >> Where are you going to live while you're >> Where are you going to live while you're >>",
    audio: "assets/audio/listening_parts/t40p3.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 3，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 29,
    title: "Test 40 · Part 4",
    subtitle: "2025年真题 · 选择题（独白）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. answer. 16 You will hear two friends talking about You will hear two friends talking about You will hear two friends talking about the weather. the weather. the weather. What is the weather going to be like What is the weather going to be like What is the weather going to be like tomorrow? tomorrow? tomorrow? >> Do you think it will be warmer tomorrow? >> Do you think it will be warmer tomorrow? >> Do you think i",
    audio: "assets/audio/listening_parts/t40p4.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 4，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
  {
    id: 30,
    title: "Test 40 · Part 5",
    subtitle: "2025年真题 · 选择题（短文匹配）",
    transcript: "For each question, choose the correct For each question, choose the correct answer. answer. answer. Look at questions 21 to 25 now. Look at questions 21 to 25 now. Look at questions 21 to 25 now. You have 15 seconds. You will hear Charlie talking to his You will hear Charlie talking to his friend Evie about visiting his family. friend Evie about visiting his family. friend Evie about visiting his family. What gift did he buy for each person? What gift did he buy for each person? What gift did he",
    audio: "assets/audio/listening_parts/t40p5.mp3",
    questions: [
      { q: "这是2025年KET真题听力Part 5，请认真听音频后回答问题", options: ["听完音频后在下方查看原文对照", "重复听直到完全理解", "跟读模仿发音", "以上都对"], answer: 3 },
    ]
  },
];
