// Works as of discord.js 12.5.3

// Initialize Discord and the client
const Discord = require("discord.js");
const client = new Discord.Client();
client.Discord = Discord;

// Use the token to login, provided from config file
const { token } = require("./config.js");

// Require fs and path for command handler
const fs = require("fs");
const path = require("path");

// Register prefix
let prefix = "!";
client.prefix = prefix;

// Notify console and set activity on startup
client.on("ready", () => {
  console.log("Bot Started");
  client.user.setActivity("Hello world!");
});

// Search and require command files (command handler)
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")) // Look for files in the /commands directory
  .filter(file => file.endsWith(".js")); // Only use javascript files

for (const file of commandFiles) {
  // Require the command file
  const command = require(path.join(__dirname, `commands/${file}`));

  // Register command with the collection
  client.commands.set(command.name, command)
};

client.on("message", message => {
  // Don't respond if author is a bot, no permissions, or prefix not mentioned
  if (message.author.bot) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!message.content.startsWith(prefix)) return;

  // Get command using arguments
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Don't respond if command doesn't exist
  if (!client.commands.has(command)) return;

  try {
    // Try to execute the command
    return client.commands.get(command).execute(message, args, client);
  } catch (error) {
    // --But error if something goes wrong
    let errorEmbed = new Discord.MessageEmbed()
      .setDescription(`There was an error attempting to execute that command\n\n${error}`)
      .setColor("RED");
    return message.reply(errorEmbed);
  }
});

client.login(token);
