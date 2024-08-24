/*CMD
  command: setWithdrawalAmountCoderString
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CASHOUT

  <<ANSWER
*💸 BJSMasterSyntaxJava Withdrawal*
Send the amount of your withdrawal, heres the guide rates for you.


*MINIMUM THERESHOLD*
Bitcoin (BTC) - *$10*
Litecoin (LTC) - *$1*
Tron (TRX) - *$1*
Dogecoin (DOGE) - *$5*
Tether USD (USDT ERC-20) - *$5*
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to set the withdrawal amount
function setAmount(message) {
  var amount = parseFloat(message);
  var withdrawalDetails = User.getProperty('withdrawalDetails');
  var currency = withdrawalDetails.currency;
  
  // Define minimum withdrawal amounts for each cryptocurrency
  var minWithdrawal = {
    'BTC': 10,
    'LTC': 1,
    'TRX': 1,
    'DOGE': 5,
    'USDT': 5,
    'ETH': 5,
    'BNB': 5,
    'SHIB': 1,
    'BCH': 5
  };

  // Get the user's withdrawable balance
  var withdrawableBalance = Libs.ResourcesLib.userRes("withdrawableBalance");

  // Check if the user meets the minimum threshold and has enough balance
  if (amount >= minWithdrawal[currency]) {
    if (withdrawableBalance.value() >= amount) {
      withdrawableBalance.add(-amount)
      // Update the amount in the withdrawal details
      withdrawalDetails.amount = amount;
      User.setProperty('withdrawalDetails', withdrawalDetails, 'json');
      
      // Proceed to set the address
      Bot.runCommand('setWithdrawalAddressCoderStringCode');
    } else {
      // Inform user they don't have enough balance
      Bot.sendMessage("*❌ Insufficient balance.*\nYour current balance is *$" + withdrawableBalance.value() + "*,\nbut you tried to withdraw *$" + amount + "*.\nPlease check your balance and try again.");
    }
  } else {
    // Inform user about the minimum withdrawal amount
    Bot.sendMessage("*❌ Does not meet the standards.*\nThe minimum withdrawal for *" + currency + "* is *$" + minWithdrawal[currency]+"*\nTry again.");
  }
}
setAmount(message);
