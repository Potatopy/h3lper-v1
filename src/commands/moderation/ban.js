const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`ban`)
    .setDescription(`Bans the user`)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member that is SUPER annoying asf.")
        .setRequired(true)
    )
    .addStringOption(option => 
      option
        .setName('reason')
        .setDescription('The reason for banning the member.')
    ),
  async execute(intercation, client) {
    const user = intercation.option.getUser("target");
    let reason = intercation.options.getString('reason');
    const member = await intercation.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    await member
      .ban({
        deleteMessageDays: 7,
        reason: reason,
    })
    .catch(console.error);   

    await intercation.reply({
        content: `smoking ${user.tag} pack :smoking:`
    })
  },
};
