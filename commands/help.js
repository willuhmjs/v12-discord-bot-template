module.exports = {
	name: 'help', // Command name that the user will type to execute the command
	description: 'Show helpful information', // Description of the command
  list: true, // Whether or not to list on the help section
	execute(message, args, client) {
    // Get Discord class and prefix
    let { Discord, prefix } = client;

    // Get ping
    let { ping } = client.ws;

    // Make MessageEmbed to send to author
    const helpEmbed = new Discord.MessageEmbed()
      .setFooter(`Prefix: ${prefix}`)
      .setColor("BLURPLE");

    // Add each command to the description
    let desc = "";
    client.commands.forEach(command => {
      if (command.list) {
        desc += `\`${command.name}\` - ${command.description}\n`;
      }
    });
    helpEmbed.setDescription(desc);

    // Reply to the user with the help embed
    return message.reply(helpEmbed);
	},
};