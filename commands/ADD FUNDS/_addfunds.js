/*CMD
  command: /addfunds
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADD FUNDS

  <<ANSWER
*BJSMasterSyntaxJavaBot*
How much you want to add in your account funds?


*💎 RATES:*
*💱 OxaPay (cryptocurrencies)* - _min. 💎100_
RATE: *💎1,000 - $1*
_👤 More Payment Methods are still in progress.._


*REMARKS:* _Delays can occur anytime, if you dont received your funds for upto 1 hour, contact us emmidiately._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /setAmount
var amount = parseFloat(message);
if (amount < 1000) {
  Bot.sendMessage("The minimum amount must be 💎1000");
} else {
  User.setProperty("depositAmount", amount, "float");
  Bot.runCommand("/addFundsChooseType");
 }
