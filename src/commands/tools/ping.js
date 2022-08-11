const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Returns the bot's ping!`),
    async execute (intercation, client) {
        const message = await intercation.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - intercation.createdTimestamp}`
        await intercation.editReply({
            content: newMessage
        });
        
    }
}