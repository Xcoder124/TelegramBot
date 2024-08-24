/*CMD
  command: /applyCoderSetWorkingHours
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS

  <<ANSWER
*ℹ️ Send Important Details*
Send your estimated working hours

_FORMAT: HH:MMAM - HH:MMAM TZ > 8:30AM - 5:00AM EST_
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let workingHours = message;
let regex = /^([0-9]{1,2}:[0-9]{2}(AM|PM)) - ([0-9]{1,2}:[0-9]{2}(AM|PM)) ([A-Z]{2,4})$/;

if (!regex.test(workingHours)) {
  Bot.sendMessage("*ℹ️ Invalid Format*\nPlease enter the working hours in the format: HH:MMAM/PM - HH:MMAM/PM TZ.");
  Bot.runCommand("/applyCoderSetWorkingHours");
} else {
  let tempCoderData = User.getProperty("tempCoderInfo");
  tempCoderData.workingHours = workingHours;
  User.setProperty("tempCoderInfo", tempCoderData, "json");
  Bot.runCommand("/applyCoderInformationSummary")
}
