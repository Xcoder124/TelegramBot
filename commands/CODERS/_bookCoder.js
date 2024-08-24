/*CMD
  command: /bookCoder
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

try {
  var coderUniqueIDs = Libs.ResourcesLib.anotherChatRes(
    "coderUniqueIDs",
    "global"
  )
  var userId = user.telegramid
  var uniqueId = data.message // Assuming data.message contains the input value
  var clientName = user.first_name + user.last_name

  function sendMessageAndExit(msg) {
    Bot.sendMessage(msg)
    return
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  if (!isNumeric(message)) {
    sendMessageAndExit(
      "*📛 Invalid value. Enter only numeric value. Try again*"
    )
    return
  }

  if (message > coderUniqueIDs.value()) {
    sendMessageAndExit(
      "*❌ NO PRODUCT ID WAS FOUND*\nNo Product ID was found with the number of (*" +
        message +
        "*)."
    )
    return
  }

  function isBanned(userId) {
    let banUntilStr = User.getProperty("banUntil_" + userId)
    if (!banUntilStr) return false
    Bot.runCommand("@")
    return
  }

  var bookingStatus = Bot.getProperty("bookingStatus" + message)
  var bookingAvailable = Bot.getProperty("bookingAvailable" + message)

  if (bookingAvailable === "No") {
    var coder = Bot.getProperty("Coder" + message)
    sendMessageAndExit(
      "*❌ Not Available*\nThis product is not available.\n_Contact *" +
        coder +
        "* for valid reasons._"
    )
    return
  }

  var usd = Libs.ResourcesLib.userRes("usd")
  var coder = Bot.getProperty("Coder" + message)
  var coderName = Bot.getProperty("coderName" + message)
  var ClientFullName = user.first_name + " " + user.last_name
  var coderId = Bot.getProperty("coderId" + message)
  var usd2 = Libs.ResourcesLib.anotherUserRes("usd", coder)
  var price = parseFloat(Bot.getProperty("coderPrice" + message))
  var bookingHistory = Bot.getProperty("booked" + userId, [])

  // Check if the item is already in the purchase history
  if (bookingHistory.some(coder => coder.uniqueId === message)) {
    sendMessageAndExit("*✅ BOOKED*\nYou have booked *"+coderName+"* already.\n_Check your booking in /bookingOverview_")
    return
  }

  if (usd.value() < price) {
    sendMessageAndExit(
      "*❌ Insufficient Balance*\n_No balance is available, to purchase this product._"
    )
    return
  }
  let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let TrackingUniqueId = "#"
  for (let i = 0; i < 10; i++) {
    TrackingUniqueId += charset.charAt(
      Math.floor(Math.random() * charset.length)
    )
  }

  let trackingJson = {
    TrackingUniqueId: TrackingUniqueId,
    Status: "OPEN",
    date: new Date().toISOString()
  }

  Bot.setProperty("tracking", trackingJson, "json")
  usd.add(-price)
  usd2.add(price) // Corrected to add positive value to seller's balance
  var purchases = Libs.ResourcesLib.anotherChatRes(
    "purchases" + message,
    "global"
  )
  var profit = Libs.ResourcesLib.anotherChatRes("profit" + message, "global")
  purchases.add(1)
  profit.add(price)
  
  // Function to get current date in user's timezone
function getCurrentDateUserTZ() {
  const now = new Date()
  var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid) || 0
  return new Date(now.getTime() + timeZoneDifference)
}

var currentDate = getCurrentDateUserTZ()

// Format the dates for purchase history and log
var formattedDate = Libs.DateTimeFormat.format(currentDate, "ddd mmm dd yyyy HH:MM:ss")

  // Update purchase history
  bookingHistory.push({
    uniqueId: uniqueId,
    coder: coder,
    coderName: coderName,
    coderId: coderId,
    client: ClientFullName,
    price: price,
    track: TrackingUniqueId,
    date: formattedDate
  })
  Bot.setProperty("booked" + userId, bookingHistory, "json")
  // Update transaction history
  var transactions = Bot.getProperty("transactions", [])
  transactions.unshift({
    date: formattedDate,
    type: "Booking",
    amount: price
  })
  Bot.setProperty("transactions", transactions, "json")

  // Send confirmation message
  Bot.sendMessage(
    "*📚Booking:\n\n" +
      coderName +
      "*:\n\n`" +
      TrackingUniqueId +
      "`\nPlease present your unique tracking id to official account of\n[" +
      coder +
      "](tg://user?id=" +
      coderId +
      ")\nThe coder may ask for additional payment, depending on your project.\n_If the session has been cancelled a refund can be issued._\n\n*🛡️ AVOID SCAM!*\nWe have our own payment method that are safe than sending your payment directly to your coder's own payment method. Use our payment method so its safe and will not be stolen if an theft or scam occurs.\n\n_If you have any issues please contact the seller, if the seller has not responded for 48 hours, report to us immediately._"
  )
  Bot.sendMessageToChatWithId(
    coderId,
    "*" +
      clientName +
      "* Ordered:\nHey " +
      coder +
      ",\nExpect to receive a message from your client with tracking number of\n*" +
      TrackingUniqueId +
      "*\nServe you customer kindly, and your *$" +
      price +
      "* is on hold by us.\nDon't worry its safe, when the status of the client booking is completed we will disburse your " +
      price +
      " to your withdrawable balance."
  )
} catch (error) {
  Bot.run({
    command: "!",
    options: { errorMessage: error.message }
  })
}

