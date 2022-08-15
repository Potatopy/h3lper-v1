const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mmongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`databse`)
    .setDescription(`Gives Info from database`),
  async execute(intercation, client) {
    let guildProfile = await Guild.findOne({ guildId: intercation.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: intercation.guild.id,
        guildName: intercation.guild.name,
        guildIcon: intercation.guild.iconURL()
          ? intercation.guild.iconURL()
          : "None.",
      });

      await guildProfile.save().catch(console.error);
      await intercation.reply({
        content: `Server Name: ${guildProfile.guildName}`
      });
      console.log(guildProfile);
    } else {
        await intercation.reply({
        content: `Server ID: ${guildProfile.guildId}`
      });
      console.log(guildProfile);
    }
  },
};
