/*CMD
  command: viewCoderInfo
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check if a value is numeric
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var userId = user.telegramid;
var coderUniqueIDs = Libs.ResourcesLib.anotherChatRes("coderUniqueIDs", "global");

// Function to display coder information along with their projects
function displayCoderInfo(value) {
    var coderName = Bot.getProperty("coderName" + value);
    var coderLevel = Bot.getProperty("coder_level" + value);
    var sessionPrice = Bot.getProperty("coderPrice" + value);
    var coderDescription = Bot.getProperty("coderDescription" + value);
    var status = Bot.getProperty("coderStatus" + value);
    var ratingData = Bot.getProperty("coderRating" + value, {
        totalRatings: 0,
        numberOfRatings: 0,
        averageRating: 0
    });

    var sessions = Libs.ResourcesLib.anotherChatRes("sessions" + value, "global").value();
    var noRated = Libs.ResourcesLib.anotherChatRes("sumRated" + value, "global").value();
    sessions = isNaN(sessions) ? 0 : sessions;
    noRated = isNaN(noRated) ? 0 : noRated;

    var error = Bot.getProperty("Issues" + value) || "No reported issues";

    var availabilityKey = "OnOff" + value;
    var available = Bot.getProperty("Sello" + Bot.getProperty(availabilityKey));

    var bookingHistory = Bot.getProperty("booked" + userId, []);

    var coderProjects = Bot.getProperty("coderProjects" + value, {});

    if (available == "Off") {
        Bot.sendMessage("Not Available");
    } else {
        var alreadyBookedTracking = bookingHistory.find(coder => coder.track === value);
        var alreadyBooked = bookingHistory.some(coder => coder.uniqueId === value);
        if (alreadyBooked) {
            sessionPrice =
                "*✅ BOOKED*\nYou have booked *" + coderName + "* already.\nTracking ID: *" + alreadyBookedTracking + "*\n_Check your booking in /bookingOverview_";
        } else {
            sessionPrice = "*$" + sessionPrice + "/session*";
        }

        var projectsDisplay = Object.values(coderProjects).map(project => {
            return `*👨‍💻 ${project.projectName}*\n_📖 ${project.description}_\n*🌐 ${project.technologies.join(", ")}*`;
        }).join("\n\n");

        var Lmessage =
            "*📚 " + coderName + "*\n" +
            "*ℹ️ Level:* " + coderLevel + "\n" +
            "==================================\n" +
            coderDescription + "\n" +
            "==================================\n" +
            sessionPrice + "\n" +
            "==================================\n" +
            "⭐ *Rating*: " + ratingData.averageRating.toFixed(2) + "/5.00 ~ " + noRated + " users rated this\n" +
            "🛒 *Sessions*: " + sessions + "\n" +
            "==================================\n" +
            "⚠️ *Recent Errors*: " + error + "\n" +
            "⌛ *Status*: " + status + "\n" +
            "==================================\n" +
            "*📂 Projects:*\n" + (projectsDisplay || "No projects available") + "\n" +
            "==================================\n";

        if (!alreadyBooked) {
            Lmessage += "To book input the number (" + value + ") you want to book if you have made a decision.";
        }

        Bot.sendMessage(Lmessage);
    }
}

// Check if the message is a number and within the range of coder IDs
if (!isNumeric(message)) {
    Bot.sendMessage("*📛 Invalid value. Enter only numeric value. Try again*");
} else if (message > coderUniqueIDs.value()) {
    Bot.sendMessage("❓ No coder was found (*" + message + "*)");
} else {
    displayCoderInfo(message);
    Bot.runCommand("/bookCoder");
}
