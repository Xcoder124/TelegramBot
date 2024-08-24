/*CMD
  command: /checkCurrencyPrice
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Retrieve the current value of the game currency from the property
let gameCurrencyValue = Bot.getProperty("gameCurrencyValue")

// Check if the game currency value has been set
if (gameCurrencyValue) {
  // Send a message to the user with the current currency value
  Bot.sendMessage(
    "The current value of the game currency is: " + gameCurrencyValue.toFixed(2)
  )
} else {
  // If the currency value is not set, send a default message
  Bot.sendMessage("The game currency value has not been set yet.")
}

