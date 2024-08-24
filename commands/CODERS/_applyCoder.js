/*CMD
  command: /applyCoder
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

// Function to check the request status
function checkRequestStatus() {
  var requestOpen = User.getProperty("requestOpen");
  var requestClose = User.getProperty("requestClose");
  var requestCount = User.getProperty("requestCount") || 0;
  var requestLimit = User.getProperty("requestLimit");

  if (requestOpen) {
    if (requestCount < requestLimit) {
      // Increment request count
      requestCount++;
      User.setProperty("requestCount", requestCount);
      
      // Send Typeform link
      var typeformLink = "[Register](https://a188c2iffjr.typeform.com/to/ozJxNV4m)"; // Replace with your actual Typeform link
      Bot.sendMessage("Please fill out the following form to apply:\n" + typeformLink);
    } else {
      // If limit reached, close requests
      User.setProperty("requestOpen", false);
      User.setProperty("requestClose", true);
      User.setProperty("requestCount", 0);
      
      Bot.sendMessage("👨‍💻 REQUESTS ARE CLOSED\n\nUnfortunately, the bot is not accepting requests right now.");
    }
  } else if (requestClose) {
    // Request is closed message
    Bot.sendMessage("👨‍💻 REQUESTS ARE CLOSED\n\nUnfortunately, the bot is not accepting requests right now.");
  } else {
    // Fallback message if neither open nor close is set (shouldn't normally occur)
    Bot.sendMessage("Request status is not properly set. Please contact support.");
  }
}

// Execute the request status check
checkRequestStatus();
