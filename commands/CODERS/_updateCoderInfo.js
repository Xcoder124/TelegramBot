/*CMD
  command: /updateCoderInfo
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

function updateCoderInfo(message) {
    // Split the message into parts
    var parts = message.split("\n");

    // Extract parts and trim any extra spaces
    var coderUniqueId = parts[0].trim();
    var projectName = parts[1].trim();
    var projectDescription = parts[2].trim();
    var technologies = parts[3].trim();

    // Create the project object
    var project = {
        coderUniqueId: coderUniqueId,
        projectName: projectName,
        description: projectDescription,
        technologies: technologies.split(",").map(tech => tech.trim())
    };

    // Fetch existing coder projects for this coderUniqueId
    var coderProjectsKey = "coderProjects" + coderUniqueId;
    var coderProjects = Bot.getProperty(coderProjectsKey, {});

    // Add or update the project for the coder
    coderProjects[projectName] = project;

    // Save the updated coder projects back to the bot's properties
    Bot.setProperty(coderProjectsKey, coderProjects, "json");
    Bot.sendMessage("Coder project has been updated successfully!");
}

updateCoderInfo(message);
