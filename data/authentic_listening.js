// KET真题听力数据 - 来自YouTube下载的2024-2025真题
const AUTHENTIC_LISTENING = [
  {
    id: 1,
    title: 'KET真题听力 Test 1 (2024)',
    year: 2024,
    audio: 'assets/audio/authentic/KET_Test1_2024.mp3',
    subtitle: 'assets/audio/authentic/KET_Test1_2024.en.srt',
    duration: '约20分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 2,
    title: 'KET真题听力 Test 8 (2024)',
    year: 2024,
    audio: 'assets/audio/authentic/KET_Test8_2024.mp3',
    subtitle: 'assets/audio/authentic/KET_Test8_2024.en.srt',
    duration: '约25分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 3,
    title: 'KET真题听力 Test 20 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test20_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test20_2025.en.srt',
    duration: '约25分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 4,
    title: 'KET真题听力 Test 26 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test26_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test26_2025.en.srt',
    duration: '约20分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 5,
    title: 'KET真题听力 Test 27 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test27_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test27_2025.en.srt',
    duration: '约20分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 6,
    title: 'KET真题听力 Test 33 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test33_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test33_2025.en.srt',
    duration: '约22分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 7,
    title: 'KET真题听力 Test 34 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test34_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test34_2025.en.srt',
    duration: '约20分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 8,
    title: 'KET真题听力 Test 40 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Test40_2025.mp3',
    subtitle: 'assets/audio/authentic/KET_Test40_2025.en.srt',
    duration: '约20分钟',
    parts: [
      { name: 'Part 1', desc: '选择题 - 听短对话选图片', start: 0 },
      { name: 'Part 2', desc: '填空题 - 听对话填信息', start: 300 },
      { name: 'Part 3', desc: '选择题 - 听长对话', start: 600 },
      { name: 'Part 4', desc: '判断题 - 听独白判断正误', start: 900 },
      { name: 'Part 5', desc: '选择题 - 听短文', start: 1100 }
    ]
  },
  {
    id: 9,
    title: 'KET真题听力 完整版 Test 1 (2024)',
    year: 2024,
    audio: 'assets/audio/authentic/KET_Listening_Test1_2024.mp3',
    subtitle: null,
    duration: '约24分钟',
    parts: [
      { name: 'Full Test', desc: '完整听力考试', start: 0 }
    ]
  },
  {
    id: 10,
    title: 'KET真题听力 完整版 Test 18 (2025)',
    year: 2025,
    audio: 'assets/audio/authentic/KET_Listening_Test18_2025.mp3',
    subtitle: null,
    duration: '约39分钟',
    parts: [
      { name: 'Full Test', desc: '完整听力考试', start: 0 }
    ]
  }
];
