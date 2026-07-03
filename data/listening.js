// KET Listening Practice - 10 exercises (A2 Level)
// Uses Web Speech API for text-to-speech

const KET_LISTENING = [
  {
    id: 1,
    title: "At the Airport",
    subtitle: "Listen and answer questions about airport announcements",
    transcript: "Attention, please. Flight CA 987 to Shanghai will depart from Gate 12 at 3:45 PM. Passengers should go to the gate now. Please have your boarding pass and passport ready. Thank you.",
    questions: [
      { q: "Where is the flight going?", options: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"], answer: 1 },
      { q: "What is the gate number?", options: ["Gate 8", "Gate 10", "Gate 12", "Gate 15"], answer: 2 },
      { q: "What time does the flight depart?", options: ["2:45 PM", "3:45 PM", "4:45 PM", "5:45 PM"], answer: 1 },
      { q: "What should passengers have ready?", options: ["Ticket and ID", "Boarding pass and passport", "Phone and wallet", "Bag and coat"], answer: 1 },
    ]
  },
  {
    id: 2,
    title: "Ordering Food",
    subtitle: "Listen to a conversation at a restaurant",
    transcript: "Waiter: Good evening! Are you ready to order? Customer: Yes, I'd like a chicken sandwich and a glass of orange juice, please. Waiter: Would you like fries with that? Customer: Yes, please. How much is it? Waiter: That's 45 yuan altogether. Customer: Here you are. Waiter: Thank you. Your food will be ready in ten minutes.",
    questions: [
      { q: "What did the customer order?", options: ["Beef burger", "Chicken sandwich", "Fish and chips", "Pizza"], answer: 1 },
      { q: "What drink did they order?", options: ["Tea", "Cola", "Orange juice", "Water"], answer: 2 },
      { q: "How much was the meal?", options: ["35 yuan", "40 yuan", "45 yuan", "50 yuan"], answer: 2 },
      { q: "How long will the food take?", options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"], answer: 1 },
    ]
  },
  {
    id: 3,
    title: "Weather Report",
    subtitle: "Listen to a weather forecast",
    transcript: "Good morning. Here is today's weather report. In Beijing, it will be sunny with a high of 28 degrees. In Shanghai, it will be cloudy and rainy in the afternoon, with a temperature of 24 degrees. In Guangzhou, it will be hot and sunny, reaching 33 degrees. In Harbin, it will be cool and windy, with a low of 15 degrees. Don't forget your umbrella if you are in Shanghai!",
    questions: [
      { q: "What is the weather like in Beijing?", options: ["Rainy", "Cloudy", "Sunny", "Windy"], answer: 2 },
      { q: "What is the temperature in Shanghai?", options: ["20 degrees", "24 degrees", "28 degrees", "33 degrees"], answer: 1 },
      { q: "How hot will it be in Guangzhou?", options: ["28 degrees", "30 degrees", "33 degrees", "35 degrees"], answer: 2 },
      { q: "Where should you bring an umbrella?", options: ["Beijing", "Shanghai", "Guangzhou", "Harbin"], answer: 1 },
    ]
  },
  {
    id: 4,
    title: "Making Plans",
    subtitle: "Listen to two friends making weekend plans",
    transcript: "Mike: Hi Sarah, what are you doing this Saturday? Sarah: I don't have any plans yet. What about you? Mike: I want to go to the cinema. There's a new cartoon film. Would you like to come? Sarah: Sure! What time does the film start? Mike: It starts at 2:30. Let's meet at the cinema at 2:00. Sarah: Great! Shall we get some popcorn? Mike: Of course! I'll buy the tickets online tonight.",
    questions: [
      { q: "What day are they planning for?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 1 },
      { q: "What kind of film is it?", options: ["Action film", "Cartoon", "Horror film", "Documentary"], answer: 1 },
      { q: "What time does the film start?", options: ["2:00", "2:30", "3:00", "3:30"], answer: 1 },
      { q: "What time will they meet?", options: ["1:30", "2:00", "2:30", "3:00"], answer: 1 },
    ]
  },
  {
    id: 5,
    title: "School Announcement",
    subtitle: "Listen to a school announcement",
    transcript: "Attention, students. Tomorrow is our school sports day. Please remember to wear your sports uniform. Bring a water bottle and a hat. The events will start at 9:00 in the morning on the playground. If it rains, sports day will be moved to next Friday. Parents are welcome to come and watch. Thank you.",
    questions: [
      { q: "What is happening tomorrow?", options: ["A test", "Sports day", "A field trip", "A concert"], answer: 1 },
      { q: "What should students wear?", options: ["School uniform", "Sports uniform", "Casual clothes", "Any clothes"], answer: 1 },
      { q: "What time do events start?", options: ["8:00", "8:30", "9:00", "9:30"], answer: 2 },
      { q: "Where will events take place?", options: ["In the gym", "In the classroom", "On the playground", "At the park"], answer: 2 },
    ]
  },
  {
    id: 6,
    title: "At the Doctor's Office",
    subtitle: "Listen to a conversation at the doctor",
    transcript: "Doctor: Hello, young man. What's the matter? Patient: I have a headache and a sore throat. I also feel a little hot. Doctor: Let me check. Yes, you have a slight fever. Don't worry, it's just a cold. Drink lots of water and rest at home for two days. Take this medicine three times a day, after meals. You'll feel better soon. Patient: Thank you, doctor. Can I go to school on Monday? Doctor: Yes, you should be fine by then.",
    questions: [
      { q: "What are the patient's symptoms?", options: ["Stomachache", "Headache and sore throat", "Broken arm", "Toothache"], answer: 1 },
      { q: "What does the patient have?", options: ["A fever", "A cold", "The flu", "An allergy"], answer: 1 },
      { q: "How many days should the patient rest?", options: ["One day", "Two days", "Three days", "A week"], answer: 1 },
      { q: "How often should the patient take medicine?", options: ["Once a day", "Twice a day", "Three times a day", "Four times a day"], answer: 2 },
    ]
  },
  {
    id: 7,
    title: "Train Station Announcement",
    subtitle: "Listen to train station announcements",
    transcript: "Welcome to Beijing Railway Station. The train to Tianjin, number C201, will leave from Platform 3 at 10:15. The train to Shanghai, number G101, has been delayed by 20 minutes. It will now leave at 11:40 from Platform 5. Passengers for Guangzhou, your train K99 will depart from Platform 8 at 1:00 PM. Please check the screens for more information. Have a safe journey!",
    questions: [
      { q: "Where is the train to Tianjin leaving from?", options: ["Platform 1", "Platform 2", "Platform 3", "Platform 5"], answer: 2 },
      { q: "What time does the Tianjin train leave?", options: ["10:00", "10:15", "10:30", "11:00"], answer: 1 },
      { q: "What happened to the Shanghai train?", options: ["Cancelled", "Delayed 20 minutes", "On time", "Delayed 1 hour"], answer: 1 },
      { q: "Which platform for Guangzhou?", options: ["Platform 5", "Platform 6", "Platform 7", "Platform 8"], answer: 3 },
    ]
  },
  {
    id: 8,
    title: "Shopping for Clothes",
    subtitle: "Listen to a shopping conversation",
    transcript: "Shop assistant: Can I help you? Customer: Yes, I'm looking for a jacket for my son. Shop assistant: What size? Customer: Size 140, please. Shop assistant: What color would you like? We have blue, black, and green. Customer: Do you have it in blue? Shop assistant: Yes, here it is. It's 180 yuan. Customer: Can I try a smaller size? Shop assistant: Sorry, this is the smallest we have. Customer: OK, I'll take it.",
    questions: [
      { q: "What is the customer looking for?", options: ["A shirt", "A jacket", "Shoes", "A hat"], answer: 1 },
      { q: "What size does the customer want?", options: ["120", "130", "140", "150"], answer: 2 },
      { q: "What color did they choose?", options: ["Black", "Green", "Blue", "Red"], answer: 2 },
      { q: "How much is the jacket?", options: ["150 yuan", "180 yuan", "200 yuan", "220 yuan"], answer: 1 },
    ]
  },
  {
    id: 9,
    title: "Phone Call to a Friend",
    subtitle: "Listen to a phone conversation",
    transcript: "Hello? Hi, Peter. It's me, Anna. Oh hi, Anna! How are you? I'm great! I'm calling about the English homework. Did you write it down? Yes, we need to read pages 20 to 25 and answer questions 1 to 5. Also, we need to write a short paragraph about our weekend. Is that all? Mr. Wang said we should learn five new words from the reading too. OK, thanks Anna! You're welcome. See you tomorrow!",
    questions: [
      { q: "Who is calling?", options: ["Peter", "Anna", "Mr. Wang", "Lisa"], answer: 1 },
      { q: "What pages should they read?", options: ["15 to 20", "20 to 25", "25 to 30", "10 to 15"], answer: 1 },
      { q: "How many questions to answer?", options: ["3", "4", "5", "6"], answer: 2 },
      { q: "What else do they need to write?", options: ["A story", "A poem", "A paragraph about weekend", "A letter"], answer: 2 },
    ]
  },
  {
    id: 10,
    title: "Hotel Check-in",
    subtitle: "Listen to a hotel check-in conversation",
    transcript: "Receptionist: Welcome to the Grand Hotel. How can I help you? Guest: I have a reservation. My name is David Chen. Receptionist: Let me check. Yes, a double room for three nights. Is that correct? Guest: Yes, that's right. Receptionist: Your room number is 305, on the third floor. Breakfast is served from 7 to 10 in the restaurant on the ground floor. Here is your key card. Enjoy your stay! Guest: Thank you. What time does the swimming pool open? Receptionist: The pool is open from 6 AM to 9 PM every day. Guest: Great, thank you!",
    questions: [
      { q: "What is the guest's name?", options: ["David Wang", "David Chen", "David Li", "David Zhang"], answer: 1 },
      { q: "What kind of room did he book?", options: ["Single room", "Double room", "Family room", "Suite"], answer: 1 },
      { q: "How many nights?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
      { q: "What is the room number?", options: ["205", "305", "405", "505"], answer: 1 },
      { q: "What time does breakfast start?", options: ["6:00", "7:00", "8:00", "9:00"], answer: 1 },
    ]
  },
];

if (typeof window !== 'undefined') {
  window.KET_LISTENING = KET_LISTENING;
}
