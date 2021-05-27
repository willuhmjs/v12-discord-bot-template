module.exports = {
	name: 'ping', // Command name that the user will type to execute the command
	description: 'Ping the server to test uptime', // Description of the command
  list: true, // Whether or not to list on the help section
	execute(message, args, client) {
    // Get Discord class
    let Discord = client.Discord;

    // Get ping
    let { ping } = client.ws;

    // Make MessageEmbed to send to author
    const pingEmbed = new Discord.MessageEmbed()
      .setDescription(`🏓 Pong! ${ping} milliseconds`)
      .setColor("GREEN");
    
    // Reply to the user with the pingEmbed
    return message.reply(pingEmbed);
	},
};