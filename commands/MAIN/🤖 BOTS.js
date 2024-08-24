/*CMD
  command: 🤖 BOTS
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

var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid)
if (timeZoneDifference === undefined) {
  Bot.sendMessage(
    "*🕜 Timezone*\nTo have an accurate time reading, you need to set your timezone first.\n\nSet up your one time timezone\n/setUserTimeZoneDate once inputted it cannot be changed."
  )
  return
}
var readedThisSectionBOTS = User.getProperty("readedThisSectionBOTS")
// Check if the user is running the command for the first time
if (readedThisSectionBOTS === undefined) {
  Bot.sendMessage(
    "*🤖 BJSMasterSyntaxJava Bots*\n================================\nThis section is only composed of\n*Bots Templates* contributed and created by *Freelancers*.\nThis composed of different bots genres,\n*• 💸 Earning Bots\n• 🚀 Productivity Bots\n• 🔧 Utility Bots\n• 📥 Downloader Bots\n• 📺 Entertainment Bots\n• 📈 Financial Bots\n• 🔔 Notification Bots\n• 🤖 Automation Bots\n• 🤖 AI Bots\n• 🤖 ETC's..*\n_This bots genres are only for illustration purposes and does not mean it will be actually present in the bots list, its depends on the creators who create such bots depending on its genre._\n\n*REMINDER FOR ALL CUSTOMERS:*\nAll purchase will be made in both BJS & BOTS are not refundable, as you receive an digital item/product.\nExceptions applied depending on issue.\nThis includes:\n*❌ Wrong bot received*\n*⚠️ Malfunction or an error occured while transfering bots*\n_Any other issues except on this two exceptions, are need proper reasonable issues to issue a refund._\n\nPlease rerun the command *🤖 BOTS* to start."
  )
  // Set the property to false after the first run
  User.setProperty("readedThisSectionBOTS", "true", "string")
} else {
  Bot.runCommand("/mainHallOfBOTS")
}

