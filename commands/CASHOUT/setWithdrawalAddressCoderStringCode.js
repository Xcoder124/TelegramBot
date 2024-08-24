/*CMD
  command: setWithdrawalAddressCoderStringCode
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CASHOUT

  <<ANSWER
*💸 BJSMasterSyntaxJava Withdrawal*
Send your receiving address, we recommend you to use TrustWallet to receive low amount of withdrawals.


_Incorrect withdrawal address could potentially lost the funds you will receive. On any lost will happen here are not responsible for it._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to set the withdrawal address
function setAddress(message) {
  var address = message.trim();
  var withdrawalDetails = User.getProperty('withdrawalDetails');
  var currency = withdrawalDetails.currency;
  
  // Validate the address based on its cryptocurrency
  if (validateAddress(address, currency)) {
    // Update the address in the withdrawal details
    withdrawalDetails.address = address;
    User.setProperty('withdrawalDetails', withdrawalDetails, 'json');
    
    // Proceed with the withdrawal
    Bot.runCommand('/withdrawal');
  } else {
    // Inform user about the invalid address
    Bot.sendMessage("*❌ Invalid Format*\nThe provided address is not a valid *" + currency + "* address.\nExample: _" + getExampleAddress(currency) +"_");
  }
}

// Function to validate the address based on its cryptocurrency
function validateAddress(address, currency) {
  var regex;
  switch (currency) {
    case 'BTC':
      // Bitcoin address validation (P2PKH, P2SH, Bech32)
      regex = /^(1[a-km-zA-HJ-NP-Z1-9]{25,34}|3[a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-zA-HJ-NP-Z0-9]{39,59})$/;
      break;
    case 'LTC':
      // Litecoin address validation (P2PKH, P2SH, Bech32)
      regex = /^(L[a-km-zA-HJ-NP-Z1-9]{26,33}|M[a-km-zA-HJ-NP-Z1-9]{26,33}|ltc1[a-zA-HJ-NP-Z0-9]{39,59})$/;
      break;
    case 'TRX':
      // TRON address validation
      regex = /^T[a-zA-HJ-NP-Z0-9]{33}$/;
      break;
    case 'DOGE':
      // Dogecoin address validation
      regex = /^(D[a-km-zA-HJ-NP-Z1-9]{25,34})$/;
      break;
    case 'USDT':
      // Tether address validation (ERC-20, TRC-20)
      regex = /^(0x[a-fA-F0-9]{40}|T[a-zA-HJ-NP-Z0-9]{33})$/;
      break;
    default:
      return false;
  }
  return regex.test(address);
}

// Function to get an example address for a given cryptocurrency
function getExampleAddress(currency) {
  switch (currency) {
    case 'BTC':
      return '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Example Bitcoin address
    case 'LTC':
      return 'LZ1Q2W3E4R5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L0'; // Example Litecoin address
    case 'TRX':
      return 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'; // Example TRON address
    case 'DOGE':
      return 'D7Y55p9QFY7s8z9y8z9y8z9y8z9y8z9y8z9y8z9y'; // Example Dogecoin address
    case 'USDT':
      return '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Example Tether address (ERC-20)
    default:
      return '';
  }
}

setAddress(message);

