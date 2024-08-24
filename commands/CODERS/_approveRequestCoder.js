/*CMD
  command: /approveRequestCoder
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CODERS
  answer: oksy

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to get the average rating for the coder
function getCoderAverageRating(coderUniqueId) {
    var currentRatingData = Bot.getProperty("coderRating" + coderUniqueId, {
        totalRatings: 0,
        numberOfRatings: 0
    });
    var averageRating = currentRatingData.averageRating || 0;
    var numberOfRatings = currentRatingData.numberOfRatings || 0;

    return {
        averageRating: averageRating.toFixed(2),
        numberOfRatings: numberOfRatings
    };
}

// Command to approve the listing
var params = message.split(" ");
var coderUniqueId = params[1];

// Retrieve temporary coder information
var tempCoderData = Bot.getProperty("tempCoderData" + coderUniqueId);

if (!tempCoderData) {
    Bot.sendMessage("Error: Coder information not found.");
    return;
}

// Check if the product status is DECLINED
if (tempCoderData.status === "DECLINED") {
    Bot.sendMessage("Unable to approve a coder that has been declined.");
    return;
}

// Update coder status to APPROVED
tempCoderData.status = "APPROVED";

// Define the properties
const coderProperties = {
  Coder: tempCoderData.coder,
  coderName: tempCoderData.coderName,
  coderId: tempCoderData.coderId,
  coderPrice: tempCoderData.sessionPrice.toString(),
  coderDescription: tempCoderData.coderDescription,
  workingHours: tempCoderData.workingHours,
  coderStatus: "APPROVED",
  coder_level: tempCoderData.userLevel
};

// Set properties for the approved coder
Object.entries(coderProperties).forEach(([key, value]) => {
  Bot.setProperty(key + coderUniqueId, value, "string");
});

// Get properties for the approved coder
const retrievedCoderProperties = {};
Object.keys(coderProperties).forEach(key => {
  retrievedCoderProperties[key] = Bot.getProperty(key + coderUniqueId);
});

var coderUniqueIDs = Libs.ResourcesLib.anotherChatRes("coderUniqueIDs", "global");
var coder = retrievedCoderProperties['Coder'];
var coderName = retrievedCoderProperties['coderName'];
var coderId = retrievedCoderProperties['coderId'];
var sessionPrice  = retrievedCoderProperties['coderPrice'];
var coderDescription = retrievedCoderProperties['coderDescription'];
var workingHours = retrievedCoderProperties['workingHours'];
var coderStatus = retrievedCoderProperties['coderStatus'];
var coder_level = retrievedCoderProperties['coder_level'];

// Save temporary product information
var permCoderInfo = {
  coder: coder,
  coderUniqueId: coderUniqueIDs.value(),
  coderId: coderId,
  coderName: coderName,
  sessionPrice: sessionPrice,
  finalPrice: sessionPrice,
  coderDescription: coderDescription,
  workingHours: workingHours,
  userLevel: coder_level,
  status: coderStatus
};

// Update the coder list
var supportList = Bot.getProperty("supportListing");
var permCoderInfo = Bot.setProperty("permCoderInfo" + coderId, permCoderInfo, "json");
var ratingData = getCoderAverageRating(coderUniqueId);
var coderSumRater = Libs.ResourcesLib.anotherChatRes("coderSumRater" + coderUniqueId, "global").value();

var coderListEntry = coderUniqueId + ". " + tempCoderData.coderName + " ($" + tempCoderData.sessionPrice.toFixed(2) + ") | Level: " + tempCoderData.userLevel + " | Rating: " + ratingData.averageRating + " (" + ratingData.numberOfRatings + " raters) | Working Hours: " + tempCoderData.workingHours;

if (supportList === undefined) {
    Bot.setProperty("supportListing", coderListEntry, "string");
} else {
    Bot.setProperty("supportListing", supportList + "\n" + coderListEntry, "string");
}

// Notify the coder
var coderId = tempCoderData.coderId;
Api.sendMessage({
    chat_id: coderId,
    text: "```json\n" +
      "{\n" +
      "  \"title\": \"✅ Request has been Approved\",\n" +
      "  \"description\": \"Your request has been approved and your coder profile has been created. Please go to the ⚙️ MORE>📥 Become a Partner to view your coder profile.\",\n" +
      "  \"message\": \"Your listing has been reviewed and approved. Check it out!\"\n" +
      "}\n" +
      "```",
    parse_mode: "Markdown"
});

Bot.sendMessage("The coder with ID " + coderUniqueId + " has been approved and listed.");
