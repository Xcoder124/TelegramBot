/*CMD
  command: /setupLevel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LEVEL UP

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const levelSystem = [
  {
    level: 1,
    exp: 100,
    remark: "All masters start from being a beginner.",
    name: "Beginner I"
  },
  {
    level: 2,
    exp: 500,
    remark: "Every step forward is a step towards mastery.",
    name: "Novice II"
  },
  {
    level: 3,
    exp: 1200,
    remark: "Apprenticeship is the pathway to expertise.",
    name: "Apprentice III"
  },
  {
    level: 4,
    exp: 2500,
    remark: "Advanced levels are a testament to your dedication.",
    name: "Advanced I"
  },
  {
    level: 5,
    exp: 4500,
    remark: "Your progress is impressive, keep climbing the ranks!",
    name: "Advanced II"
  },
  {
    level: 6,
    exp: 7500,
    remark: "You're surpassing boundaries, Advanced achiever!",
    name: "Advanced III"
  },
  {
    level: 7,
    exp: 10500,
    remark: "Excellence is within reach, Advanced IV!",
    name: "Advanced IV"
  },
  {
    level: 8,
    exp: 20500,
    remark: "Advanced V - Pinnacle of progress, one step from the top!",
    name: "Advanced V"
  },
  {
    level: 9,
    exp: 40000,
    remark: "From the beginning to the peak, you've mastered the ranks!",
    name: "Master V"
  }
]

// Save the improved level system as a property
Bot.setProperty("levelSystem", levelSystem, "json");

