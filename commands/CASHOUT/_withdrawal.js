/*CMD
  command: /withdrawal
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

const freelancer = Bot.getProperty("freelancer")
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
  // Function to handle the withdrawal process
  function withdrawal() {
    // Retrieve the withdrawal details
    var withdrawalDetails = User.getProperty("withdrawalDetails")

    // Implement the withdrawal logic here using withdrawalDetails
    var amount = withdrawalDetails.amount
    var currency = withdrawalDetails.currency
    var address = withdrawalDetails.address

    // Integrate OxaPayLib with dynamic values
    Libs.OxaPayLib.apiCall({
      url: "api/send",
      fields: {
        amount: amount, // Dynamic amount
        currency: currency, // Dynamic currency
        address: address, // Dynamic address
        onCallback: "/onCallbackPayout"
      },
      onSuccess: "/onTransfer " + amount + " " + currency
    })
  }
  withdrawal()
} else {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "*BJSMasterSyntaxJavaBot*\nBe one of our *freelancers* to withdraw!",
    parse_mode: "Markdown"
  })
}

