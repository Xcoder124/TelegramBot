/*CMD
  command: /statistics
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

// List of resource names and their display names
let resources = {
  activeUsers: "Active Users",
  totalBanned: "Total Banned Users",
  totalPartnerts: "Total Partners",
  totalProducts: "Total Products",
  totalBots: "Total Bots",
  totalBJS: "Total BJS Codes",
  totalProductPurchased: "Total Sales",
  totalWagered: "Total Revenue"
};

// Collect resource values and format the message
let Imessage =
  "📊 *Bot Statistics*\n_This statistics give the live number of bot resources._\n\n";
for (let name in resources) {
  let resource = Libs.ResourcesLib.anotherChatRes(name, "global");
  let value = resource.value();
    // Add $ for totalWagered
  if (name === "totalWagered") {
    value = "$" + value;
  }
  Imessage += "🔹 *" + resources[name] + "*: " + value + "\n";
}
