/*CMD
  command: withdrawCrypto
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CASHOUT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const freelancer = User.getProperty("freelancer")
if (user.telegramid == freelancer) {
  const withdrawalsOpen = Bot.getProperty("withdrawalsOpen")
  if (withdrawalsOpen === "closed") {
    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "*💸 BJSMasterSyntaxJava Withdrawals*\nOur withdrawals are closed for now.\n\n_Check back later and wait for an update._",
      parse_mode: "Markdown"
    })
    return
  }
  // Function to handle cryptocurrency withdrawal
  function withdrawCrypto(message) {
    // Extract the cryptocurrency symbol from the command
    var currency = message.split(" ")[1]

    // Initialize a withdrawal object and set it as a user property
    var withdrawalDetails = {
      currency: currency,
      amount: null,
      address: null
    }
    User.setProperty("withdrawalDetails", withdrawalDetails, "json")

    // Proceed to set the amount
    Bot.runCommand("setWithdrawalAmountCoderString")
  }

  withdrawCrypto(message)
} else {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "*BJSMasterSyntaxJavaBot*\nBe one of our partners to withdraw!",
    parse_mode: "Markdown"
  })
}

