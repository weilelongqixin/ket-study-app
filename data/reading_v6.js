// KET A2 Key for Schools - Reading Comprehension Data v5
// 6 full practice tests, each with Part 1 (6Q) + Part 2 (5Q) + Part 3 (5Q)
// Total: 96 questions

const KET_READING = [
  // ==================== TEST 1 ====================
  {
    id: 1,
    title: "真题阅读 Test 1",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "NOTICE: The school library will be closed on Monday for repairs. It will reopen on Tuesday at 9 AM.",
            q: "When will the library reopen?",
            options: ["Monday afternoon", "Tuesday at 9 AM", "Monday at 9 AM"],
            answer: 1
          },
          {
            text: "TEXT MESSAGE from Mum: I'm going to be 30 minutes late picking you up. Wait inside the school gate. Don't go anywhere.",
            q: "What should you do?",
            options: ["Go home by bus", "Wait inside the school gate", "Walk to the shops"],
            answer: 1
          },
          {
            text: "EMAIL from Mr Smith: Dear students, remember to bring your geography textbooks to tomorrow's class. We will start the new chapter on rivers.",
            q: "What do students need to bring tomorrow?",
            options: ["A history textbook", "A geography textbook", "A science textbook"],
            answer: 1
          },
          {
            text: "POSTER at the sports centre: Junior swimming competition — Saturday 10 AM. Entry is free for members. Non-members pay £3. Sign up at reception by Friday.",
            q: "How much does a non-member pay to enter the competition?",
            options: ["£1", "£3", "£5"],
            answer: 1
          },
          {
            text: "NOTE on the fridge: Dad — I've made dinner and left it in the oven. It'll be ready at 7. I've gone to Lisa's house to study. Back by 9. — Emma",
            q: "Where has Emma gone?",
            options: ["To the cinema", "To Lisa's house", "To the library"],
            answer: 1
          },
          {
            text: "SIGN at the park: Bicycle parking is behind the café. Please do not leave bikes near the playground. Thank you.",
            q: "Where should you park your bicycle?",
            options: ["Near the playground", "Behind the café", "Inside the café"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的活动（A-E）。",
        questions: [
          {
            text: "Tom loves animals and wants to see some baby ones this weekend.",
            options: ["The city zoo", "The art museum", "The sports centre", "The music hall", "The bookshop"],
            answer: 0
          },
          {
            text: "Lisa enjoys painting and wants to see some famous artwork.",
            options: ["The city zoo", "The art museum", "The sports centre", "The music hall", "The bookshop"],
            answer: 1
          },
          {
            text: "Jack wants to play basketball with his friends on Saturday.",
            options: ["The city zoo", "The art museum", "The sports centre", "The music hall", "The bookshop"],
            answer: 2
          },
          {
            text: "Amy is learning the piano and loves listening to music.",
            options: ["The city zoo", "The art museum", "The sports centre", "The music hall", "The bookshop"],
            answer: 3
          },
          {
            text: "Ben wants to buy a new storybook for his holiday trip.",
            options: ["The city zoo", "The art museum", "The sports centre", "The music hall", "The bookshop"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Sarah is 14 years old and lives in a small town with her parents and her younger brother, Sam. Every Saturday morning, Sarah helps her mother at the family's flower shop. The shop is called 'Spring Garden' and it opens at 8:30 AM. Sarah's job is to put fresh water in the vases and arrange the flowers neatly. Her favourite flowers are sunflowers because they are bright and cheerful. At lunchtime, Sarah walks to the bakery next door to buy some bread and sandwiches. In the afternoon, she goes home and does her homework. On Sundays, Sarah plays tennis with her best friend, Karen, at the park near the river. Sarah wants to be a professional tennis player when she grows up. She practises every week and her coach says she is improving fast. Next month, she will play in her first competition. She is a little nervous but very excited.",
        questions: [
          {
            q: "How old is Sarah?",
            options: ["12", "13", "14"],
            answer: 2
          },
          {
            q: "What is the name of the flower shop?",
            options: ["Spring Garden", "Summer Flowers", "Sweet Garden"],
            answer: 0
          },
          {
            q: "What does Sarah do at the shop?",
            options: ["Sells tickets", "Puts water in vases and arranges flowers", "Cleans the floor"],
            answer: 1
          },
          {
            q: "What does Sarah do on Sundays?",
            options: ["Plays tennis with Karen", "Works at the flower shop", "Visits her grandmother"],
            answer: 0
          },
          {
            q: "How does Sarah feel about next month's competition?",
            options: ["Bored and tired", "Nervous but excited", "Angry and worried"],
            answer: 1
          },
        ]
      }
    ]
  },

  // ==================== TEST 2 ====================
  {
    id: 2,
    title: "真题阅读 Test 2",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "EMAIL from school: The school trip to the Science Museum has been changed from Wednesday to Thursday. The bus will leave at 8:15 AM, not 9 AM. Please be on time.",
            q: "When will the school trip take place?",
            options: ["Wednesday at 9 AM", "Thursday at 8:15 AM", "Wednesday at 8:15 AM"],
            answer: 1
          },
          {
            text: "NOTE from David: Hi Mum, I've gone to the football field with Mike. We'll be back by 5 o'clock. Dinner is in the fridge — just heat it up. Love, David.",
            q: "What has David gone to do?",
            options: ["Play football", "Go shopping", "Visit Mike's house for dinner"],
            answer: 0
          },
          {
            text: "NOTICE at the cinema: This Saturday — all children's tickets are half price! Come and see 'The Secret Garden' (PG). Shows at 2 PM, 4 PM, and 6 PM.",
            q: "What is special about this Saturday?",
            options: ["Only one show", "Children's tickets are half price", "The cinema is closed"],
            answer: 1
          },
          {
            text: "MESSAGE from coach: Training is cancelled today because of the heavy rain. See everyone on Thursday at the usual time. Don't forget your boots!",
            q: "Why is training cancelled?",
            options: ["The coach is sick", "Heavy rain", "The field is too small"],
            answer: 1
          },
          {
            text: "POSTER at school: Lost! A blue backpack with a red star on it. Contains a maths textbook and a pencil case. If found, please bring to the school office. Thank you!",
            q: "What is in the lost backpack?",
            options: ["A maths textbook and a pencil case", "A science book and a lunch box", "A diary and some money"],
            answer: 0
          },
          {
            text: "SIGN at the restaurant: Lunch special — soup, main course, and a drink for only £6.50. Available Monday to Friday, 12 noon to 2 PM. Children under 10 eat free!",
            q: "Who can eat for free?",
            options: ["Everyone on Monday", "Children under 10", "Only members"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的电视节目（A-E）。",
        questions: [
          {
            text: "Mike loves football and wants to watch a live match on TV.",
            options: ["Cooking with Chef Wang", "World Football Tonight", "Wild Animals of Africa", "Cartoon Time", "Space and Stars"],
            answer: 1
          },
          {
            text: "Sophie wants to learn how to make a chocolate cake.",
            options: ["Cooking with Chef Wang", "World Football Tonight", "Wild Animals of Africa", "Cartoon Time", "Space and Stars"],
            answer: 0
          },
          {
            text: "Little Timmy is five years old and loves funny animations.",
            options: ["Cooking with Chef Wang", "World Football Tonight", "Wild Animals of Africa", "Cartoon Time", "Space and Stars"],
            answer: 3
          },
          {
            text: "Professor Lee is interested in lions and elephants.",
            options: ["Cooking with Chef Wang", "World Football Tonight", "Wild Animals of Africa", "Cartoon Time", "Space and Stars"],
            answer: 2
          },
          {
            text: "Anna is curious about planets and the moon.",
            options: ["Cooking with Chef Wang", "World Football Tonight", "Wild Animals of Africa", "Cartoon Time", "Space and Stars"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Last summer, thirteen-year-old Paul went on a camping holiday with his family. They drove to a campsite near a beautiful lake in the mountains. It took them four hours to get there by car. Paul's father set up the tent while Paul and his sister, Emma, collected wood for the campfire. In the evening, they cooked sausages and potatoes on the fire, and Paul's mum told funny stories. The next morning, Paul went fishing with his dad. They waited for two hours but only caught one small fish. Paul was a bit disappointed, but his dad laughed and said, 'That's fishing!' Later that afternoon, the family went hiking on a mountain trail. They saw some amazing birds and took lots of photos. On the last day, Paul met a boy called James from the next tent. They played football together and exchanged phone numbers. Paul hopes they can meet again next year.",
        questions: [
          {
            q: "How old is Paul?",
            options: ["11", "12", "13"],
            answer: 2
          },
          {
            q: "Where did the family go camping?",
            options: ["Near a river", "Near a lake in the mountains", "At the beach"],
            answer: 1
          },
          {
            q: "What did Paul do on the first evening?",
            options: ["Went fishing", "Collected wood for the campfire", "Played football"],
            answer: 1
          },
          {
            q: "How many fish did Paul and his dad catch?",
            options: ["None", "One small fish", "Three big fish"],
            answer: 1
          },
          {
            q: "Who did Paul meet on the last day?",
            options: ["A boy called James", "A park ranger", "His teacher"],
            answer: 0
          },
        ]
      }
    ]
  },

  // ==================== TEST 3 ====================
  {
    id: 3,
    title: "真题阅读 Test 3",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "NOTICE at the train station: The 10:15 train to London has been delayed by 20 minutes. It will now leave at 10:35. We are sorry for any problems this causes.",
            q: "When will the train to London now leave?",
            options: ["10:15", "10:35", "10:50"],
            answer: 1
          },
          {
            text: "MESSAGE from teacher: Well done, class! Your test results were excellent. The average score was 85%. Special congratulations to Anna, who got 98%! Tests will be handed back on Monday.",
            q: "What was the average test score?",
            options: ["78%", "85%", "98%"],
            answer: 1
          },
          {
            text: "POSTER: Summer Fair — Saturday 15 July, 1-5 PM at the school playground. Games, food stalls, and live music! All money goes to help the children's hospital. Entry: £2 for adults, free for children.",
            q: "Where will the money from the fair go?",
            options: ["To the school", "To the children's hospital", "To the music club"],
            answer: 1
          },
          {
            text: "EMAIL from the dentist: Dear Mr Brown, this is a reminder for your appointment on Friday 14th at 3:30 PM. Please arrive 10 minutes early. If you need to change the time, call us before Thursday.",
            q: "When is Mr Brown's dentist appointment?",
            options: ["Thursday at 3:30 PM", "Friday at 3:30 PM", "Friday at 4:00 PM"],
            answer: 1
          },
          {
            text: "NOTE from Grandma: I've baked some chocolate cookies and left them on the kitchen table for you. Don't eat them all at once! I'll be in the garden if you need me. Love, Grandma.",
            q: "Where is Grandma?",
            options: ["In the kitchen", "In the garden", "At the shops"],
            answer: 1
          },
          {
            text: "SIGN at the bookshop: Buy two books and get a third one FREE! Offer ends this Sunday. Great choice of children's books, novels, and travel guides.",
            q: "What is the offer?",
            options: ["All books are half price", "Buy two, get a third free", "Free books on Sunday"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的假日活动（A-E）。",
        questions: [
          {
            text: "Tony wants to try an exciting water sport for the first time.",
            options: ["Horse riding in the country", "Sailing lessons at the lake", "Baking cakes at home", "Watching films at the cinema", "Reading at the library"],
            answer: 1
          },
          {
            text: "Maria loves horses and wants to ride one through the countryside.",
            options: ["Horse riding in the country", "Sailing lessons at the lake", "Baking cakes at home", "Watching films at the cinema", "Reading at the library"],
            answer: 0
          },
          {
            text: "Chris wants a quiet afternoon enjoying some good books.",
            options: ["Horse riding in the country", "Sailing lessons at the lake", "Baking cakes at home", "Watching films at the cinema", "Reading at the library"],
            answer: 4
          },
          {
            text: "Jenny wants to make something sweet for her friends.",
            options: ["Horse riding in the country", "Sailing lessons at the lake", "Baking cakes at home", "Watching films at the cinema", "Reading at the library"],
            answer: 2
          },
          {
            text: "Kevin wants to relax and watch the latest action movie.",
            options: ["Horse riding in the country", "Sailing lessons at the lake", "Baking cakes at home", "Watching films at the cinema", "Reading at the library"],
            answer: 3
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Emma's school has a special tradition every autumn: the Harvest Festival. Students bring fruit, vegetables, and canned food to school. Then they decorate the school hall with colourful baskets of food. This year, Emma was in charge of decorating the hall with her classmate, Oliver. They spent three hours making the hall look beautiful. They used red apples, orange pumpkins, and green grapes. At the festival, the headteacher, Mrs Roberts, thanked all the students and teachers. A local charity called 'Food for All' collected the food and gave it to elderly people in the town. After the assembly, Emma's class performed a short play about farm life. Emma played the role of a farmer's daughter. Her parents came to watch and were very proud. After school, Emma's family went out for pizza to celebrate. Emma said it was the best day of the term.",
        questions: [
          {
            q: "What happens at Emma's school every autumn?",
            options: ["A sports day", "The Harvest Festival", "A music competition"],
            answer: 1
          },
          {
            q: "Who decorated the school hall this year?",
            options: ["Emma and her mother", "Emma and Oliver", "Mrs Roberts alone"],
            answer: 1
          },
          {
            q: "What did the charity 'Food for All' do?",
            options: ["Sold the food at a market", "Gave the food to elderly people", "Cooked the food for students"],
            answer: 1
          },
          {
            q: "What role did Emma play in the short play?",
            options: ["A farmer's daughter", "A teacher", "A shopkeeper"],
            answer: 0
          },
          {
            q: "How did Emma's family celebrate after school?",
            options: ["They went for pizza", "They went swimming", "They watched TV at home"],
            answer: 0
          },
        ]
      }
    ]
  },

  // ==================== TEST 4 ====================
  {
    id: 4,
    title: "真题阅读 Test 4",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "MESSAGE from Sarah: Hi Lucy, are you still coming to my house on Saturday? My mum says she can drive us to the shopping centre if we leave at 10. Let me know! Sarah",
            q: "What time does Sarah's mum want to leave?",
            options: ["9 o'clock", "10 o'clock", "11 o'clock"],
            answer: 1
          },
          {
            text: "NOTICE at the swimming pool: The pool will be closed for cleaning on Tuesday and Wednesday this week. It will open again on Thursday. Aqua aerobics classes will move to Friday.",
            q: "When will the pool reopen?",
            options: ["Wednesday", "Thursday", "Friday"],
            answer: 1
          },
          {
            text: "EMAIL from a friend: I had a great time at your birthday party yesterday! The magic show was amazing. How did the magician make that rabbit disappear? Thanks for inviting me. Write back soon! — Tom",
            q: "What did Tom enjoy at the party?",
            options: ["The food", "The magic show", "The music"],
            answer: 1
          },
          {
            text: "POSTER: Join the school choir! We practise every Wednesday after school in Room 12. Everyone is welcome — you don't need to be a great singer. Come and sing with us!",
            q: "Who can join the choir?",
            options: ["Only the best singers", "Everyone is welcome", "Only students in Year 8"],
            answer: 1
          },
          {
            text: "NOTE from Dad: I've fixed your bicycle. The tyres needed air and I've put on new brakes. You can ride to school tomorrow. Don't forget to wear your helmet! Dad",
            q: "What did Dad do to the bicycle?",
            options: ["Bought a new one", "Fixed the tyres and brakes", "Painted it blue"],
            answer: 1
          },
          {
            text: "SIGN at the museum: Flash photography is NOT allowed inside the museum. Please turn off your flash. You can take photos without flash. Thank you for protecting our artworks.",
            q: "What is NOT allowed at the museum?",
            options: ["Taking photos", "Using flash photography", "Talking"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的俱乐部（A-E）。",
        questions: [
          {
            text: "Daniel wants to learn to take better photos with his new camera.",
            options: ["Photography Club", "Chess Club", "Dance Club", "Cooking Club", "Gardening Club"],
            answer: 0
          },
          {
            text: "Holly loves dancing and wants to learn new moves.",
            options: ["Photography Club", "Chess Club", "Dance Club", "Cooking Club", "Gardening Club"],
            answer: 2
          },
          {
            text: "Ryan likes thinking games and wants to play against other students.",
            options: ["Photography Club", "Chess Club", "Dance Club", "Cooking Club", "Gardening Club"],
            answer: 1
          },
          {
            text: "Megan wants to learn how to make healthy meals.",
            options: ["Photography Club", "Chess Club", "Dance Club", "Cooking Club", "Gardening Club"],
            answer: 3
          },
          {
            text: "William loves being outdoors and working with plants.",
            options: ["Photography Club", "Chess Club", "Dance Club", "Cooking Club", "Gardening Club"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "When I was eight years old, my family moved to a new city because of my father's job. I had to leave my old school and my best friend, Peter. It was very hard for me. At my new school, I didn't know anyone. I felt lonely and shy. For the first week, I ate lunch by myself in the canteen. Then one day, a girl called Jenny came and sat next to me. She smiled and said, 'Do you want to be friends?' I was so happy. Jenny showed me around the school and introduced me to her friends, Max and Lily. Soon, we did everything together. We played games at break time, walked home together after school, and did our homework at Jenny's house. Max was very funny and always made us laugh. Lily was very good at maths and helped me with difficult problems. Now, three years later, we are still best friends. I'm glad my family moved to this city.",
        questions: [
          {
            q: "Why did the writer's family move to a new city?",
            options: ["Because of the father's job", "Because they wanted a bigger house", "Because of the weather"],
            answer: 0
          },
          {
            q: "Who was the writer's best friend at the old school?",
            options: ["Jenny", "Peter", "Max"],
            answer: 1
          },
          {
            q: "How did the writer feel during the first week?",
            options: ["Excited and happy", "Lonely and shy", "Angry and upset"],
            answer: 1
          },
          {
            q: "Who helped the writer with maths?",
            options: ["Jenny", "Max", "Lily"],
            answer: 2
          },
          {
            q: "How long have they been friends now?",
            options: ["One year", "Two years", "Three years"],
            answer: 2
          },
        ]
      }
    ]
  },

  // ==================== TEST 5 ====================
  {
    id: 5,
    title: "真题阅读 Test 5",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "EMAIL from the school: Parents' Evening will be held on Thursday 20th October. Please arrive between 5 PM and 7 PM. Each meeting with a teacher lasts about five minutes. We look forward to seeing you!",
            q: "How long does each meeting last?",
            options: ["Three minutes", "Five minutes", "Ten minutes"],
            answer: 1
          },
          {
            text: "TEXT from brother: Can you pick up some milk and bread on your way home? I'm making dinner for us. The shop closes at 6 so please hurry! Thanks.",
            q: "What does the brother need?",
            options: ["Milk and bread", "Eggs and butter", "Fruit and juice"],
            answer: 0
          },
          {
            text: "NOTICE at the community centre: New yoga classes start next Monday! Every Monday and Wednesday, 6-7 PM. First class is free. Bring comfortable clothes and a water bottle. All ages welcome!",
            q: "What should people bring to the yoga class?",
            options: ["A towel and soap", "Comfortable clothes and a water bottle", "A yoga mat and shoes"],
            answer: 1
          },
          {
            text: "MESSAGE from friend: I got the tickets for the concert! We're in Row C, seats 12 and 13. The show starts at 7:30 but let's meet at 7 outside the hall so we can find our seats.",
            q: "Where should they meet?",
            options: ["Inside the hall at their seats", "Outside the hall at 7", "At the ticket office"],
            answer: 1
          },
          {
            text: "POSTER: Bike for sale! Blue mountain bike, excellent condition. Only 6 months old. Comes with a helmet and a lock. £80 or best offer. Contact Alex: 07788 123456.",
            q: "What comes with the bike?",
            options: ["A pump and lights", "A helmet and a lock", "A bag and a bottle"],
            answer: 1
          },
          {
            text: "SIGN at the zoo: Please do not feed the animals. Our animals have special diets prepared by experts. Feeding them human food can make them sick. Thank you for your cooperation.",
            q: "Why shouldn't visitors feed the animals?",
            options: ["The animals bite", "It can make them sick", "The food is too expensive"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的礼物（A-E）。",
        questions: [
          {
            text: "Grace loves reading adventure stories and mystery novels.",
            options: ["A set of mystery novels", "A pair of running shoes", "A box of chocolates", "A painting set", "A football"],
            answer: 0
          },
          {
            text: "Oliver wants to be faster on the sports field.",
            options: ["A set of mystery novels", "A pair of running shoes", "A box of chocolates", "A painting set", "A football"],
            answer: 1
          },
          {
            text: "Chloe has a very sweet tooth.",
            options: ["A set of mystery novels", "A pair of running shoes", "A box of chocolates", "A painting set", "A football"],
            answer: 2
          },
          {
            text: "Harry dreams of being a famous artist one day.",
            options: ["A set of mystery novels", "A pair of running shoes", "A box of chocolates", "A painting set", "A football"],
            answer: 3
          },
          {
            text: "Sam plays in the school team every weekend.",
            options: ["A set of mystery novels", "A pair of running shoes", "A box of chocolates", "A painting set", "A football"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Mr and Mrs Green own a small café called 'The Sunny Corner' on Park Street. The café opens at seven o'clock every morning except Sunday. Mrs Green does all the cooking. She is famous in the town for her apple pie and her chicken sandwiches. Mr Green makes the best coffee and always has a big smile for every customer. Their daughter, Sophie, who is twelve, helps in the café on Saturdays. She serves drinks and clears the tables. The café is small — it only has eight tables — but it is always busy. Many people come in for breakfast before work. Students from the nearby school come in after class to buy ice cream and cakes. On Saturday mornings, there is sometimes a queue outside the door! The Greens are planning to make the café bigger next year. They want to add more tables and a small outdoor garden. Sophie says she wants to add a children's play corner so families can relax while they eat.",
        questions: [
          {
            q: "What is the café called?",
            options: ["The Sunny Corner", "The Green Garden", "Park Street Café"],
            answer: 0
          },
          {
            q: "When is the café closed?",
            options: ["Monday", "Saturday", "Sunday"],
            answer: 2
          },
          {
            q: "How old is Sophie?",
            options: ["Ten", "Twelve", "Fourteen"],
            answer: 1
          },
          {
            q: "How many tables does the café have?",
            options: ["Six", "Eight", "Ten"],
            answer: 1
          },
          {
            q: "What does Sophie want to add to the café?",
            options: ["A children's play corner", "A new kitchen", "A coffee machine"],
            answer: 0
          },
        ]
      }
    ]
  },

  // ==================== TEST 6 ====================
  {
    id: 6,
    title: "真题阅读 Test 6",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "EMAIL from teacher: Dear parents, next Friday is Environment Day at school. Students should wear green clothes and bring a reusable water bottle. We will plant trees in the school garden in the morning.",
            q: "What should students bring?",
            options: ["A packed lunch", "A reusable water bottle", "Gardening tools"],
            answer: 1
          },
          {
            text: "NOTE on the classroom door: Maths class has moved to Room 204 for today only. Don't forget to bring your calculators. — Mr Thompson",
            q: "Where is maths class today?",
            options: ["Room 104", "Room 204", "Room 304"],
            answer: 1
          },
          {
            text: "MESSAGE from Mum: Your aunt and uncle are coming for dinner tonight. Can you tidy your room before you go out? They might look in! See you at 6.",
            q: "What does Mum want before you go out?",
            options: ["To cook dinner", "To tidy your room", "To buy flowers"],
            answer: 1
          },
          {
            text: "POSTER at the youth club: Table tennis tournament! Friday 7 PM. Sign up on the board. Prizes for the top three players. Beginners welcome — it's all about having fun!",
            q: "Who can enter the tournament?",
            options: ["Only advanced players", "Beginners are welcome", "Only club members over 16"],
            answer: 1
          },
          {
            text: "SIGN at the park café: Ice cream: 1 scoop £1.50, 2 scoops £2.50, 3 scoops £3.00. Choose from 12 flavours! Hot drinks and cakes also available.",
            q: "How much does a 2-scoop ice cream cost?",
            options: ["£1.50", "£2.50", "£3.00"],
            answer: 1
          },
          {
            text: "TEXT from classmate: Don't forget — our history project is due tomorrow! I've finished mine. Have you finished yours? If you need help, call me tonight before 9.",
            q: "What is due tomorrow?",
            options: ["The history project", "The maths homework", "The science report"],
            answer: 0
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的周末计划（A-E）。",
        questions: [
          {
            text: "Lucy wants to spend a quiet day reading in the sun.",
            options: ["A day at the beach", "A visit to the library", "A shopping trip to the mall", "A football match", "A cooking lesson"],
            answer: 0
          },
          {
            text: "Mark wants to buy some new trainers and a jacket.",
            options: ["A day at the beach", "A visit to the library", "A shopping trip to the mall", "A football match", "A cooking lesson"],
            answer: 2
          },
          {
            text: "Peter can't wait to watch his favourite team play.",
            options: ["A day at the beach", "A visit to the library", "A shopping trip to the mall", "A football match", "A cooking lesson"],
            answer: 3
          },
          {
            text: "Daisy wants to borrow some new books for the week.",
            options: ["A day at the beach", "A visit to the library", "A shopping trip to the mall", "A football match", "A cooking lesson"],
            answer: 1
          },
          {
            text: "Helen wants to learn how to make pasta from scratch.",
            options: ["A day at the beach", "A visit to the library", "A shopping trip to the mall", "A football match", "A cooking lesson"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Last winter, fourteen-year-old Michael decided he wanted to do something to help people in his town. He noticed that some elderly people in his neighbourhood lived alone and sometimes felt lonely. So he started a project called 'Warm Hearts'. Every Saturday, Michael and his friends visit elderly people who live alone. They talk, play board games, and sometimes help with shopping or gardening. Michael's grandmother gave him the idea. She lives alone and told him how much she looked forward to his weekly visits. Michael thought other elderly people might feel the same way. He asked his school friends, and soon fifteen students joined the project. Now, they visit thirty elderly people every week. The local newspaper wrote a story about 'Warm Hearts', and Michael received an award from the mayor. But Michael says the best reward is seeing the smiles on people's faces. 'When Mrs Jones plays chess with us, she looks so happy,' he said. 'I think we get more from this than they do.' Next year, Michael hopes to start 'Warm Hearts' groups in other schools across the city.",
        questions: [
          {
            q: "How old is Michael?",
            options: ["Twelve", "Thirteen", "Fourteen"],
            answer: 2
          },
          {
            q: "What is the name of Michael's project?",
            options: ["Happy Friends", "Warm Hearts", "Helping Hands"],
            answer: 1
          },
          {
            q: "Who gave Michael the idea?",
            options: ["His teacher", "His grandmother", "The mayor"],
            answer: 1
          },
          {
            q: "How many students joined the project?",
            options: ["Ten", "Fifteen", "Thirty"],
            answer: 1
          },
          {
            q: "What does Michael hope to do next year?",
            options: ["Win more awards", "Start groups in other schools", "Visit more elderly people alone"],
            answer: 1
          },
        ]
      }
    ]
  },
];

if (typeof window !== 'undefined') {
  window.KET_READING = KET_READING;
}