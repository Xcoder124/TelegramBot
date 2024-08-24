/*CMD
  command: /createListingSetPrice
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER
*ℹ️ Set a Price in your Listing*
_INFO: 1000 is equivalent to $1_

Set a new price for your listing.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check if the input is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Validate if the input is a number
if (!isNumeric(message)) {
  Bot.sendMessage("*ℹ️ Invalid Input*\nPlease enter a valid number.");
  Bot.runCommand("/createListingSetPrice");
} else {
  if (parseFloat(message) > 1000000) {
    Bot.sendMessage("*ℹ️ Price Is Too High*\nThe price limit is 1,000,000 > $1000.\n_Please enter a lower price._");
    Bot.runCommand("/createListingSetPrice");
  } else {
    let tempData = User.getProperty("temporaryListingInfo");
    tempData.listingPrice = message;
    User.setProperty("temporaryListingInfo", tempData, "json");
    Bot.runCommand("createListingSetDescription");
  }
}

