/*CMD
  command: mainCoderPanel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CODER PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const freelancer = Bot.getProperty("freelancer");
if (user.telegramid == freelancer) {
var landedCoder = checkIfLanded(user.telegramid);
if (landedCoder) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Welcome to your panel *" + user.first_name + "*!\nIn this introduction here's what you can do in your panel:\n\n1. *💈Create a new listing*\n2. *👨‍💻 Be a part-time coder*\n(_Freelancing as a programmer_)\n3. 📦 *Manage Orders*\n4. *📃 Manage your listings*\n• Delete Listing\n• Update Listing\n5. *🚫 Block users to buy or view your products*\n6. *🏷️ Promotion Codes Management*\n• Create Discount Codes in your listing\n• Manage Discount Codes in your listing\n7. *📊 View Your Statistics Data*\n8. *📞 Talk to your Customer*\n9. *👤 Manage your profile*\n\nThis is all your coder panel does, but you can switch to the main landing page.",
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "↩️ Go to Main", callback_data: "main_hallway" }]
      ]
    })
  });

  Bot.run({
    command: "mainHallwayCoderPanel",
    run_after: 10 // seconds
  });
} else {
  Bot.runCommand("mainHallwayCoderPanel");
}
}
function checkIfLanded(userId) {
  var landedRecord = Bot.getProperty("landed_" + userId);
  if (!landedRecord) {
    // Mark the user as new and store the record
    Bot.setProperty("landed_" + userId, { isLanded: false }, "json");
    return true;
  }
  return false;
}

