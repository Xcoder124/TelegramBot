/*CMD
  command: with
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

// Function to view the user's balance in withdrawableBalance
function viewBalance() {
  // Get the user's withdrawable balance
  var withdrawableBalance = Libs.ResourcesLib.userRes("withdrawableBalance");

  // Send a message to the user displaying their balance
  Bot.sendMessage("*💰 Your withdrawable balance is:* " + withdrawableBalance.value() + " withdrawableBalance.");
}

// Run the function to display the balance
viewBalance();
