/*CMD
  command: /gift5
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Message

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// GIFT5: Retrieve and display the gift card details
var giftCardCode = Bot.getProperty("giftCardCode")
var giftCardInfo = Bot.getProperty("giftCardInfo_" + giftCardCode)
var recipientChatId = Bot.getProperty("TgId")
var teamMessage = message

// Check if the properties exist
if (!giftCardInfo) {
  Bot.sendMessage("Error: Missing gift card information.")
} else {
  Bot.sendMessageToChatWithId(
    recipientChatId,
    "🎁 Claim your *💎" +
      giftCardInfo.value +
      "* inside!\n\n" +
      teamMessage +
      "\n\n`" +
      giftCardInfo.code +
      "` - Redeem this code in the redemption command\nor\n[INSTANT REDEEM](https://t.me/BJSMasterSyntaxJavaBot?start=redeem_" +
      giftCardInfo.code +
      ")\n\n*Expiration Date:* " +
      giftCardInfo.formattedExpirationDateUser
  )
}

