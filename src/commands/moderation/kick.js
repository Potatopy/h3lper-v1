const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`kick`)
    .setDescription(`Kicks a user`)
    .addUserOption(option => option.setName('target').setDescription('The member that is annoying asf.').setRequired(true)),
  async execute(intercation, client) {
    const user = intercation.option.getUser('target');
    const member = await intercation.guild.members.fetch(user.id).ctach(console.error);
  },
};