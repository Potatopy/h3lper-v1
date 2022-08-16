const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`gender`)
      .setDescription(`Button Reactions for Gender Roles`),
    async execute(intercation, client) {
      const button = new ButtonBuilder()
        .setCustomId("discords")
        .setLabel(`Click Me!`)
        .setStyle(ButtonStyle.Primary);
  
      await intercation.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  