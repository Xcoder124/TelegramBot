/*CMD
  command: /report_others
  help: 
  need_reply: true
  auto_retry_time: 
  folder: SUPPORT
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var reportOthers =
User.getProperty("reportOthers")
    // Update the report count
    var reportCount = Bot.getProperty("report_count", 0) + 1;
    Bot.setProperty("report_count", reportCount, "integer");

    // Check if the high demand message should be set
    if (reportCount > 2) {
      Bot.setProperty("high_demand", true, "boolean");
    }

    // Check for high demand
    var highDemand = Bot.getProperty("high_demand", false);

    Bot.sendMessageToChatWithId("6761138851", "*📩 Report from "+user.telegramid+".*\n\n_"+message+"_")
    var reportOtherMessage = "✅ Your issue has been reported to the admin.\nExpect a reply within 24 hours.";
    if (highDemand) {
      reportOtherMessage += "\n\n_⚠️ We are currently experiencing high demand. Please be patient as response times may be longer than usual._";
    }
    
 // Inform the user
    Bot.sendMessage(reportOtherMessage);
