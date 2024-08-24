/*CMD
  command: /applyCoderSetDescription
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS

  <<ANSWER
*ℹ️ Sens Important Details*
_Send your profile description include your experiences, how fluent you are in JavaScript or anything your characteristics._

Maximum 2500 characters only.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let coderDescription = message
if (coderDescription.length <= 2500) {
  let tempCoderData = User.getProperty("tempCoderInfo")
  tempCoderData.coderDescription = coderDescription
  User.setProperty("tempCoderInfo", tempCoderData, "json")
  Bot.runCommand("/applyCoderSetWorkingHours")
} else {
  Bot.sendMessage(
    "Description is too long. Please limit it to 2500 characters."
  )
  Bot.runCommand("/applyCoderSetDescription")
}

