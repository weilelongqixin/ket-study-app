// KET A2 Key for Schools - Reading Comprehension Data Batch 2
// 6 full practice tests (Test 7-12), each with Part 1 (6Q) + Part 2 (5Q) + Part 3 (5Q)
// Total: 96 new questions
// Based on official Cambridge A2 Key exam format and question styles

const KET_READING_BATCH2 = [
  // ==================== TEST 7 ====================
  {
    id: 7,
    title: "真题阅读 Test 7",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "EMAIL from school: The annual school sports day will take place on Wednesday 15th June. Students should wear their house colours. If it rains, the event will move to Friday 17th June.",
            q: "When will sports day happen if the weather is good?",
            options: ["Friday 17th June", "Wednesday 15th June", "Wednesday 17th June"],
            answer: 1
          },
          {
            text: "NOTE from Mum: I've left dinner money on the kitchen table — £5. Don't spend it all on snacks! I'll pick you up at the usual time. Love, Mum.",
            q: "How much money did Mum leave?",
            options: ["£3", "£5", "£10"],
            answer: 1
          },
          {
            text: "POSTER at the leisure centre: Try our new climbing wall! Open every weekend. Special offer: first climb is half price for students. Bring sensible shoes and comfortable clothes.",
            q: "What is the special offer for students?",
            options: ["Free first climb", "Half price first climb", "Free shoes"],
            answer: 1
          },
          {
            text: "TEXT from a friend: Hi! I've got two tickets for the cinema on Saturday evening. Do you want to come? The film starts at 7:15. We can meet at the bus stop at 6:45.",
            q: "Where do they plan to meet?",
            options: ["At the cinema", "At the bus stop", "At the friend's house"],
            answer: 1
          },
          {
            text: "NOTICE at the park: The café in the park is now serving breakfast! From 8 AM every morning. Try our fresh pancakes with maple syrup — only £4.50 per portion.",
            q: "What can you buy at the park café from 8 AM?",
            options: ["Lunch only", "Breakfast", "Ice cream"],
            answer: 1
          },
          {
            text: "SIGN at the library: Computers are available for 30 minutes per person. If no one is waiting, you may stay longer. Please log off when you finish.",
            q: "How long can one person use a computer?",
            options: ["15 minutes", "30 minutes", "60 minutes"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的活动（A-E）。",
        questions: [
          {
            text: "Sophie wants to make a birthday cake for her mother.",
            options: ["A baking class", "A football match", "A nature walk", "A music concert", "A swimming lesson"],
            answer: 0
          },
          {
            text: "George wants to watch his favourite team play this weekend.",
            options: ["A baking class", "A football match", "A nature walk", "A music concert", "A swimming lesson"],
            answer: 1
          },
          {
            text: "Emma enjoys being outdoors and learning about plants and trees.",
            options: ["A baking class", "A football match", "A nature walk", "A music concert", "A swimming lesson"],
            answer: 2
          },
          {
            text: "Oliver loves listening to live bands and singing along.",
            options: ["A baking class", "A football match", "A nature walk", "A music concert", "A swimming lesson"],
            answer: 3
          },
          {
            text: "Hannah wants to learn how to swim properly before her summer holiday.",
            options: ["A baking class", "A football match", "A nature walk", "A music concert", "A swimming lesson"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Last Saturday, twelve-year-old Jack went to his first ever cooking class. His grandmother had given him the class as a birthday present because Jack loves watching cooking programmes on television. The class was held at a restaurant called 'The Golden Spoon' in the city centre. Chef Mario, who has worked in Italy and France, taught the class. There were eight students in total. First, Chef Mario showed them how to make fresh pasta from flour and eggs. Jack was surprised how easy it was. Then they made a tomato sauce with onions, garlic, and fresh basil. The best part was eating what they had cooked at the end of the class. Jack said the pasta was the most delicious thing he had ever tasted. Chef Mario gave everyone a recipe book to take home. Jack plans to make pasta for his family next weekend. His little sister Lily is very excited because she loves Italian food. Jack's grandmother has already said she will buy him another cooking class for Christmas.",
        questions: [
          {
            q: "Who gave Jack the cooking class as a present?",
            options: ["His mother", "His grandmother", "Chef Mario"],
            answer: 1
          },
          {
            q: "Where was the cooking class held?",
            options: ["At Jack's school", "At a restaurant called 'The Golden Spoon'", "At Chef Mario's house"],
            answer: 1
          },
          {
            q: "How many students were in the class?",
            options: ["Six", "Eight", "Ten"],
            answer: 1
          },
          {
            q: "What did they learn to make?",
            options: ["Fresh pasta and tomato sauce", "Pizza and salad", "Soup and bread"],
            answer: 0
          },
          {
            q: "What did Jack get to take home?",
            options: ["A new apron", "A recipe book", "Some Italian cheese"],
            answer: 1
          },
        ]
      }
    ]
  },

  // ==================== TEST 8 ====================
  {
    id: 8,
    title: "真题阅读 Test 8",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "NOTICE at the community centre: The Saturday film club has been moved from Room 3 to Room 5 because Room 3 is being painted. Same time: 2 PM to 4 PM. See you there!",
            q: "Why has the film club moved rooms?",
            options: ["Room 3 is too small", "Room 3 is being painted", "Room 5 is bigger"],
            answer: 1
          },
          {
            text: "MESSAGE from brother: Can you check if my football boots are in the hall cupboard? I can't find them and training starts at 4. Please text me back ASAP!",
            q: "What does the brother need?",
            options: ["A ride to training", "His football boots", "A new cup"],
            answer: 1
          },
          {
            text: "EMAIL from the school office: Dear parents, next Wednesday is International Day. Students are invited to bring a dish from their country to share. Please label any nuts or allergens.",
            q: "What should students bring on International Day?",
            options: ["A dish from their country", "A flag", "A costume"],
            answer: 0
          },
          {
            text: "POSTER: Saturday morning park run! Every week at 9 AM in Riverside Park. 5 km route. All ages and abilities welcome. Free to join — just turn up and run!",
            q: "How much does it cost to join the park run?",
            options: ["£2", "£5", "Free"],
            answer: 2
          },
          {
            text: "NOTE from teacher: Your art projects are due on Friday 20th. Please hand them in to Room 12 before 3:30 PM. Late projects will lose 5 marks per day.",
            q: "When are art projects due?",
            options: ["Monday 20th", "Friday 20th before 3:30 PM", "Friday after 3:30 PM"],
            answer: 1
          },
          {
            text: "SIGN at the bookshop: Closing down sale! Everything must go by Sunday. All books half price or less. Stationery from 50p. Don't miss out on these amazing bargains!",
            q: "What is happening at the bookshop?",
            options: ["A book launch", "A closing down sale", "A reading event"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们的去处（A-E）。",
        questions: [
          {
            text: "William wants to see some animals from South America.",
            options: ["The city zoo", "The botanical garden", "The science museum", "The art gallery", "The aquarium"],
            answer: 0
          },
          {
            text: "Isabella loves looking at beautiful flowers and plants.",
            options: ["The city zoo", "The botanical garden", "The science museum", "The art gallery", "The aquarium"],
            answer: 1
          },
          {
            text: "Thomas is fascinated by space and wants to learn about planets.",
            options: ["The city zoo", "The botanical garden", "The science museum", "The art gallery", "The aquarium"],
            answer: 2
          },
          {
            text: "Charlotte enjoys looking at paintings and sculptures.",
            options: ["The city zoo", "The botanical garden", "The science museum", "The art gallery", "The aquarium"],
            answer: 3
          },
          {
            text: "Daniel wants to see colourful fish and learn about ocean life.",
            options: ["The city zoo", "The botanical garden", "The science museum", "The art gallery", "The aquarium"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Every morning, thirteen-year-old Maya wakes up at six o'clock to deliver newspapers in her neighbourhood. She started the job six months ago because she wanted to earn some pocket money to buy a new bicycle. Maya delivers newspapers to thirty-two houses on three streets. It takes her about forty-five minutes. In summer, she loves being outside in the early morning when it is quiet and cool. In winter, it is much harder. It is dark and cold, and sometimes it rains or snows. But Maya never misses a delivery. Her customers are very kind. Mrs Green, who lives at number 15, always leaves a chocolate bar on her doorstep at Christmas. Mr Patel at number 22 gives her a small tip every month. Maya has saved one hundred and twenty pounds so far. She needs two hundred pounds for the bicycle she wants. Her father has promised to pay the rest when she has enough. Maya thinks she will have enough money in about three more months. She can't wait to ride her new bike to school.",
        questions: [
          {
            q: "How old is Maya?",
            options: ["Eleven", "Twelve", "Thirteen"],
            answer: 2
          },
          {
            q: "Why does Maya deliver newspapers?",
            options: ["To earn pocket money for a bicycle", "Because her parents make her", "To help the neighbours"],
            answer: 0
          },
          {
            q: "How many houses does Maya deliver to?",
            options: ["Twenty-two", "Thirty", "Thirty-two"],
            answer: 2
          },
          {
            q: "What does Mrs Green do at Christmas?",
            options: ["Gives Maya a tip", "Leaves a chocolate bar", "Gives Maya warm clothes"],
            answer: 1
          },
          {
            q: "How much more money does Maya need?",
            options: ["£80", "£120", "£200"],
            answer: 0
          },
        ]
      }
    ]
  },

  // ==================== TEST 9 ====================
  {
    id: 9,
    title: "真题阅读 Test 9",
    parts: [
      {
        name: "Part 1",
        instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
        questions: [
          {
            text: "EMAIL from the music teacher: The school concert is on Thursday evening at 7 PM. Students in the choir should arrive by 6:15 wearing their school uniform. Tickets are £3 for adults and £1 for children.",
            q: "What time should choir members arrive?",
            options: ["6:00 PM", "6:15 PM", "7:00 PM"],
            answer: 1
          },
          {
            text: "TEXT from Dad: I'm stuck in traffic. Won't be home until 7:30. There's leftover pasta in the fridge — just heat it up for two minutes. Help your sister with her homework if she needs it.",
            q: "What should the child do for dinner?",
            options: ["Cook new food", "Heat up leftover pasta", "Order takeaway"],
            answer: 1
          },
          {
            text: "NOTICE at the youth club: No session next Monday because of the bank holiday. We will be back on Wednesday at the usual time of 5:30 PM. Have a great weekend!",
            q: "Why is there no youth club session on Monday?",
            options: ["The club is closed permanently", "It is a bank holiday", "The leaders are sick"],
            answer: 1
          },
          {
            text: "POSTER in the school hall: Try out for the school play! 'The Wizard of Oz'. Auditions on Tuesday and Wednesday after school in the hall. No experience needed — just bring your enthusiasm!",
            q: "What do students need to bring to auditions?",
            options: ["A prepared speech", "A costume", "Nothing special — just enthusiasm"],
            answer: 2
          },
          {
            text: "SIGN at the bus stop: Route 17 buses now run every 15 minutes instead of every 20 minutes. New timetable available from the driver. Last bus: 11:30 PM.",
            q: "How often do Route 17 buses run now?",
            options: ["Every 10 minutes", "Every 15 minutes", "Every 20 minutes"],
            answer: 1
          },
          {
            text: "MESSAGE from Grandma: I'm coming to visit this weekend! I'll arrive on Saturday morning and stay until Monday afternoon. I'm bringing my famous apple pie. Can't wait to see you all!",
            q: "When will Grandma arrive?",
            options: ["Friday evening", "Saturday morning", "Monday afternoon"],
            answer: 1
          },
        ]
      },
      {
        name: "Part 2",
        instruction: "阅读每个人的描述，选择最适合他们阅读的书籍（A-E）。",
        questions: [
          {
            text: "Liam loves stories about detectives solving mysteries.",
            options: ["A detective novel", "A cookbook", "A travel guide", "A science textbook", "A sports biography"],
            answer: 0
          },
          {
            text: "Ruby wants to learn how to make healthy smoothies.",
            options: ["A detective novel", "A cookbook", "A travel guide", "A science textbook", "A sports biography"],
            answer: 1
          },
          {
            text: "The Chen family is planning a trip to Italy next summer.",
            options: ["A detective novel", "A cookbook", "A travel guide", "A science textbook", "A sports biography"],
            answer: 2
          },
          {
            text: "David needs to study the human body for his exam.",
            options: ["A detective novel", "A cookbook", "A travel guide", "A science textbook", "A sports biography"],
            answer: 3
          },
          {
            text: "Marcus wants to read about the life of a famous footballer.",
            options: ["A detective novel", "A cookbook", "A travel guide", "A science textbook", "A sports biography"],
            answer: 4
          },
        ]
      },
      {
        name: "Part 3",
        instruction: "阅读文章，选择正确答案（A、B或C）。",
        passage: "Clara is a fourteen-year-old girl who lives with her family in a small village near the sea. Every summer, her family runs a small ice cream shop called 'Sea Breeze Ice Cream'. Clara helps out during the school holidays. She loves meeting customers from different countries and practising her English with them. The shop opens at ten o'clock in the morning and closes at nine o'clock at night. The most popular flavours are chocolate, strawberry, and vanilla. But Clara's favourite is the new mango flavour they added this year. Her father makes all the ice cream fresh every morning. On a busy day, they can sell over two hundred ice creams. Last August, a famous food blogger visited the shop and wrote a wonderful review. Since then, more people than ever have been coming. Clara's parents are thinking about opening a second shop in the next town. Clara hopes they do, because she wants to help manage it when she is older. She thinks running an ice cream shop is the best job in the world.",
        questions: [
          {
            q: "Where does Clara live?",
            options: ["In a big city", "In a village near the sea", "In the mountains"],
            answer: 1
          },
          {
            q: "What is the name of the shop?",
            options: ["Summer Ice Cream", "Sea Breeze Ice Cream", "Clara's Shop"],
            answer: 1
          },
          {
            q: "What is Clara's favourite flavour?",
            options: ["Chocolate", "Strawberry", "Mango"],
            answer: 2
          },
          {
            q: "How many ice creams can they sell on a busy day?",
            options: ["Over 100", "Over 150", "Over 200"],
            answer: 2
          },
          {
            q: "What happened last August?",
            options: ["A food blogger visited and wrote a good review", "They opened a second shop", "Clara won a competition"],
            answer: 0
          },
        ]
      }
    ]
  },

  {
  id: 10,
  title: "真题阅读 Test 10",
  parts: [
    {
      name: "Part 1",
      instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
      questions: [
        {
          text: "EMAIL from school: The school choir has been invited to sing at the town hall on Saturday 10th December at 6 PM. Permission slips must be returned by Wednesday. Parents are welcome to attend.",
          q: "When must permission slips be returned?",
          options: ["Monday", "Wednesday", "Saturday"],
          answer: 1
        },
        {
          text: "NOTE from Mum: I've booked a table at the new Italian restaurant for 7:30 Friday evening. Grandma and Grandad are coming too. Dress smartly, please!",
          q: "Where has the family booked a table?",
          options: ["A Chinese restaurant", "An Italian restaurant", "A French restaurant"],
          answer: 1
        },
        {
          text: "POSTER at the sports centre: Badminton rackets and shuttlecocks available to hire. £2 per hour for members, £4 for non-members. Deposit of £10 required.",
          q: "How much does it cost a member to hire equipment?",
          options: ["£2 per hour", "£4 per hour", "£10 per hour"],
          answer: 0
        },
        {
          text: "TEXT from a friend: My dog had four puppies last night! Three brown and one white. They are so tiny and cute. Would you like to come and see them this afternoon?",
          q: "How many puppies were born?",
          options: ["Three", "Four", "Five"],
          answer: 1
        },
        {
          text: "NOTICE in the school corridor: The water fountain on the second floor is broken. Please use the one on the first floor until it is repaired. Sorry for any inconvenience.",
          q: "Which water fountain is broken?",
          options: ["The first floor one", "The second floor one", "The ground floor one"],
          answer: 1
        },
        {
          text: "SIGN at the clothes shop: Winter sale now on! Up to 50% off all coats, jackets, and boots. Offer ends Sunday. Free gift wrapping with purchases over £50.",
          q: "What is on sale at the clothes shop?",
          options: ["Summer clothes", "Winter clothes", "Swimming costumes"],
          answer: 1
        },
      ]
    },
    {
      name: "Part 2",
      instruction: "阅读每个人的描述，选择最适合他们的度假方式（A-E）。",
      questions: [
        {
          text: "Frank loves swimming and wants to stay somewhere near the beach.",
          options: ["A seaside hotel", "A mountain cabin", "A city apartment", "A countryside farmhouse", "A camping site in the forest"],
          answer: 0
        },
        {
          text: "Grace enjoys quiet places and wants to go hiking every day.",
          options: ["A seaside hotel", "A mountain cabin", "A city apartment", "A countryside farmhouse", "A camping site in the forest"],
          answer: 1
        },
        {
          text: "Henry loves visiting museums and going to the theatre.",
          options: ["A seaside hotel", "A mountain cabin", "A city apartment", "A countryside farmhouse", "A camping site in the forest"],
          answer: 2
        },
        {
          text: "Isla wants to experience farm life and look after animals.",
          options: ["A seaside hotel", "A mountain cabin", "A city apartment", "A countryside farmhouse", "A camping site in the forest"],
          answer: 3
        },
        {
          text: "James loves sleeping under the stars and cooking on a fire.",
          options: ["A seaside hotel", "A mountain cabin", "A city apartment", "A countryside farmhouse", "A camping site in the forest"],
          answer: 4
        },
      ]
    },
    {
      name: "Part 3",
      instruction: "阅读文章，选择正确答案（A、B或C）。",
      passage: "Robert is fifteen years old and has a very unusual hobby. He builds model ships inside glass bottles. His grandfather taught him how to do it when he was only eight. At first, it was very difficult and Robert wanted to give up. But his grandfather told him to be patient. 'It takes time,' he said. 'You will get better with practice.' Robert has now built twelve model ships. His most recent one is a model of the Titanic. It took him four months to finish. The most difficult part is putting the tiny pieces together inside the bottle using special long tools. Robert's models are so good that his art teacher, Ms Hughes, entered one in a local art competition. Robert won first prize and received two hundred pounds. He used the money to buy more materials. Robert's dream is to build a model of a Chinese dragon boat for his next project. He says it will be his biggest challenge yet.",
      questions: [
        {
          q: "What is Robert's unusual hobby?",
          options: ["Building model cars", "Building model ships inside bottles", "Collecting stamps"],
          answer: 1
        },
        {
          q: "Who taught Robert this hobby?",
          options: ["His father", "His art teacher", "His grandfather"],
          answer: 2
        },
        {
          q: "How long did the Titanic model take?",
          options: ["Two months", "Four months", "Eight months"],
          answer: 1
        },
        {
          q: "What prize did Robert win in the competition?",
          options: ["£100", "£200", "£500"],
          answer: 1
        },
        {
          q: "What does Robert want to build next?",
          options: ["A model of a Chinese dragon boat", "A model of a modern submarine", "A model of a pirate ship"],
          answer: 0
        },
      ]
    }
  ]
},

// ==================== TEST 11 ====================
  {
  id: 11,
  title: "真题阅读 Test 11",
  parts: [
    {
      name: "Part 1",
      instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
      questions: [
        {
          text: "EMAIL from coach: Training is moved to Wednesday this week because I have a meeting on Tuesday. We will practise in the school gym, not on the field. Bring indoor shoes!",
          q: "When will training take place this week?",
          options: ["Tuesday on the field", "Wednesday in the gym", "Wednesday on the field"],
          answer: 1
        },
        {
          text: "POSTER: Spring Fair at Applefield Primary School! Saturday 25th March, 11 AM — 3 PM. Games, face painting, and a raffle with great prizes. Hot dogs and cakes for sale. All welcome!",
          q: "What can people do at the Spring Fair?",
          options: ["Play games and buy food", "Watch a film", "Play football"],
          answer: 0
        },
        {
          text: "NOTE from sister: I've made sandwiches and put them in your lunchbox. Don't forget you have violin lessons after school. I'll collect you at 5. — Sarah",
          q: "What does Sarah tell her sibling to remember?",
          options: ["To make lunch", "To bring a violin", "To come to violin lessons after school"],
          answer: 2
        },
        {
          text: "MESSAGE from a friend: The homework was really hard! Question 5 was about fractions and I couldn't do it. Have you finished? If not, we could call each other and work on it together.",
          q: "What does the friend suggest?",
          options: ["Doing the homework together on a call", "Skipping the homework", "Asking the teacher"],
          answer: 0
        },
        {
          text: "SIGN at the pet shop: Free goldfish with every fish tank purchased! Choose from gold, orange, or silver fish. While stocks last. Fish food from £2.50 per tub.",
          q: "What is free at the pet shop?",
          options: ["A fish tank", "A goldfish with a fish tank purchase", "Fish food"],
          answer: 1
        },
        {
          text: "TEXT from Mum: Don't walk home today. Aunty Sue will pick you up at 3:30 from the school gate. Wait inside if it's raining. She's taking us to the dentist.",
          q: "Who will pick the child up from school?",
          options: ["Mum", "Aunty Sue", "The dentist"],
          answer: 1
        },
      ]
    },
    {
      name: "Part 2",
      instruction: "阅读每个人的描述，选择最适合他们的课程（A-E）。",
      questions: [
        {
          text: "Tina wants to learn how to paint beautiful pictures.",
          options: ["Art class", "Guitar class", "Cooking class", "Tennis class", "Computer coding class"],
          answer: 0
        },
        {
          text: "Owen wants to learn to play a musical instrument.",
          options: ["Art class", "Guitar class", "Cooking class", "Tennis class", "Computer coding class"],
          answer: 1
        },
        {
          text: "Priya wants to learn how to make pasta and pizza.",
          options: ["Art class", "Guitar class", "Cooking class", "Tennis class", "Computer coding class"],
          answer: 2
        },
        {
          text: "Luke wants to improve his serve and play matches.",
          options: ["Art class", "Guitar class", "Cooking class", "Tennis class", "Computer coding class"],
          answer: 3
        },
        {
          text: "Zara wants to learn how to create her own computer games.",
          options: ["Art class", "Guitar class", "Cooking class", "Tennis class", "Computer coding class"],
          answer: 4
        },
      ]
    },
    {
      name: "Part 3",
      instruction: "阅读文章，选择正确答案（A、B或C）。",
      passage: "A group of students at Riverside School have started a special project to reduce waste. Their teacher, Mr Foster, came up with the idea after he saw how much rubbish the school produced each week. The students call themselves the 'Green Team'. Every lunchtime, they sort the rubbish into different bins: paper, plastic, glass, and food waste. The food waste goes into a compost bin in the school garden, where it turns into soil for growing vegetables. So far, the Green Team has reduced the school's waste by half. They have also started a 'swap shop' where students can exchange books, toys, and clothes they no longer need. Last month, the Green Team won an award from the city council for their excellent work. Mr Foster is very proud of them. 'Young people can make a real difference,' he said. Next term, they plan to start growing their own fruit and vegetables in the garden, so the school canteen can use fresh, organic produce.",
      questions: [
        {
          q: "Who started the Green Team?",
          options: ["The students alone", "Mr Foster", "The city council"],
          answer: 1
        },
        {
          q: "What does the Green Team do every lunchtime?",
          options: ["Grow vegetables", "Sort rubbish into different bins", "Cook lunch for students"],
          answer: 1
        },
        {
          q: "What is the 'swap shop' for?",
          options: ["Exchanging books, toys, and clothes", "Selling food", "Buying new clothes"],
          answer: 0
        },
        {
          q: "How much has the school's waste been reduced by?",
          options: ["A quarter", "A third", "Half"],
          answer: 2
        },
        {
          q: "What do they plan to do next term?",
          options: ["Start growing fruit and vegetables", "Open a second swap shop", "Build a new garden"],
          answer: 0
        },
      ]
    }
  ]
},

// ==================== TEST 12 ====================
  {
  id: 12,
  title: "真题阅读 Test 12",
  parts: [
    {
      name: "Part 1",
      instruction: "阅读每条通知/消息，选择正确答案（A、B或C）。",
      questions: [
        {
          text: "EMAIL from the headteacher: School will close at 12:30 PM on Friday for staff training. Buses will arrive early. School lunch will be served before students leave at 12:30 PM.",
          q: "What time does school close on Friday?",
          options: ["12:00 PM", "12:30 PM", "1:00 PM"],
          answer: 1
        },
        {
          text: "MESSAGE from cousin: I'm coming to stay with you next week! My train arrives at 4:20 PM on Tuesday. Can someone meet me at the station? Can't wait! — Emma",
          q: "When does Emma's train arrive?",
          options: ["Tuesday at 4:00 PM", "Tuesday at 4:20 PM", "Thursday at 4:20 PM"],
          answer: 1
        },
        {
          text: "NOTICE at the swimming pool: Children under 8 must be accompanied by an adult in the water at all times. Adults may supervise up to two children each.",
          q: "Who must be with children under 8 in the pool?",
          options: ["A swimming teacher", "An adult", "An older sibling"],
          answer: 1
        },
        {
          text: "POSTER at the library: Author visit! Children's writer David Williams will be at the library on Saturday at 11 AM to read from his new book. Free entry. Signed copies available for £7.99.",
          q: "What will happen at the library on Saturday?",
          options: ["A book sale", "An author visit and reading", "A children's party"],
          answer: 1
        },
        {
          text: "NOTE from Dad: I've washed your football kit and it's drying on the line. Don't forget your match is at 10 tomorrow. I've put your boots by the front door.",
          q: "Where are the football boots?",
          options: ["On the washing line", "By the front door", "In the bedroom"],
          answer: 1
        },
        {
          text: "SIGN at the museum café: Hot meals served from 12 noon to 2:30 PM. Snacks and drinks available all day. Children's menu: £4.50. Vegetarian options available.",
          q: "Until what time are hot meals served?",
          options: ["12:00 PM", "2:00 PM", "2:30 PM"],
          answer: 2
        },
      ]
    },
    {
      name: "Part 2",
      instruction: "阅读每个人的描述，选择最适合他们的工作（A-E）。",
      questions: [
        {
          text: "Rachel loves animals and wants to work with them every day.",
          options: ["A vet", "A chef", "A pilot", "An artist", "A journalist"],
          answer: 0
        },
        {
          text: "Stephen loves cooking and wants to work in a restaurant.",
          options: ["A vet", "A chef", "A pilot", "An artist", "A journalist"],
          answer: 1
        },
        {
          text: "Laura loves travelling and wants to fly planes around the world.",
          options: ["A vet", "A chef", "A pilot", "An artist", "A journalist"],
          answer: 2
        },
        {
          text: "Edward loves drawing and wants to create illustrations for books.",
          options: ["A vet", "A chef", "A pilot", "An artist", "A journalist"],
          answer: 3
        },
        {
          text: "Victoria loves writing and wants to report news for a newspaper.",
          options: ["A vet", "A chef", "A pilot", "An artist", "A journalist"],
          answer: 4
        },
      ]
    },
    {
      name: "Part 3",
      instruction: "阅读文章，选择正确答案（A、B或C）。",
      passage: "When Karen was eleven, she moved with her family from a big city to a tiny village in the countryside. At first, she hated it. There were no shops nearby, no cinema, and none of her old friends lived close by. The only school in the village was very small — there were only fifteen students in her whole class. Karen felt lonely and missed her old life. Then one day, her neighbour, a kind old lady called Mrs Finch, asked Karen if she would like to help in her garden. Karen agreed because she had nothing else to do. Mrs Finch taught her how to plant seeds, water flowers, and grow vegetables. Karen discovered that she loved gardening. By the end of that summer, Karen had grown her own tomatoes, carrots, and strawberries. She was so proud that she brought some vegetables to school. Her teacher was impressed and decided to start a school garden. Now, two years later, Karen is in charge of the school garden club. She has made lots of new friends and can't imagine living anywhere else. She sometimes misses the city, but she says the countryside has given her something the city never could — a love of nature and the joy of growing things.",
      questions: [
        {
          q: "How old was Karen when she moved?",
          options: ["Nine", "Ten", "Eleven"],
          answer: 2
        },
        {
          q: "Why did Karen hate the village at first?",
          options: ["The school was too big", "There were no shops or friends nearby", "The neighbours were unkind"],
          answer: 1
        },
        {
          q: "Who introduced Karen to gardening?",
          options: ["Her teacher", "Mrs Finch", "Her mother"],
          answer: 1
        },
        {
          q: "What did Karen bring to school at the end of summer?",
          options: ["Flowers", "Vegetables she had grown", "Fruit from the shop"],
          answer: 1
        },
        {
          q: "How does Karen feel about the countryside now?",
          options: ["She still hates it", "She can't imagine living anywhere else", "She wants to move back to the city"],
          answer: 1
        },
      ]
    }
  ]
}
];

if (typeof window !== 'undefined') {
  window.KET_READING_BATCH2 = KET_READING_BATCH2;
}
