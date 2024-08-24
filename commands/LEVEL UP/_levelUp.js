/*CMD
  command: /levelUp
  help: 
  need_reply: true
  auto_retry_time: 
  folder: LEVEL UP

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Level up function
function levelUp(coderName, scoreToAdd) {
  // Retrieve the level system from the property
  const retrievedLevelSystem = Bot.getProperty("levelSystem", [])

  // Retrieve the support listing property
  let supportList = Bot.getProperty("supportListing", "")

  // Initialize user's score and level
  let userScore = User.getProperty("user_score_" + coderName, 0)
  let coderLevel = User.getProperty("coder_level_" + coderName, 1)
  const maxLevel = Math.max(...retrievedLevelSystem.map(level => level.level))

  // Function to add score
  function addScore(amount) {
    if (coderLevel >= maxLevel) {
      return
    }

    userScore += amount
    User.setProperty("user_score_" + coderName, userScore, "integer")
    checkLevelUp()
  }

  // Function to check for level up
  function checkLevelUp() {
    const currentLevelData = retrievedLevelSystem.find(
      level => level.level === coderLevel
    )
    const nextLevelData = retrievedLevelSystem.find(
      level => level.level === coderLevel + 1
    )

    if (nextLevelData && userScore >= nextLevelData.exp) {
      coderLevel++
      User.setProperty("coder_level_" + coderName, coderLevel, "integer")

      // Update the coder information in the support listing
      let coders = supportList.split("\n")
      for (let i = 0; i < coders.length; i++) {
        if (coders[i].includes(coderName)) {
          let coderDetails = coders[i].split(" | ")
          if (coderDetails.length >= 2) {
            coderDetails[1] = `Level: ${coderLevel} *(${nextLevelData.name})*`
            coders[i] = coderDetails.join(" | ")
            break
          }
        }
      }

      supportList = coders.join("\n")
      Bot.setProperty("supportListing", supportList, "string")
      Bot.sendMessage(
        `*🎉 Congratulations, Level: ${coderLevel} - ${nextLevelData.name}! 🎉*\n` +
          `======================================\n` +
          `🚀 You have ascended to a new rank! 🚀\n` +
          `======================================\n` +
          `_${nextLevelData.remark}_\n` +
          `======================================`
      )

      checkLevelUp() // In case the user gains enough EXP to level up multiple times
    } else if (!nextLevelData) {
      Bot.sendMessage(
        "*BJSMasterSyntaxJava*\nCongratulations *" +
          user.first_name +
          "* you are a truly a master."
      )
    }
  }

  // Example usage
  addScore(scoreToAdd) // Adds points to the user's score and checks for level up
}

// Call the function with an example
levelUp(message, 50000)

