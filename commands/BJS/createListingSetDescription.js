/*CMD
  command: createListingSetDescription
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER
*ℹ️ Set Description*
Enter your description for your product.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let itemDescription = message;
if (itemDescription.length <= 2500) {
  let tempData = User.getProperty("temporaryListingInfo");
  tempData.listingDescription = itemDescription;
  User.setProperty("temporaryListingInfo", tempData, "json");
  Bot.runCommand("createListingSetProduct");
} else {
  Bot.sendMessage("Description is too long. Please limit it to 570 characters.");
  Bot.runCommand("createListingSetDescription");
}

