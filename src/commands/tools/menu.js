// Credits: faint#1337

const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`menu`)
    .setDescription(`Returns a menu!`),
  async execute(intercation, client) {
    const menu = new SelectMenuBuilder()
      .setCustomId(`discords-menu`)
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new SelectMenuOptionBuilder({
          label: `Option #1`,
          value: `https://discord.gg/rtm`
        }),
        new SelectMenuOptionBuilder({
          label: `Option #2`,
          value: "Bot made by h3lped#0009"
        }));

    await intercation.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
