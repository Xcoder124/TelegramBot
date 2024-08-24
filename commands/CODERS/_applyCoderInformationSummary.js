/*CMD
  command: /applyCoderInformationSummary
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CODERS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Collect product details from the user
var supportList = Bot.getProperty("supportListing");
var coderFullName = user.first_name + " " + user.last_name;
var coderId = user.telegramid;
var coder = coderFullName + " (" + coderId + ")";
var tempCoderInfo = User.getProperty("tempCoderInfo");
  var coderName = tempCoderInfo.coderTitle;
  var sessionPrice = parseFloat(tempCoderInfo.sessionPrice);
  var coderDescription = tempCoderInfo.coderDescription;
  var workingHours = tempCoderInfo.workingHours;
var levelSystem = Bot.getProperty("levelSystem", []);

// Initialize user's level and find the corresponding level data
let userLevel = User.getProperty("user_level" + user.telegramid, 1);
var levelData = levelSystem.find(level => level.level === userLevel);

// If level data is found, use the level name, otherwise default to "Level 1"
let levelName = levelData ? `${userLevel} (${levelData.name})` : "Level 1 *(Beginner)*";

function isBanned(userId) {
  let banUntilStr = User.getProperty("banUntil_" + coderId);
  if (!banUntilStr) return false;
  Bot.runCommand("@");
  return;
}

// Deduct 5% for bot fees
// var finalPrice = sessionPrice - (sessionPrice * 0.05);

var coderUniqueIDs = Libs.ResourcesLib.anotherChatRes("coderUniqueIDs", "global");
coderUniqueIDs.add(1);

// Save temporary product information
var tempCoderData = {
  coderUniqueId: coderUniqueIDs.value(),
  coder: coder,
  coderId: coderId,
  coderName: coderName,
  sessionPrice: sessionPrice,
  finalPrice: sessionPrice,
  coderDescription: coderDescription,
  workingHours: workingHours,
  userLevel: levelName,
  status: "PENDING"
};

Bot.setProperty("tempCoderData" + coderUniqueIDs.value(), tempCoderData, "json");

// Create approval message for admin
var approvalMessage =
  "📃 *CODER APPROVAL REQUIRED*\n" +
  coderName + " ($" + sessionPrice.toFixed(2) + ") - [" + coderFullName + "](tg://user?id=" + coderId + ")\n" +
  " - SellerId: " + coderId + "\n" +
  " - CoderUniqueId: " + coderUniqueIDs.value() + "\n" +
  "/view " + coderId + " " + coderUniqueIDs.value() + "\n\n";

// Inline keyboard for admin to Accept or Decline
var buttons = [
  [{ text: "Accept", callback_data: "/approveRequestCoder " + coderUniqueIDs.value() }],
  [{ text: "Decline", callback_data: "/declineRequestCoder " + coderUniqueIDs.value() }]
];

// Send message to admin
Api.sendMessage({
  chat_id: "6761138851", // Replace with actual admin Telegram ID
  text: approvalMessage,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: buttons }
});

// Notify user that the listing is under review
Api.sendMessage({
  chat_id: coderId,
  text: "```json\n" +
    "{\n" +
    "  \"title\": \"⌛ Your REQUEST needs approval.\",\n" +
    "  \"description\": \"Dear " + user.first_name + ", your request has been sent for admin approval. You will be able to see your Coder Profile soon once it is approved.\",\n" +
    "  \"message\": \"We'll respond to your request later.\"\n" +
    "}\n" +
    "```",
  parse_mode: "Markdown"
});

