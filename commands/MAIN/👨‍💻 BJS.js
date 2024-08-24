/*CMD
  command: 👨‍💻 BJS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid);
  if (timeZoneDifference === undefined) {
    Bot.sendMessage("*🕜 Timezone*\nTo have an accurate time reading, you need to set your timezone first.\n\nSet up your one time timezone\n/setUserTimeZoneDate once inputted it cannot be changed.");
    return;
  }
var readedThisSectionBJS = User.getProperty("readedThisSectionBJS")
// Check if the user is running the command for the first time
if (readedThisSectionBJS === undefined){
Bot.sendMessage("*BJSMasterSyntaxJava*\n===========================\nThis section is composed of\n*BJSMasterSyntaxJava*\ncustom codes, that may help you develop your own bot.\n\nBut, this is also composed of *Sellers* custom codes which they share their own creation in BJS Coding.\n\nIf you ask if theres a free code, yes we have a free codes available in our resources just simply look for *no value* products in listing.\n\nWere also want to hear from our customers about what theyre looking for, like any genres or types of code they need and we will be open to help if available.\nCheck *👤 Get Support* to find someone to help you.\n\n*LET ME REMIND YOU*: That if you made a purchase here in this section, its already final and cannot be refunded unless if an\n*error/malfunctions/other reasonable issues* occurs your funds will be refunded.\n*Also*, if you want to be a freelancer, come and join just find the *📤 Become a Freelancer* button in *⚙️ MORE* settings.\n\nPlease rerun the command *👨‍💻 BJS* to continue.");
  // Set the property to false after the first run
  User.setProperty("readedThisSectionBJS", "true", "string");
} else {
Bot.runCommand("/mainHallOfBJS")
}
