// KET Speaking Practice - 口语训练数据
// 基于KET A2 Key for Schools口语考试格式

const KET_SPEAKING = {
  // Part 1: 考官提问 - 个人信息
  part1: {
    name: "Part 1",
    title: "考官提问 · 个人信息",
    instruction: "考官会问你6个问题，请大声用英语回答。点击🔊听问题，再点击🎤录音回答。",
    questions: [
      {
        q: "What's your name?",
        hint: "My name is...",
        model: "My name is Li Ming. You can call me Mingming.",
        category: "个人信息"
      },
      {
        q: "How old are you?",
        hint: "I'm... years old.",
        model: "I'm nine years old. I'll be ten in July.",
        category: "个人信息"
      },
      {
        q: "Where do you live?",
        hint: "I live in...",
        model: "I live in Wuqing, Tianjin. It's a nice place.",
        category: "个人信息"
      },
      {
        q: "What school do you go to?",
        hint: "I go to... School.",
        model: "I go to Wuqing Primary School. It's near my home.",
        category: "学校"
      },
      {
        q: "What's your favourite subject at school?",
        hint: "My favourite subject is...",
        model: "My favourite subject is English because I like reading stories.",
        category: "学校"
      },
      {
        q: "What do you do after school?",
        hint: "After school, I usually...",
        model: "After school, I usually do my homework first, then play with my friends.",
        category: "日常生活"
      },
      {
        q: "Tell me about your family.",
        hint: "There are... people in my family...",
        model: "There are four people in my family: my dad, my mom, my little sister and me.",
        category: "家庭"
      },
      {
        q: "What do you like doing at the weekend?",
        hint: "At the weekend, I like...",
        model: "At the weekend, I like playing football with my friends in the park.",
        category: "日常生活"
      },
      {
        q: "What's your favourite food?",
        hint: "My favourite food is...",
        model: "My favourite food is dumplings. My mom makes them every Sunday.",
        category: "兴趣爱好"
      },
      {
        q: "Can you describe your best friend?",
        hint: "My best friend is...",
        model: "My best friend is Tom. He's tall and funny. We play together every day.",
        category: "朋友"
      },
      {
        q: "What did you do yesterday?",
        hint: "Yesterday, I...",
        model: "Yesterday, I went to the park with my family. We had a picnic there.",
        category: "过去时态"
      },
      {
        q: "What are you going to do this weekend?",
        hint: "This weekend, I'm going to...",
        model: "This weekend, I'm going to visit my grandmother. I haven't seen her for a long time.",
        category: "将来时态"
      }
    ]
  },

  // Part 2: 看图描述 + 讨论
  part2: {
    name: "Part 2",
    title: "看图描述 · 讨论偏好",
    instruction: "看图片，描述你喜欢的和不喜欢的，并说明原因。然后和搭挡讨论。",
    topics: [
      {
        title: "Food 食物",
        emoji: "🍔",
        items: ["🍕 Pizza", "🍣 Sushi", "🥗 Salad", "🍜 Noodles", "🍔 Hamburger", "🍦 Ice cream"],
        questions: [
          "Which of these foods do you like? Why?",
          "Which of these foods don't you like? Why?",
          "What food do you eat most often?",
          "If you could only eat one food every day, what would it be?"
        ],
        modelAnswers: [
          "I really like pizza because it's delicious and you can share it with friends.",
          "I don't like salad because I think it's boring, but my mom says it's healthy.",
          "I eat noodles most often because my grandma makes them for breakfast.",
          "If I could only eat one food, I'd choose dumplings because they're my favourite."
        ]
      },
      {
        title: "Hobbies 爱好",
        emoji: "⚽",
        items: ["⚽ Football", "📚 Reading", "🎮 Games", "🎵 Music", "🏊 Swimming", "🎨 Drawing"],
        questions: [
          "Which of these hobbies do you enjoy? Why?",
          "Which hobby would you like to try?",
          "What do you do in your free time?",
          "Do you prefer indoor or outdoor activities?"
        ],
        modelAnswers: [
          "I enjoy playing football because it's exciting and I can play with my team.",
          "I'd like to try swimming because I love water and it's good exercise.",
          "In my free time, I read books or play games on my tablet.",
          "I prefer outdoor activities because I like fresh air and sunshine."
        ]
      },
      {
        title: "Places 地方",
        emoji: "🏖️",
        items: ["🏖️ Beach", "⛰️ Mountain", "🏛️ Museum", "Park 公园", "🏪 Supermarket", "🏟️ Stadium"],
        questions: [
          "Which place do you like going to? Why?",
          "Where do you go with your family at weekends?",
          "Which place would you like to visit?",
          "Where do you usually go after school?"
        ],
        modelAnswers: [
          "I like going to the park because I can run and play with my friends there.",
          "At weekends, my family usually goes to the supermarket to buy food for the week.",
          "I'd love to visit the beach because I can build sandcastles and swim in the sea.",
          "After school, I usually go straight home to do my homework."
        ]
      },
      {
        title: "Transport 交通",
        emoji: "✈️",
        items: ["🚗 Car", "🚌 Bus", "🚆 Train", "✈️ Plane", "🚲 Bike", "🚶 Walking"],
        questions: [
          "How do you usually go to school?",
          "Which type of transport do you like best? Why?",
          "Which transport is the fastest?",
          "Have you ever travelled by plane?"
        ],
        modelAnswers: [
          "I usually go to school by bus. It takes about twenty minutes.",
          "I like travelling by train best because I can look out of the window and read books.",
          "I think the plane is the fastest, but it's also the most expensive.",
          "Yes, I went to Hainan by plane last summer. It was exciting!"
        ]
      },
      {
        title: "Animals 动物",
        emoji: "🐶",
        items: ["🐶 Dog", "🐱 Cat", "🐰 Rabbit", "🐟 Fish", "🐦 Bird", "🐹 Hamster"],
        questions: [
          "Which animal would you like as a pet? Why?",
          "Do you have any pets at home?",
          "Which animal do you think is the most interesting?",
          "What animals can you see at the zoo?"
        ],
        modelAnswers: [
          "I'd like a dog because dogs are friendly and you can play with them.",
          "Yes, I have a goldfish. Its name is Goldie. I feed it every morning.",
          "I think elephants are the most interesting because they're so big and clever.",
          "At the zoo, I can see lions, monkeys, elephants, and many birds."
        ]
      },
      {
        title: "Weather & Seasons 天气与季节",
        emoji: "☀️",
        items: ["☀️ Hot", "🌧️ Rainy", "❄️ Snowy", "💨 Windy", "⛅ Cloudy", "🌤️ Warm"],
        questions: [
          "What's your favourite season? Why?",
          "What do you do on a rainy day?",
          "What's the weather like today?",
          "Which weather do you like best for playing outside?"
        ],
        modelAnswers: [
          "My favourite season is spring because the flowers are beautiful and the weather is warm.",
          "On a rainy day, I stay inside and read books or watch cartoons.",
          "Today it's sunny and warm. It's a great day for a picnic!",
          "I like sunny weather for playing outside because I can run and jump in the park."
        ]
      }
    ]
  },

  // 口语常用句型卡片
  usefulPhrases: [
    { phrase: "I like... because...", cn: "我喜欢...因为...", example: "I like reading because it's fun." },
    { phrase: "I don't like... because...", cn: "我不喜欢...因为...", example: "I don't like rainy days because I can't go out." },
    { phrase: "I prefer... to...", cn: "比起...我更喜欢...", example: "I prefer tea to coffee." },
    { phrase: "My favourite... is...", cn: "我最喜欢的...是...", example: "My favourite subject is Maths." },
    { phrase: "I usually...", cn: "我通常...", example: "I usually go to bed at nine." },
    { phrase: "I would like to...", cn: "我想要...", example: "I would like to visit Beijing." },
    { phrase: "I think...", cn: "我认为...", example: "I think English is very useful." },
    { phrase: "... is/are +形容词", cn: "...是...的", example: "Dogs are very friendly." },
    { phrase: "Can you say that again?", cn: "能再说一遍吗？", example: "Sorry, can you say that again?" },
    { phrase: "Let me think...", cn: "让我想想...", example: "Let me think... I like summer best." },
  ]
};
