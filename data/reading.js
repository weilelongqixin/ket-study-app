// KET Reading Comprehension - 15 passages (A2 Level)

const KET_READING = [
  {
    id: 1,
    title: "A Day at the Beach",
    difficulty: "Easy",
    passage: "Last Sunday, my family went to the beach. The weather was sunny and warm. My dad swam in the sea, and my mom read a book under a big umbrella. My little brother built a sandcastle. I played volleyball with my friends. We had sandwiches for lunch. In the afternoon, we bought ice cream. It was a wonderful day!",
    questions: [
      { q: "When did the family go to the beach?", options: ["Saturday", "Sunday", "Friday", "Monday"], answer: 1 },
      { q: "What did dad do?", options: ["Read a book", "Built a sandcastle", "Swam in the sea", "Played volleyball"], answer: 2 },
      { q: "What did they have for lunch?", options: ["Rice", "Sandwiches", "Pizza", "Noodles"], answer: 1 },
      { q: "How was the weather?", options: ["Rainy", "Cloudy", "Sunny and warm", "Snowy"], answer: 2 },
      { q: "What did they buy in the afternoon?", options: ["Cake", "Ice cream", "Juice", "Candy"], answer: 1 },
    ]
  },
  {
    id: 2,
    title: "My New School",
    difficulty: "Easy",
    passage: "I started at a new school this September. My classroom is on the second floor. There are thirty students in my class. My teacher is Miss Wang. She is very kind and patient. My favourite subject is Science because we do fun experiments. I have made three new friends: Tom, Lisa, and Kevin. We eat lunch together every day. I like my new school very much.",
    questions: [
      { q: "When did the writer start the new school?", options: ["January", "June", "September", "March"], answer: 2 },
      { q: "How many students are in the class?", options: ["20", "25", "30", "35"], answer: 2 },
      { q: "Who is the teacher?", options: ["Mr. Wang", "Miss Wang", "Mrs. Wang", "Mr. Chen"], answer: 1 },
      { q: "What is the writer's favourite subject?", options: ["Math", "English", "Science", "Art"], answer: 2 },
      { q: "How many new friends did the writer make?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
    ]
  },
  {
    id: 3,
    title: "A Birthday Party",
    difficulty: "Easy",
    passage: "Yesterday was Amy's tenth birthday. She invited twelve friends to her party. The party started at three o'clock in the afternoon. Her mom made a big chocolate cake. They played games, sang songs, and danced. Amy got many presents: a new bike, books, and a beautiful dress. At six o'clock, everyone went home. Amy said it was the best birthday ever!",
    questions: [
      { q: "How old is Amy now?", options: ["Nine", "Ten", "Eleven", "Twelve"], answer: 1 },
      { q: "How many friends did she invite?", options: ["Ten", "Eleven", "Twelve", "Thirteen"], answer: 2 },
      { q: "What time did the party start?", options: ["2:00", "3:00", "4:00", "5:00"], answer: 1 },
      { q: "What kind of cake did mom make?", options: ["Strawberry", "Vanilla", "Chocolate", "Fruit"], answer: 2 },
      { q: "What time did guests go home?", options: ["5:00", "6:00", "7:00", "8:00"], answer: 1 },
    ]
  },
  {
    id: 4,
    title: "The Pet Shop",
    difficulty: "Medium",
    passage: "There is a pet shop near my house. It sells dogs, cats, birds, and fish. I go there every Saturday to look at the animals. My favourite is a small white rabbit called Snowy. Snowy has red eyes and soft fur. The shop owner, Mr. Brown, is very friendly. He lets me feed Snowy sometimes. I want to buy Snowy, but my mom says our apartment is too small for a pet.",
    questions: [
      { q: "Where is the pet shop?", options: ["Far from the house", "Near the house", "In the city centre", "Next to school"], answer: 1 },
      { q: "When does the writer visit?", options: ["Every day", "Every Saturday", "Every Sunday", "After school"], answer: 1 },
      { q: "What is the rabbit's name?", options: ["Whitey", "Fluffy", "Snowy", "Bunny"], answer: 2 },
      { q: "What color are Snowy's eyes?", options: ["Blue", "Green", "Red", "Black"], answer: 2 },
      { q: "Why can't the writer buy Snowy?", options: ["Too expensive", "Mom doesn't like it", "Apartment too small", "Snowy is sick"], answer: 2 },
    ]
  },
  {
    id: 5,
    title: "A Trip to the Zoo",
    difficulty: "Medium",
    passage: "Last weekend, our class went to the City Zoo by bus. We arrived at nine in the morning. First, we saw the monkeys. They were jumping and playing. Then we visited the elephants. The baby elephant was drinking water with its trunk. After lunch, we watched the birds show. The parrots could say 'hello' and count numbers! We left the zoo at three o'clock. Everyone was tired but happy.",
    questions: [
      { q: "How did the class go to the zoo?", options: ["By car", "By bus", "By bike", "On foot"], answer: 1 },
      { q: "What time did they arrive?", options: ["8:00", "9:00", "10:00", "11:00"], answer: 1 },
      { q: "What were the monkeys doing?", options: ["Sleeping", "Eating", "Jumping and playing", "Swimming"], answer: 2 },
      { q: "What could the parrots do?", options: ["Sing songs", "Fly high", "Say hello and count", "Dance"], answer: 2 },
      { q: "What time did they leave?", options: ["2:00", "3:00", "4:00", "5:00"], answer: 1 },
    ]
  },
  {
    id: 6,
    title: "My Hobbies",
    difficulty: "Easy",
    passage: "I have three hobbies. My first hobby is reading. I read books every evening before bed. I like adventure stories best. My second hobby is swimming. I go to the swimming pool every Tuesday and Thursday. I can swim fifty metres now. My third hobby is collecting stamps. I have stamps from China, the USA, and Japan. My favourite stamp has a picture of a panda on it.",
    questions: [
      { q: "How many hobbies does the writer have?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
      { q: "What does the writer like reading?", options: ["Science books", "Adventure stories", "Fairy tales", "History books"], answer: 1 },
      { q: "When does the writer go swimming?", options: ["Monday and Wednesday", "Tuesday and Thursday", "Saturday only", "Every day"], answer: 1 },
      { q: "How far can the writer swim?", options: ["30 metres", "50 metres", "100 metres", "200 metres"], answer: 1 },
      { q: "What is on the favourite stamp?", options: ["A tiger", "A panda", "A bird", "A dragon"], answer: 1 },
    ]
  },
  {
    id: 7,
    title: "The Weather in England",
    difficulty: "Medium",
    passage: "The weather in England changes very quickly. In the morning, it can be sunny, and in the afternoon, it may rain. People in England always carry an umbrella, even on a sunny day. In summer, the temperature is usually between 18 and 25 degrees. It is not very hot. In winter, it is cold but not freezing. It sometimes snows in January. The best time to visit England is in spring, from March to May.",
    questions: [
      { q: "How does the weather in England change?", options: ["Slowly", "Quickly", "Never changes", "Only in winter"], answer: 1 },
      { q: "What do people always carry?", options: ["A hat", "A coat", "An umbrella", "A bag"], answer: 2 },
      { q: "What is the summer temperature?", options: ["10-15 degrees", "18-25 degrees", "28-35 degrees", "30-40 degrees"], answer: 1 },
      { q: "When does it sometimes snow?", options: ["December", "January", "February", "March"], answer: 1 },
      { q: "When is the best time to visit?", options: ["Summer", "Autumn", "Spring", "Winter"], answer: 2 },
    ]
  },
  {
    id: 8,
    title: "Tom's Saturday",
    difficulty: "Easy",
    passage: "Tom gets up at eight o'clock on Saturday. He has breakfast with his family. At nine, he goes to football practice. He plays football for two hours. After lunch, he does his homework. At three o'clock, he meets his friend Jack at the park. They ride their bikes together. In the evening, Tom watches a film with his parents. He goes to bed at ten.",
    questions: [
      { q: "What time does Tom get up?", options: ["7:00", "8:00", "9:00", "10:00"], answer: 1 },
      { q: "What does Tom do at nine?", options: ["Has breakfast", "Goes to football practice", "Does homework", "Rides bikes"], answer: 1 },
      { q: "How long does he play football?", options: ["One hour", "Two hours", "Three hours", "Half an hour"], answer: 1 },
      { q: "Who does Tom meet at the park?", options: ["His mom", "His teacher", "His friend Jack", "His brother"], answer: 2 },
      { q: "What does Tom do in the evening?", options: ["Reads a book", "Plays games", "Watches a film", "Goes swimming"], answer: 2 },
    ]
  },
  {
    id: 9,
    title: "Healthy Eating",
    difficulty: "Medium",
    passage: "Eating healthy food is very important for children. We should eat five portions of fruit and vegetables every day. Apples, bananas, and oranges are great choices. We should also drink lots of water — about six to eight glasses a day. It is good to eat fish twice a week. We should not eat too much sugar or fast food. Sweets and cakes are fine sometimes, but not every day. A healthy diet helps us grow strong and study better.",
    questions: [
      { q: "How many portions of fruit and vegetables?", options: ["Three", "Five", "Seven", "Ten"], answer: 1 },
      { q: "How much water should we drink?", options: ["3-4 glasses", "6-8 glasses", "10 glasses", "12 glasses"], answer: 1 },
      { q: "How often should we eat fish?", options: ["Every day", "Twice a week", "Once a month", "Never"], answer: 1 },
      { q: "What should we not eat too much of?", options: ["Rice", "Vegetables", "Sugar", "Fruit"], answer: 2 },
      { q: "What does a healthy diet help?", options: ["Sleep better", "Grow strong and study better", "Run faster", "Look taller"], answer: 1 },
    ]
  },
  {
    id: 10,
    title: "The School Library",
    difficulty: "Medium",
    passage: "Our school library is on the third floor. It is open from 8:00 in the morning to 5:00 in the afternoon. There are more than two thousand books. Students can borrow up to three books at a time. You can keep a book for two weeks. If you return a book late, you get a fine of one yuan per day. The library is quiet and comfortable. Many students go there to read and study after class.",
    questions: [
      { q: "Where is the library?", options: ["First floor", "Second floor", "Third floor", "Fourth floor"], answer: 2 },
      { q: "When does the library open?", options: ["7:00", "8:00", "9:00", "10:00"], answer: 1 },
      { q: "How many books can you borrow?", options: ["One", "Two", "Three", "Five"], answer: 2 },
      { q: "How long can you keep a book?", options: ["One week", "Two weeks", "Three weeks", "One month"], answer: 1 },
      { q: "What happens if you return a book late?", options: ["Nothing", "One yuan per day fine", "Five yuan fine", "Cannot borrow again"], answer: 1 },
    ]
  },
  {
    id: 11,
    title: "A Letter from Grandma",
    difficulty: "Medium",
    passage: "Dear Lucy, How are you? I am fine. I am writing this letter from London. I arrived here last Monday. The weather is cool and rainy. Yesterday, I visited the British Museum. It was amazing! There were old things from Egypt and Greece. Tomorrow, I will go to a famous park called Hyde Park. I miss you very much. I will come back next Saturday. See you soon! Love, Grandma.",
    questions: [
      { q: "Where is Grandma writing from?", options: ["Paris", "London", "New York", "Beijing"], answer: 1 },
      { q: "When did she arrive?", options: ["Last Monday", "Last Tuesday", "Last Sunday", "Last Friday"], answer: 0 },
      { q: "How is the weather?", options: ["Sunny and hot", "Cool and rainy", "Cold and snowy", "Warm and windy"], answer: 1 },
      { q: "What did she visit yesterday?", options: ["Hyde Park", "The British Museum", "Big Ben", "The zoo"], answer: 1 },
      { q: "When will Grandma come back?", options: ["Next Sunday", "Next Saturday", "Next Monday", "Next Friday"], answer: 1 },
    ]
  },
  {
    id: 12,
    title: "Sports Day",
    difficulty: "Medium",
    passage: "Every year, our school has a Sports Day in October. All students take part. There are many events: running races, long jump, high jump, and relay races. Last year, I won first place in the 100-metre race! My friend Lisa won the long jump. Our class also won the relay race. Parents come to watch and cheer. At the end of the day, the principal gives medals to the winners. It is always a fun and exciting day.",
    questions: [
      { q: "When is Sports Day?", options: ["September", "October", "November", "May"], answer: 1 },
      { q: "Who takes part?", options: ["Only boys", "Only best students", "All students", "Only teachers"], answer: 2 },
      { q: "What did the writer win last year?", options: ["Long jump", "100-metre race", "High jump", "Relay race"], answer: 1 },
      { q: "Who won the long jump?", options: ["The writer", "Lisa", "The teacher", "Tom"], answer: 1 },
      { q: "Who gives medals?", options: ["The teacher", "The parents", "The principal", "The coach"], answer: 2 },
    ]
  },
  {
    id: 13,
    title: "The Magic Garden",
    difficulty: "Hard",
    passage: "Behind Mrs. Green's house, there is a magic garden. It is full of beautiful flowers: red roses, yellow sunflowers, and purple lavender. Butterflies and bees visit every day. There is also a small pond with goldfish. Mrs. Green works in her garden every morning. She plants new seeds in spring and waters them carefully. In summer, the garden looks wonderful. Sometimes, she gives flowers to her neighbours. Everyone says her garden is the most beautiful in the street.",
    questions: [
      { q: "Where is the garden?", options: ["In front of the house", "Behind the house", "Next to the house", "Across the street"], answer: 1 },
      { q: "What flowers are NOT in the garden?", options: ["Roses", "Sunflowers", "Lavender", "Tulips"], answer: 3 },
      { q: "What animals visit the garden?", options: ["Cats and dogs", "Butterflies and bees", "Birds and rabbits", "Fish and frogs"], answer: 1 },
      { q: "When does Mrs. Green plant seeds?", options: ["Summer", "Autumn", "Winter", "Spring"], answer: 3 },
      { q: "What does she sometimes do for neighbours?", options: ["Cooks food", "Gives flowers", "Cleans the street", "Tells stories"], answer: 1 },
    ]
  },
  {
    id: 14,
    title: "Going Camping",
    difficulty: "Medium",
    passage: "Next weekend, my family is going camping. We will drive to a campsite near a lake. We will sleep in a tent. My dad will make a campfire, and we will cook hot dogs and beans. At night, we will look at the stars. In the morning, we will go fishing. I hope I can catch a big fish! My mom will bring a first-aid kit and lots of snacks. Camping is a great way to enjoy nature and spend time together.",
    questions: [
      { q: "Where will they go camping?", options: ["Near a river", "Near a lake", "In the mountains", "At the beach"], answer: 1 },
      { q: "Where will they sleep?", options: ["In a hotel", "In a cabin", "In a tent", "In the car"], answer: 2 },
      { q: "What will they cook?", options: ["Rice and fish", "Hot dogs and beans", "Sandwiches", "Noodles"], answer: 1 },
      { q: "What will they do at night?", options: ["Watch TV", "Play cards", "Look at the stars", "Tell stories"], answer: 2 },
      { q: "What will they do in the morning?", options: ["Go swimming", "Go fishing", "Go hiking", "Go shopping"], answer: 1 },
    ]
  },
  {
    id: 15,
    title: "The Science Project",
    difficulty: "Hard",
    passage: "Our science teacher, Mr. Lee, gave us a project last week. We had to build a model of a volcano. I worked with my partner, David. First, we used cardboard to make the mountain. Then, we painted it brown and green. We used red paper for the lava. On Friday, we showed our volcano to the class. Mr. Lee said it was excellent! He asked us to explain how a real volcano works. David talked about hot rock deep underground. I explained why volcanoes sometimes erupt. We got an A+ for our project!",
    questions: [
      { q: "Who gave the project?", options: ["Mr. Wang", "Mr. Lee", "Mrs. Brown", "Miss Chen"], answer: 1 },
      { q: "What did they build?", options: ["A robot", "A volcano model", "A bridge", "A rocket"], answer: 1 },
      { q: "Who was the partner?", options: ["Tom", "David", "Kevin", "Jack"], answer: 1 },
      { q: "What was used for lava?", options: ["Paint", "Red paper", "Plastic", "Clay"], answer: 1 },
      { q: "What grade did they get?", options: ["A", "A+", "B+", "A-"], answer: 1 },
    ]
  },
];

if (typeof window !== 'undefined') {
  window.KET_READING = KET_READING;
}
