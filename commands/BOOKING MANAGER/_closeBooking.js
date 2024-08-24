/*CMD
  command: /closeBooking
  help: 
  need_reply: false
  auto_retry_time: 
  folder: BOOKING MANAGER

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Define the closeBooking function outside of the if block
function closeBooking(userId, params) {
  var args = params.split(" ")
  var message = args[1]
  var bookingHistory = Bot.getProperty("booked" + userId, [])
  var bookingIndex = bookingHistory.findIndex(b => b.uniqueId === message)

  if (bookingIndex === -1) {
    Bot.sendMessage("*❌ No booking found for the given ID*")
    return
  }

  var coder = Bot.getProperty("Coder" + message);
  var coderName = Bot.getProperty("coderName" + message);
  var coderId =  Bot.getProperty("coderId" + message);
  var ClientFullName = user.first_name + " " + user.last_name;
  var booking = bookingHistory[bookingIndex]
  var bookingDate = new Date(booking.date)
  var currentDate = new Date()
  var timeDifference = currentDate - bookingDate
  var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))

  if (hoursDifference < 24) {
    Bot.sendMessage(
      "*❌ You can only close the booking after 24 hours from the booking date*"
    )
    return
  }

  bookingHistory.splice(bookingIndex, 1)
  Bot.setProperty("booked" + userId, bookingHistory, "json")

  var trackingJson = Bot.getProperty("tracking")
  trackingJson.Status = "CLOSED"
  Bot.setProperty("tracking", trackingJson, "json")

  Bot.sendMessage(
    "*🛡️ ANTI FRAUD POLICY*\nYou're booking has been closed for a moment.\nAnti-fraud policy has been activated, please wait a couple hours to refund your funds."
  )
  Bot.sendMessageToChatWithId(coderId, "*🛡️ ANTI FRAUD POLICY*\nYou're booking has been closed for a moment.\nAnti-fraud policy has been activated by *"+ClientFullName+"*, Since you didn't update your booking status *IN-PROGRESS* in the past 24 hours, your client can eventually close the booking.\n\nIf you already started your project, contact your client and us by *Support*."
  )
  Api.sendMessage({
    chat_id: 6761138851,
    text:
      "🛡️ BOOKING CLOSED ($" +
      booking.price +
      ")\n"+ClientFullName+"\nHas closed the " +
      coderName +
      " booking by " +
      coder +
      ".\nPlease await for an update from "+coder+" and "+ClientFullName+" in 5 hours.",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "📤 REFUND", callback_data: "refund_" + booking.price }]
      ]
    })
  })
}

// Check if params contains the command 'close' and call the closeBooking function
if (params && params.includes("close")) {
  var userId = user.telegramid // Get the user's Telegram ID
  closeBooking(userId, params) // Call the closeBooking function with the userId and params
}

