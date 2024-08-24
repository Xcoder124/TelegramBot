/*CMD
  command: /applyCoderSetPricePerSession
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS

  <<ANSWER
*ℹ️ Send Important Details*
Set your starting price.
_Ex. $8.95/starting price_

❓ Session is the conversation with your client to do they're request. 

*For example*, _Jacob asked you to make a referral bot.
You will set your own starting price, but the price can change based on your own._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check if the input is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

// Validate if the input is a number
if (!isNumeric(message)) {
  Bot.sendMessage("*ℹ️ Invalid Input*\nPlease enter a valid number.")
  Bot.runCommand("/createListingSetPrice")
} else {
  if (parseFloat(message) > 5000) {
    Bot.sendMessage(
      "*ℹ️ Price Is Too High*\nThe price limit is $20000/starting price\n_Please enter a lower price._"
    )
    Bot.runCommand("/applyCoderSetPricePerSession")
  } else {
    let tempCoderData = User.getProperty("tempCoderInfo")
    tempCoderData.sessionPrice = message;
    User.setProperty("tempCoderInfo", tempCoderData, "json")
    Bot.runCommand("/applyCoderSetDescription")
  }
}

