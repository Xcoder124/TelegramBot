/*CMD
  command: /request
  help: 
  need_reply: false
  auto_retry_time: 
  folder: admins

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to open requests
function openRequests(limit) {
  User.setProperty("requestOpen", true);
  User.setProperty("requestClose", false);
  User.setProperty("requestCount", 0);
  User.setProperty("requestLimit", limit);
  
  Bot.sendMessage("Requests are now open. Limit: " + limit);
}

// Function to close requests
function closeRequests() {
  User.setProperty("requestOpen", false);
  User.setProperty("requestClose", true);
  
  Bot.sendMessage("Requests are now closed.");
}

// Parse the command and execute accordingly
function handleRequestCommand(commandText) {
  var parts = commandText.split(" ");
  var action = parts[1];
  
  if (action == "open" && parts.length == 3) {
    var limit = parseInt(parts[2]);
    if (!isNaN(limit) && limit > 0) {
      openRequests(limit);
    } else {
      Bot.sendMessage("Please provide a valid number of requests to open.");
    }
  } else if (action == "close" && parts.length == 2) {
    closeRequests();
  } else {
    Bot.sendMessage("Invalid command. Use /request open <number> to open requests or /request close to close requests.");
  }
}

// Extract the command text from the message
var commandText = message;
handleRequestCommand(commandText);
