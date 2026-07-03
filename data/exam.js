// KET Exam Questions - 60+ questions following 2020 revised format
// Organized by day of week

const KET_EXAM = {
  // Monday: Reading Part 1 (Short messages / notices) - 10 questions
  monday: {
    part: "Reading Part 1",
    title: "短消息理解 / Short Messages",
    instruction: "Read each notice/message and choose the correct answer (A, B, or C).",
    questions: [
      {
        text: "NOTICE: The library will be closed on Monday, May 15th for repairs. It will reopen on Tuesday at 9 AM.",
        q: "When will the library reopen?",
        options: ["Monday afternoon", "Tuesday at 9 AM", "Monday at 9 AM"],
        answer: 1
      },
      {
        text: "From: Mom — Remember to buy milk and bread on your way home. We need them for dinner tonight.",
        q: "What does Mom want?",
        options: ["Buy milk and bread", "Come home early", "Cook dinner"],
        answer: 0
      },
      {
        text: "TEXT MESSAGE: Hi Sam, football practice is cancelled today because of the rain. See you tomorrow! — Coach",
        q: "Why is football practice cancelled?",
        options: ["Sam is sick", "It's raining", "The coach is busy"],
        answer: 1
      },
      {
        text: "SHOP NOTICE: Buy one pair of shoes, get the second pair at half price! Offer ends this Sunday.",
        q: "What is the offer?",
        options: ["All shoes half price", "Second pair half price", "Free shoes on Sunday"],
        answer: 1
      },
      {
        text: "EMAIL: Dear students, the school trip to the museum will be on Friday, June 10th. Please bring 50 yuan for the ticket. — Mr. Lee",
        q: "How much should students bring?",
        options: ["40 yuan", "50 yuan", "60 yuan"],
        answer: 1
      },
      {
        text: "SIGN at a restaurant: Please wait to be seated. No smoking inside. Thank you!",
        q: "What should customers do?",
        options: ["Sit anywhere they like", "Wait to be seated", "Smoke outside the door"],
        answer: 1
      },
      {
        text: "From: Teacher — Don't forget your science project is due this Friday. Please bring it to Room 201 before 3 PM.",
        q: "When is the project due?",
        options: ["This Monday", "This Wednesday", "This Friday"],
        answer: 2
      },
      {
        text: "TRAIN STATION: The 9:30 train to Nanjing is delayed by 30 minutes. New departure time: 10:00 AM.",
        q: "What is the new departure time?",
        options: ["9:30 AM", "10:00 AM", "10:30 AM"],
        answer: 1
      },
      {
        text: "POSTER: Summer Swimming Classes! Every Saturday from July 1st. Beginners: 9-10 AM. Price: 200 yuan/month.",
        q: "When are beginner classes?",
        options: ["Every Saturday 9-10 AM", "Every Sunday 9-10 AM", "Every Saturday 10-11 AM"],
        answer: 0
      },
      {
        text: "NOTE on fridge: There's pasta in the fridge. Just heat it up for 2 minutes. I'll be home by 7. — Dad",
        q: "What should the reader do?",
        options: ["Cook pasta from scratch", "Heat the pasta for 2 minutes", "Wait for Dad to cook"],
        answer: 1
      },
    ]
  },

  // Tuesday: Reading Part 2 (Matching) - 10 questions
  tuesday: {
    part: "Reading Part 2",
    title: "匹配题 / Matching",
    instruction: "Match each person to the best activity/place. Choose the correct option.",
    questions: [
      {
        text: "Tom loves animals and wants to see some baby ones. Where should he go?",
        options: ["The art museum", "The city zoo", "The sports centre"],
        answer: 1
      },
      {
        text: "Lisa wants to buy a present for her friend who loves reading. Where should she go?",
        options: ["The bookshop", "The bakery", "The toy shop"],
        answer: 0
      },
      {
        text: "Kevin wants to play basketball with his friends on Saturday. Where should he go?",
        options: ["The library", "The sports centre", "The cinema"],
        answer: 1
      },
      {
        text: "Amy is looking for a quiet place to study for her exam. Where should she go?",
        options: ["The shopping mall", "The park", "The library"],
        answer: 2
      },
      {
        text: "David wants to watch a new film this weekend. Where should he go?",
        options: ["The cinema", "The concert hall", "The museum"],
        answer: 0
      },
      {
        text: "Emma wants to eat some Italian food for dinner. Where should she go?",
        options: ["The Chinese restaurant", "The Italian restaurant", "The fast food shop"],
        answer: 1
      },
      {
        text: "Jack wants to buy fresh fruit and vegetables. Where should he go?",
        options: ["The supermarket", "The clothes shop", "The bookshop"],
        answer: 0
      },
      {
        text: "Mary wants to learn to swim. Where should she go?",
        options: ["The skating rink", "The swimming pool", "The tennis court"],
        answer: 1
      },
      {
        text: "Peter wants to get a haircut before his sister's wedding. Where should he go?",
        options: ["The barbershop", "The flower shop", "The shoe shop"],
        answer: 0
      },
      {
        text: "Sara wants to send a birthday card to her grandmother. Where should she go?",
        options: ["The post office", "The bank", "The pharmacy"],
        answer: 0
      },
    ]
  },

  // Wednesday: Reading Part 3 (Long text + multiple choice) - 10 questions
  wednesday: {
    part: "Reading Part 3",
    title: "长文章理解 / Long Reading",
    instruction: "Read the passage carefully and answer the questions.",
    questions: [
      {
        text: "My cousin Anna is 12 years old. She lives in a small town called Woodfield. Every morning, she walks to school with her friend Bella. The school is about 15 minutes from her house. Anna's favourite subjects are Art and Music. She is very good at drawing pictures of animals. On Saturdays, she goes to an art class in the town centre. Her teacher, Mrs. Potter, says Anna has a special talent. On Sundays, Anna visits her grandmother. They bake cakes together and talk about school.\n\nQ: How old is Anna?",
        options: ["10", "11", "12"],
        answer: 2
      },
      {
        text: "(Same passage) How does Anna go to school?",
        options: ["By bus", "By bike", "On foot"],
        answer: 2
      },
      {
        text: "(Same passage) How long does it take to walk to school?",
        options: ["10 minutes", "15 minutes", "20 minutes"],
        answer: 1
      },
      {
        text: "(Same passage) What are Anna's favourite subjects?",
        options: ["Math and English", "Art and Music", "Science and History"],
        answer: 1
      },
      {
        text: "(Same passage) What does Anna do on Saturdays?",
        options: ["Visits her grandmother", "Goes to art class", "Plays with Bella"],
        answer: 1
      },
      {
        text: "Our town has a new community centre! It opened last month next to the park. It has a gym, a swimming pool, and a cafe. Anyone can become a member for just 100 yuan a year. The gym is open from 6 AM to 10 PM. The swimming pool has special times for children: 3-5 PM on weekdays and 9-11 AM on weekends. The cafe sells healthy food and drinks. Every Friday evening, there is a free movie night for members.\n\nQ: Where is the community centre?",
        options: ["Next to the school", "Next to the park", "In the city centre"],
        answer: 1
      },
      {
        text: "(Same passage) How much is membership per year?",
        options: ["50 yuan", "100 yuan", "200 yuan"],
        answer: 1
      },
      {
        text: "(Same passage) When can children use the pool on weekends?",
        options: ["3-5 PM", "6-8 AM", "9-11 AM"],
        answer: 2
      },
      {
        text: "(Same passage) What happens every Friday evening?",
        options: ["Free swimming", "Free movie night", "Free cooking class"],
        answer: 1
      },
      {
        text: "(Same passage) What does the cafe sell?",
        options: ["Fast food", "Healthy food and drinks", "Only drinks"],
        answer: 1
      },
    ]
  },

  // Thursday: Reading Part 4-5 (Cloze & word completion) - 10 questions
  thursday: {
    part: "Reading Part 4-5",
    title: "完形填空 + 填词 / Cloze & Word Fill",
    instruction: "Choose the best word to complete each sentence.",
    questions: [
      {
        text: "I usually ___ up at 7 o'clock in the morning.",
        options: ["get", "go", "take", "make"],
        answer: 0
      },
      {
        text: "My sister is very good ___ playing the piano.",
        options: ["in", "at", "on", "for"],
        answer: 1
      },
      {
        text: "We ___ a great time at the party last night.",
        options: ["did", "made", "had", "took"],
        answer: 2
      },
      {
        text: "Can you ___ me the way to the post office?",
        options: ["say", "tell", "speak", "talk"],
        answer: 1
      },
      {
        text: "There aren't ___ apples in the fridge. We need to buy some.",
        options: ["some", "much", "any", "a"],
        answer: 2
      },
      {
        text: "This book is ___ than the one I read last week.",
        options: ["interesting", "more interesting", "most interesting", "interestinger"],
        answer: 1
      },
      {
        text: "Complete: C_M_U_E_ (a place to eat at school)",
        type: "fill",
        answer: "CANTEEN",
        hint: "You eat lunch here at school"
      },
      {
        text: "Complete: _E_I_IB_T_O_ (a public show of things)",
        type: "fill",
        answer: "EXHIBITION",
        hint: "You see art or interesting things here"
      },
      {
        text: "Complete: _A_U_A_E (words that people speak)",
        type: "fill",
        answer: "LANGUAGE",
        hint: "English is one of these"
      },
      {
        text: "Complete: _O_ID_Y (a celebration or special day)",
        type: "fill",
        answer: "HOLIDAY",
        hint: "A time when you don't go to school or work",
      },
    ]
  },

  // Friday: Writing Part 6 (Short writing) - 10 questions
  friday: {
    part: "Writing Part 6",
    title: "写作练习 / Writing Practice",
    instruction: "Write a short message (25+ words) based on the situation. Then self-check using the checklist.",
    questions: [
      {
        prompt: "Write an email to your English friend. Tell them: \n• What you did last weekend \n• What you plan to do next weekend \n• Ask what they are going to do",
        model: "Hi Tom,\nLast weekend I went to the park with my family. We had a picnic and played games. Next weekend, I'm going to visit the science museum. What are you going to do next weekend? Write back soon!\nBest wishes,\n___",
        keywords: ["went", "weekend", "going to", "what about you"]
      },
      {
        prompt: "Write a note to your mom. Tell her: \n• You have gone to the library \n• You will be back at 5 PM \n• Ask her to leave dinner for you",
        model: "Dear Mom,\nI have gone to the library to study with my friends. I will be back home at 5 PM. Could you please leave some dinner for me? I'll see you later!\nLove,\n___",
        keywords: ["library", "5 PM", "dinner"]
      },
      {
        prompt: "Write a message to your teacher. Say: \n• You are sick today \n• You cannot come to class \n• You will bring a note from your parents tomorrow",
        model: "Dear Mr. Lee,\nI am feeling sick today and I cannot come to class. I have a fever and a sore throat. I will bring a note from my parents tomorrow. Thank you for understanding.\nBest regards,\n___",
        keywords: ["sick", "cannot come", "note", "tomorrow"]
      },
      {
        prompt: "Write a postcard to your friend from your holiday. Tell them: \n• Where you are \n• What the weather is like \n• What you did yesterday",
        model: "Hi Lisa!\nI'm writing from Sanya! The weather is hot and sunny here. Yesterday, I went swimming in the sea and built a sandcastle. The food is delicious too. I wish you were here!\nFrom,\n___",
        keywords: ["Sanya", "hot", "swimming"]
      },
      {
        prompt: "Write an invitation to your birthday party. Include: \n• When and where the party is \n• What activities there will be \n• Ask them to come",
        model: "Dear friend,\nYou are invited to my birthday party! It's on Saturday, July 15th, at 3 PM. My house is at 25 Apple Street. We will play games, eat cake, and watch a movie. Please come and join the fun!\nFrom,\n___",
        keywords: ["Saturday", "3 PM", "party", "games"]
      },
      {
        prompt: "Write a thank-you email. Tell your friend: \n• Thank you for the present \n• What you like about it \n• How you will use it",
        model: "Hi Amy,\nThank you so much for the beautiful notebook! I really love the cover with the stars on it. I'm going to use it to write my English diary every day. It was the best present ever!\nBest wishes,\n___",
        keywords: ["thank you", "notebook", "use"]
      },
      {
        prompt: "Write a notice for your school. Tell students: \n• There will be a book sale \n• When and where it is \n• Why they should come",
        model: "BOOK SALE!\nCome to the school library on Friday, May 20th! There will be hundreds of great books at amazing prices — from 5 yuan each! All money goes to help children in need. Don't miss it!",
        keywords: ["book sale", "Friday", "library"]
      },
      {
        prompt: "Write a message to your pen pal in England. Tell them: \n• About your city \n• What subjects you study at school \n• Ask about their life in England",
        model: "Dear pen pal,\nI live in Beijing, a big and busy city in northern China. At school, I study Chinese, Math, English, Science, and Art. My favourite subject is English! What is it like living in England? What do you study?\nBest wishes,\n___",
        keywords: ["Beijing", "school", "England"]
      },
      {
        prompt: "Write a diary entry about your day. Include: \n• What you did in the morning \n• Something fun that happened \n• How you feel now",
        model: "Dear Diary,\nToday was a great day! In the morning, I had English class and got an A+ on my test. At lunch, my friend told me a really funny joke. After school, I played football with my team and we won 3-1! I feel so happy and tired now. Good night!",
        keywords: ["morning", "fun", "feel"]
      },
      {
        prompt: "Write directions to your house. Start from the school. Include: \n• Which way to go first \n• What to look for \n• How long it takes",
        model: "Directions to my house:\nFrom the school gate, turn left and walk along Apple Street. Go past the supermarket, then turn right at the park. My house is the blue one next to the big tree. It takes about 10 minutes to walk. See you soon!",
        keywords: ["turn", "street", "minutes"]
      },
    ]
  },

  // Saturday: Listening comprehension practice (uses listening data)
  saturday: {
    part: "Listening Practice",
    title: "听力综合模拟 / Listening Mock Test",
    instruction: "Listen to the audio and answer the questions. Use the audio player to replay if needed.",
    type: "listening",
    questions: [] // Will pull from KET_LISTENING dynamically
  },

  // Sunday: Full comprehensive mock exam
  sunday: {
    part: "Full Mock Exam",
    title: "全套综合模拟 / Full Comprehensive Mock",
    instruction: "Complete all sections for a full KET practice!",
    type: "mixed",
    questions: [
      {
        section: "Reading Part 1",
        text: "NOTICE: Swimming pool closed for cleaning every first Monday of the month.",
        q: "When is the pool closed?",
        options: ["Every Monday", "First Monday of the month", "Every weekend"],
        answer: 1
      },
      {
        section: "Reading Part 1",
        text: "From: Dad — Can you feed the cat when you get home? I'll be late tonight.",
        q: "What does Dad want?",
        options: ["Feed the cat", "Cook dinner", "Come home early"],
        answer: 0
      },
      {
        section: "Reading Part 2",
        text: "Sarah wants to find a quiet place to read books.",
        q: "Where should she go?",
        options: ["The cinema", "The library", "The playground"],
        answer: 1
      },
      {
        section: "Reading Part 3",
        text: "Mark is a 13-year-old boy from Manchester. He loves football and supports Manchester United. He plays football every Tuesday and Thursday after school. His dream is to be a professional football player. Mark also enjoys reading books about famous players. His favourite book is about David Beckham. On weekends, he watches football on TV with his dad.\n\nQ: What does Mark want to be?",
        options: ["A teacher", "A football player", "A writer"],
        answer: 1
      },
      {
        section: "Reading Part 3",
        text: "(Same passage) How often does Mark play football?",
        options: ["Once a week", "Twice a week", "Every day"],
        answer: 1
      },
      {
        section: "Reading Part 4",
        text: "She ___ to school by bus every day.",
        options: ["goes", "going", "go", "went"],
        answer: 0
      },
      {
        section: "Reading Part 4",
        text: "I have lived here ___ 2018.",
        options: ["for", "since", "from", "in"],
        answer: 1
      },
      {
        section: "Reading Part 5 (Fill)",
        text: "Complete: S_U_E_T (a person who studies)",
        type: "fill",
        answer: "STUDENT",
        hint: "You are one at school"
      },
      {
        section: "Reading Part 5 (Fill)",
        text: "Complete: _A_U_Y (not difficult)",
        type: "fill",
        answer: "EASY",
        hint: "Opposite of difficult"
      },
      {
        section: "Writing Part 6",
        text: "Write a short email (25+ words) to tell your friend about your favourite hobby.\n\nSelf-check: ✓ 25+ words ✓ Correct greeting ✓ Clear topic ✓ Closing",
        type: "writing",
        model: "Hi friend,\nMy favourite hobby is playing chess. I learned it from my dad when I was 7. I play every weekend. Chess is fun and makes me think hard. What is your hobby?\nBest wishes",
        keywords: ["hobby", "chess", "weekend"]
      },
    ]
  }
};

if (typeof window !== 'undefined') {
  window.KET_EXAM = KET_EXAM;
}
