/*CMD
  command: /deleteCoderListing
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS
  answer: Enter coder user id

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to gather and delete coder listing
function deleteCoderListing(coderId) {
  var supportList = Bot.getProperty("supportListing");
  if (!supportList) {
    Bot.sendMessage("You have no coders listed.");
    return;
  }

  // Get the coder information using coderId
  var permCoderInfo = Bot.getProperty("permCoderInfo" + coderId);

  // Ensure that the coder exists before attempting to delete it
  if (!permCoderInfo) {
    Bot.sendMessage("❌ Coder with ID " + coderId + " not found.");
    return;
  }

  // Display the coder information before deletion
  Bot.sendMessage(
    "🔍 *Coder Information*\n\n" +
    "*Name:* " + permCoderInfo.coderName + "\n" +
    "*Price:* $" + permCoderInfo.sessionPrice + "\n" +
    "*Description:* " + permCoderInfo.coderDescription + "\n" +
    "*Status:* " + permCoderInfo.status + "\n" +
    "*Level:* " + permCoderInfo.userLevel + "\n\n" +
    "_The coder with ID " + coderId + " will now be deleted.\nThis cannot be undone._"
  );

  // Delete the coder properties
  Bot.setProperty("permCoderInfo" + coderId, null);

  // Remove the coder from the support listing
  var supportListingArray = supportList.split("\n");
  var updatedSupportListArray = supportListingArray.filter(
    item => !item.includes(coderId + ".")
  );
  Bot.setProperty(
    "supportListing",
    updatedSupportListArray.join("\n"),
    "string"
  );

  // Update coder counters
  var coderUniqueIDs = Libs.ResourcesLib.anotherChatRes("coderUniqueIDs", "global");
  coderUniqueIDs.add(-1);

  // Reassign coder numbers to fill the gap left by the deleted coder
  var updatedSupportList = [];
  for (var i = 0; i < updatedSupportListArray.length; i++) {
    var item = updatedSupportListArray[i];
    var currentCoderId = parseInt(item.split(".")[0]);
    var newCoderId = i + 1;

    // Update the properties with the new coder ID
    var currentCoderInfo = Bot.getProperty("permCoderInfo" + currentCoderId);
    if (currentCoderInfo) {
      currentCoderInfo.coderId = newCoderId;
      Bot.setProperty("permCoderInfo" + newCoderId, currentCoderInfo, "json");
      Bot.setProperty("permCoderInfo" + currentCoderId, null);
    }

    updatedSupportList.push(newCoderId + ". " + item.split(". ")[1]);
  }

  Bot.setProperty("supportListing", updatedSupportList.join("\n"), "string");

  if (updatedSupportList.length === 0) {
    Bot.sendMessage("You have no coders listed.");
  } else {
    Bot.sendMessage(
      "*ℹ️ INFO*\nYour coder with ID " + coderId + " has been permanently deleted."
    );
  }
}

// Example usage
var coderId = message; // Assuming the coder ID to delete is provided as the message
deleteCoderListing(coderId);
