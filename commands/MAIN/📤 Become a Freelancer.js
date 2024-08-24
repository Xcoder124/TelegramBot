/*CMD
  command: 📤 Become a Freelancer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /partner
  group: 
CMD*/

// Get the coder property of the user
var freelancer = User.getProperty("freelancer")

// Function to check the request status and send appropriate message
function checkRequestStatus() {
  // Get the request status properties
  var requestOpen = User.getProperty("requestOpen")
  var requestClose = User.getProperty("requestClose")
  var requestCount = User.getProperty("requestCount") || 0
  var requestLimit = User.getProperty("requestLimit")

  if (requestOpen) {
    if (requestCount >= requestLimit) {
      // Close requests and reset counter if limit is reached
      User.setProperty("requestOpen", false)
      User.setProperty("requestClose", true)
      User.setProperty("requestCount", 0)

      Bot.sendMessage(
        "👨‍💻 REQUESTS ARE CLOSED\n\nUnfortunately, the bot is not accepting requests right now."
      )
    } else {
      // Increment request count
      // requestCount++
      // User.setProperty("requestCount", requestCount)

      // Request is open message
      Bot.sendMessage(
        "👨‍💻 BE A CODER AND SELLER!\n\nBJSMasterSyntaxJava is open for requests.\n\nPlease prepare the following information:\n- Real Name\n- Birthday\n- Address\n- Contact Number\n- Experience\n- Projects Made\n- Education\n- Bio\n- Personal Details (*ID's*) (*OPTIONAL*)\n\n_All personal information will be safe._"
      )
      Bot.runCommand("/applyCoder")
    }
  } else if (requestClose) {
    // Request is closed message
    Bot.sendMessage(
      "👨‍💻 REQUESTS ARE CLOSED\n\nUnfortunately, the bot is not accepting requests right now."
    )
  }
}

// Check if the user is a coder
if (freelancer) {
  // If user is a coder, run the coder portfolio command
  Bot.runCommand("mainCoderPanel")
}
  checkRequestStatus()
