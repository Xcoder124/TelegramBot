/*CMD
  command: /hireCoder
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CODERS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👤 get support
  group: 
CMD*/

var supportList = Bot.getProperty("supportListing");
var supportStatus = Bot.getProperty("supportStatus");

if (supportStatus === "maintenance") {
  Bot.sendMessage("🛠️ The support service is currently under maintenance. Please check back later.");
} else if (supportStatus === "offline") {
  Bot.sendMessage("🛍️ The support service is offline. Please check back later.");
} else if (!supportList || supportList.trim() === "") {
  Bot.sendMessage("*👨‍💻 CODERS SUPPORT:*\n_Unfortunately, there's no available coders at this time._\n\n*No support is available right now.*\n\nWe aren't able to find any coders this time. Stay tuned.");
} else {
  var supportCount = (supportList.match(/\d+\.\s/g) || []).length;
  var coders = supportList.split("\n");
  var formattedSupportList = "";

  for (var i = 0; i < coders.length; i++) {
    if (coders[i].trim() !== "") {
      var coderInfo = coders[i].split(". ");
      if (coderInfo.length >= 2) {
        var coderIndex = coderInfo[0];
        var coderDetails = coderInfo[1].split(" | ");
        if (coderDetails.length === 4) {
          var coderNamePrice = coderDetails[0].split(" ($");
          var coderName = coderNamePrice[0];
          var coderPrice = coderNamePrice[1].replace(")", "");
          var coderLevel = coderDetails[1].split(": ")[1];
          var coderRatingRaters = coderDetails[2].split(": ")[1].split(" (");
          var coderRating = coderRatingRaters[0];
          var coderRaters = coderRatingRaters[1].replace(" raters)", "");
          var coderWorkingHours = coderDetails[3].split(": ")[1];

          formattedSupportList += 
            coderIndex + ". *👨‍💻 " + coderName + "* *($" + coderPrice + "/starting price)*\n" +
            "*ℹ️ Level:* " + coderLevel + "  \n" +
            "*⭐ Rating:* " + coderRating + " (" + coderRaters + " raters) \n" +
            "*⏳ Working Hours:* " + coderWorkingHours + "\n" +
            "=================================\n";
        }
      }
    }
  }

  Bot.sendMessage(
    "*👨‍💻 CODERS SUPPORT* (" + supportCount + "):\nHire a coder to help you build your bot!\n*TIP:* _Choose a coder that has a higher rating and positive reviews._\n\n" +
    formattedSupportList + 
    "\n_This coders are not BJSMasterSyntaxJava scripters, so we have no full control about the results and issues.\nBut we have a bit control in your funds because we are the one who handles your funds._"
  );

  Bot.runCommand("viewCoderInfo");
}
