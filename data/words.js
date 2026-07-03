// KET 150 High-Frequency Words (A2 Level)
// Organized by 15 days, 10 words per day

const KET_WORDS = [
  // Day 1
  { day: 1, word: "airport", translation: "机场", pos: "n.", example: "We arrived at the airport early." },
  { day: 1, word: "backpack", translation: "背包", pos: "n.", example: "He put his books in his backpack." },
  { day: 1, word: "birthday", translation: "生日", pos: "n.", example: "Happy birthday to you!" },
  { day: 1, word: "boring", translation: "无聊的", pos: "adj.", example: "The film was very boring." },
  { day: 1, word: "camera", translation: "相机", pos: "n.", example: "She bought a new camera." },
  { day: 1, word: "celebrate", translation: "庆祝", pos: "v.", example: "We celebrate New Year together." },
  { day: 1, word: "cheap", translation: "便宜的", pos: "adj.", example: "This shirt is very cheap." },
  { day: 1, word: "choice", translation: "选择", pos: "n.", example: "You have two choices." },
  { day: 1, word: "comfortable", translation: "舒适的", pos: "adj.", example: "This sofa is comfortable." },
  { day: 1, word: "dangerous", translation: "危险的", pos: "adj.", example: "It is dangerous to cross the busy road." },

  // Day 2
  { day: 2, word: "decide", translation: "决定", pos: "v.", example: "I decide to study hard." },
  { day: 2, word: "delicious", translation: "美味的", pos: "adj.", example: "The cake is delicious." },
  { day: 2, word: "dictionary", translation: "词典", pos: "n.", example: "Use a dictionary to find new words." },
  { day: 2, word: "difficult", translation: "困难的", pos: "adj.", example: "This question is difficult." },
  { day: 2, word: "expensive", translation: "昂贵的", pos: "adj.", example: "That car is very expensive." },
  { day: 2, word: "favourite", translation: "最喜欢的", pos: "adj.", example: "My favourite color is blue." },
  { day: 2, word: "foreign", translation: "外国的", pos: "adj.", example: "He is a foreign student." },
  { day: 2, word: "friendly", translation: "友好的", pos: "adj.", example: "The people here are friendly." },
  { day: 2, word: "garden", translation: "花园", pos: "n.", example: "She works in the garden." },
  { day: 2, word: "handsome", translation: "英俊的", pos: "adj.", example: "He is a handsome boy." },

  // Day 3
  { day: 3, word: "hobby", translation: "爱好", pos: "n.", example: "My hobby is reading." },
  { day: 3, word: "holiday", translation: "假日", pos: "n.", example: "We go on holiday in summer." },
  { day: 3, word: "homework", translation: "作业", pos: "n.", example: "I do my homework every day." },
  { day: 3, word: "important", translation: "重要的", pos: "adj.", example: "English is very important." },
  { day: 3, word: "interesting", translation: "有趣的", pos: "adj.", example: "The book is interesting." },
  { day: 3, word: "invite", translation: "邀请", pos: "v.", example: "I invite my friends to my party." },
  { day: 3, word: "journey", translation: "旅程", pos: "n.", example: "The journey takes two hours." },
  { day: 3, word: "knowledge", translation: "知识", pos: "n.", example: "Knowledge is power." },
  { day: 3, word: "language", translation: "语言", pos: "n.", example: "English is a global language." },
  { day: 3, word: "letter", translation: "信", pos: "n.", example: "I wrote a letter to my friend." },

  // Day 4
  { day: 4, word: "library", translation: "图书馆", pos: "n.", example: "I study in the library." },
  { day: 4, word: "lonely", translation: "孤独的", pos: "adj.", example: "He feels lonely without friends." },
  { day: 4, word: "lovely", translation: "可爱的", pos: "adj.", example: "What a lovely day!" },
  { day: 4, word: "lucky", translation: "幸运的", pos: "adj.", example: "You are so lucky!" },
  { day: 4, word: "magazine", translation: "杂志", pos: "n.", example: "She reads a magazine." },
  { day: 4, word: "market", translation: "市场", pos: "n.", example: "We buy fruit at the market." },
  { day: 4, word: "medicine", translation: "药", pos: "n.", example: "Take this medicine after meals." },
  { day: 4, word: "meeting", translation: "会议", pos: "n.", example: "We have a meeting at 3 PM." },
  { day: 4, word: "mistake", translation: "错误", pos: "n.", example: "Everyone makes mistakes." },
  { day: 4, word: "mountain", translation: "山", pos: "n.", example: "They climbed the mountain." },

  // Day 5
  { day: 5, word: "museum", translation: "博物馆", pos: "n.", example: "The museum is open on Sunday." },
  { day: 5, word: "neighbour", translation: "邻居", pos: "n.", example: "My neighbour is very kind." },
  { day: 5, word: "nervous", translation: "紧张的", pos: "adj.", example: "She feels nervous before exams." },
  { day: 5, word: "occasion", translation: "场合", pos: "n.", example: "Birthday is a special occasion." },
  { day: 5, word: "passport", translation: "护照", pos: "n.", example: "Don't forget your passport." },
  { day: 5, word: "patient", translation: "有耐心的", pos: "adj.", example: "A good teacher is patient." },
  { day: 5, word: "picnic", translation: "野餐", pos: "n.", example: "We had a picnic in the park." },
  { day: 5, word: "pleasant", translation: "令人愉快的", pos: "adj.", example: "It is a pleasant trip." },
  { day: 5, word: "popular", translation: "受欢迎的", pos: "adj.", example: "Football is popular in China." },
  { day: 5, word: "practice", translation: "练习", pos: "v.", example: "Practice makes perfect." },

  // Day 6
  { day: 6, word: "present", translation: "礼物", pos: "n.", example: "I got a present from my mom." },
  { day: 6, word: "problem", translation: "问题", pos: "n.", example: "Can you solve this problem?" },
  { day: 6, word: "project", translation: "项目", pos: "n.", example: "Our science project won first prize." },
  { day: 6, word: "proud", translation: "骄傲的", pos: "adj.", example: "I am proud of my son." },
  { day: 6, word: "recipe", translation: "食谱", pos: "n.", example: "This is a great recipe for cake." },
  { day: 6, word: "remember", translation: "记得", pos: "v.", example: "Remember to lock the door." },
  { day: 6, word: "repair", translation: "修理", pos: "v.", example: "He can repair the bike." },
  { day: 6, word: "restaurant", translation: "餐厅", pos: "n.", example: "We eat at a restaurant." },
  { day: 6, word: "sandwich", translation: "三明治", pos: "n.", example: "I made a sandwich for lunch." },
  { day: 6, word: "schedule", translation: "时间表", pos: "n.", example: "Check the schedule for the train." },

  // Day 7
  { day: 7, word: "secret", translation: "秘密", pos: "n.", example: "Can you keep a secret?" },
  { day: 7, word: "serious", translation: "严肃的", pos: "adj.", example: "He is serious about his studies." },
  { day: 7, word: "skill", translation: "技能", pos: "n.", example: "Reading is an important skill." },
  { day: 7, word: "snowman", translation: "雪人", pos: "n.", example: "The children built a snowman." },
  { day: 7, word: "sometimes", translation: "有时", pos: "adv.", example: "Sometimes I walk to school." },
  { day: 7, word: "stadium", translation: "体育场", pos: "n.", example: "The concert is at the stadium." },
  { day: 7, word: "station", translation: "车站", pos: "n.", example: "I will meet you at the station." },
  { day: 7, word: "straight", translation: "直的", pos: "adj.", example: "Go straight ahead." },
  { day: 7, word: "subject", translation: "科目", pos: "n.", example: "Math is my favourite subject." },
  { day: 7, word: "successful", translation: "成功的", pos: "adj.", example: "It was a successful trip." },

  // Day 8
  { day: 8, word: "sunny", translation: "晴朗的", pos: "adj.", example: "It is a sunny day." },
  { day: 8, word: "surprise", translation: "惊喜", pos: "n.", example: "What a nice surprise!" },
  { day: 8, word: "swimming", translation: "游泳", pos: "n.", example: "I go swimming on weekends." },
  { day: 8, word: "terrible", translation: "可怕的", pos: "adj.", example: "The weather is terrible today." },
  { day: 8, word: "ticket", translation: "票", pos: "n.", example: "I bought two tickets for the film." },
  { day: 8, word: "together", translation: "一起", pos: "adv.", example: "Let's study together." },
  { day: 8, word: "tomorrow", translation: "明天", pos: "n.", example: "See you tomorrow." },
  { day: 8, word: "traditional", translation: "传统的", pos: "adj.", example: "Dumplings are traditional Chinese food." },
  { day: 8, word: "umbrella", translation: "雨伞", pos: "n.", example: "Take an umbrella, it may rain." },
  { day: 8, word: "useful", translation: "有用的", pos: "adj.", example: "This tool is very useful." },

  // Day 9
  { day: 9, word: "vacation", translation: "假期", pos: "n.", example: "Summer vacation is coming." },
  { day: 9, word: "vegetable", translation: "蔬菜", pos: "n.", example: "Eat more vegetables." },
  { day: 9, word: "visitor", translation: "访客", pos: "n.", example: "We have visitors tonight." },
  { day: 9, word: "weather", translation: "天气", pos: "n.", example: "The weather is nice today." },
  { day: 9, word: "weekend", translation: "周末", pos: "n.", example: "What do you do on weekends?" },
  { day: 9, word: "welcome", translation: "欢迎", pos: "adj.", example: "You are welcome to our home." },
  { day: 9, word: "wonderful", translation: "极好的", pos: "adj.", example: "We had a wonderful time." },
  { day: 9, word: "worried", translation: "担心的", pos: "adj.", example: "She is worried about the exam." },
  { day: 9, word: "imagine", translation: "想象", pos: "v.", example: "I can imagine the beautiful beach." },
  { day: 9, word: "improve", translation: "改善", pos: "v.", example: "I want to improve my English." },

  // Day 10
  { day: 10, word: "activity", translation: "活动", pos: "n.", example: "Swimming is a fun activity." },
  { day: 10, word: "appointment", translation: "预约", pos: "n.", example: "I have a doctor's appointment." },
  { day: 10, word: "available", translation: "可用的", pos: "adj.", example: "Are tickets available for tonight?" },
  { day: 10, word: "balcony", translation: "阳台", pos: "n.", example: "She has flowers on her balcony." },
  { day: 10, word: "biscuit", translation: "饼干", pos: "n.", example: "Would you like a biscuit?" },
  { day: 10, word: "blanket", translation: "毯子", pos: "n.", example: "It is cold, I need a blanket." },
  { day: 10, word: "bridge", translation: "桥", pos: "n.", example: "We walked across the bridge." },
  { day: 10, word: "business", translation: "生意", pos: "n.", example: "His business is growing fast." },
  { day: 10, word: "cathedral", translation: "大教堂", pos: "n.", example: "The cathedral is very old." },
  { day: 10, word: "centre", translation: "中心", pos: "n.", example: "We met at the shopping centre." },

  // Day 11
  { day: 11, word: "chemistry", translation: "化学", pos: "n.", example: "I like chemistry experiments." },
  { day: 11, word: "circle", translation: "圆圈", pos: "n.", example: "Draw a circle on the paper." },
  { day: 11, word: "coach", translation: "教练", pos: "n.", example: "Our coach trains us hard." },
  { day: 11, word: "coast", translation: "海岸", pos: "n.", example: "We spent a week on the coast." },
  { day: 11, word: "collection", translation: "收藏", pos: "n.", example: "He has a stamp collection." },
  { day: 11, word: "competition", translation: "比赛", pos: "n.", example: "She won the singing competition." },
  { day: 11, word: "concert", translation: "音乐会", pos: "n.", example: "We went to a concert last night." },
  { day: 11, word: "conversation", translation: "对话", pos: "n.", example: "We had a long conversation." },
  { day: 11, word: "crocodile", translation: "鳄鱼", pos: "n.", example: "Crocodiles live in rivers." },
  { day: 11, word: "decorate", translation: "装饰", pos: "v.", example: "We decorate the room for the party." },

  // Day 12
  { day: 12, word: "engineer", translation: "工程师", pos: "n.", example: "My father is an engineer." },
  { day: 12, word: "envelope", translation: "信封", pos: "n.", example: "Put the letter in the envelope." },
  { day: 12, word: "exercise", translation: "锻炼", pos: "n.", example: "Doing exercise keeps you healthy." },
  { day: 12, word: "factory", translation: "工厂", pos: "n.", example: "He works in a car factory." },
  { day: 12, word: "festival", translation: "节日", pos: "n.", example: "Spring Festival is my favourite." },
  { day: 12, word: "fireplace", translation: "壁炉", pos: "n.", example: "We sat by the fireplace." },
  { day: 12, word: "fisherman", translation: "渔夫", pos: "n.", example: "The fisherman caught a big fish." },
  { day: 12, word: "forest", translation: "森林", pos: "n.", example: "The forest is full of animals." },
  { day: 12, word: "generation", translation: "一代人", pos: "n.", example: "Young people are a new generation." },
  { day: 12, word: "geography", translation: "地理", pos: "n.", example: "Geography is about the world." },

  // Day 13
  { day: 13, word: "glad", translation: "高兴的", pos: "adj.", example: "I am glad to see you." },
  { day: 13, word: "gold", translation: "金子", pos: "n.", example: "She wears a gold ring." },
  { day: 13, word: "ground", translation: "地面", pos: "n.", example: "The ball is on the ground." },
  { day: 13, word: "guide", translation: "导游", pos: "n.", example: "The guide showed us the museum." },
  { day: 13, word: "healthy", translation: "健康的", pos: "adj.", example: "Eat healthy food every day." },
  { day: 13, word: "history", translation: "历史", pos: "n.", example: "I like reading history books." },
  { day: 13, word: "honest", translation: "诚实的", pos: "adj.", example: "He is an honest boy." },
  { day: 13, word: "island", translation: "岛屿", pos: "n.", example: "We visited a beautiful island." },
  { day: 13, word: "king", translation: "国王", pos: "n.", example: "The king lived in a castle." },
  { day: 13, word: "kitchen", translation: "厨房", pos: "n.", example: "Mom is cooking in the kitchen." },

  // Day 14
  { day: 14, word: "laboratory", translation: "实验室", pos: "n.", example: "We did experiments in the laboratory." },
  { day: 14, word: "landscape", translation: "风景", pos: "n.", example: "The landscape here is beautiful." },
  { day: 14, word: "machine", translation: "机器", pos: "n.", example: "This machine makes coffee." },
  { day: 14, word: "manager", translation: "经理", pos: "n.", example: "The manager helps the team." },
  { day: 14, word: "middle", translation: "中间的", pos: "adj.", example: "He sits in the middle of the class." },
  { day: 14, word: "monkey", translation: "猴子", pos: "n.", example: "The monkey climbed the tree." },
  { day: 14, word: "narrow", translation: "狭窄的", pos: "adj.", example: "This street is very narrow." },
  { day: 14, word: "ocean", translation: "海洋", pos: "n.", example: "The ocean is deep and blue." },
  { day: 14, word: "offer", translation: "提供", pos: "v.", example: "They offer free breakfast." },
  { day: 14, word: "outside", translation: "外面", pos: "adv.", example: "The children are playing outside." },

  // Day 15
  { day: 15, word: "phrase", translation: "短语", pos: "n.", example: "Learn five new phrases today." },
  { day: 15, word: "pianist", translation: "钢琴家", pos: "n.", example: "She is a famous pianist." },
  { day: 15, word: "playground", translation: "操场", pos: "n.", example: "Kids play on the playground." },
  { day: 15, word: "protect", translation: "保护", pos: "v.", example: "We should protect the environment." },
  { day: 15, word: "quickly", translation: "快速地", pos: "adv.", example: "He finished his homework quickly." },
  { day: 15, word: "realize", translation: "意识到", pos: "v.", example: "I realize English is important." },
  { day: 15, word: "recommend", translation: "推荐", pos: "v.", example: "Can you recommend a good book?" },
  { day: 15, word: "scenery", translation: "景色", pos: "n.", example: "The mountain scenery is amazing." },
  { day: 15, word: "treasure", translation: "宝藏", pos: "n.", example: "The pirates found a treasure." },
  { day: 15, word: "volunteer", translation: "志愿者", pos: "n.", example: "She works as a volunteer." },
];

if (typeof window !== 'undefined') {
  window.KET_WORDS = KET_WORDS;
}
