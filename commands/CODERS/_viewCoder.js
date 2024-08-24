/*CMD
  command: /viewCoder
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

try {
  // Function to check if the user is banned
  function isBanned(coderId) {
    let banUntilStr = User.getProperty("banUntil_" + coderId);
    if (!banUntilStr) return false;
    // Removed the unnecessary Bot.runCommand("@");
    let banUntilDate = new Date(banUntilStr);
    return new Date() < banUntilDate; // Check if the current date is before the banUntil date
  }

  // Function to get the average rating for the coder
  function getCoderAverageRating(coderUniqueId) {
    var currentRatingData = Bot.getProperty("coderRating" + coderUniqueId, {
        totalRatings: 0,
        numberOfRatings: 0
    });
    var averageRating = (currentRatingData.totalRatings / currentRatingData.numberOfRatings) || 0; // Calculate average rating
    var numberOfRatings = currentRatingData.numberOfRatings || 0;

    return {
        averageRating: averageRating.toFixed(2),
        numberOfRatings: numberOfRatings
    };
  }

  // Command to view coder details
  var params = message.split(" ");
  var coderId = params[1];
  var coderUniqueId = params[2];

  // Fetch coder details
  var tempCoderInfo = Bot.getProperty("tempCoderInfo" + coderUniqueId, null);

  if (!tempCoderInfo) {
    Bot.sendMessage("Coder details not found.");
    return;
  }

  if (isBanned(coderId)) {
    Bot.sendMessage("This coder is currently banned.");
    return;
  }

  var coderName = tempCoderInfo.coderName;
  var sessionPrice = tempCoderInfo.sessionPrice;
  var coderDescription = tempCoderInfo.coderDescription;
  var workingHours = tempCoderInfo.workingHours;
  var userLevel = tempCoderInfo.userLevel;
  var status = tempCoderInfo.status;

  var ratingData = getCoderAverageRating(coderUniqueId);
  var coderSumRater = Libs.ResourcesLib.anotherChatRes("coderSumRater" + coderUniqueId, "global").value();

  var viewMessage = 
    "📄 *CODER INFO*\n" +
    "*Coder Name:* " + coderName + "\n" +
    "*Session Price:* " + sessionPrice + "💎\n" +
    "*Description:* " + coderDescription + "\n" +
    "*Working Hours:* " + workingHours + "\n" +
    "=============================\n" +
    "📊 *CODER STATISTICS*\n" +
    "*User Level:* " + userLevel + "\n" +
    "*Rating:* " + ratingData.averageRating + "/5.00\n" +
    "*No of Raters:* " + ratingData.numberOfRatings + "\n" +
    "*Total Ratings:* " + coderSumRater + "\n" +
    "=============================\n" +
    "📄 *STATUS*\n" +
    "*Status:* " + status + "\n" +
    "=============================";

  Bot.sendMessage(viewMessage, { parse_mode: "Markdown" });
} catch (error) {
  Bot.run({
    command: "!",
    options: { errorMessage: error.message }
  });
}

