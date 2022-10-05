const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`kick`)
    .setDescription(`Kicks a user`)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member that is annoying asf.")
        .setRequired(true)
    )
    .addStringOption(option => 
      option
        .setName('reason')
        .setDescription('The reason for kicking the member.')
    ),
  async execute(intercation, client) {
    const user = intercation.options.getUser("target");
    let reason = intercation.options.getString('reason');
    const member = await intercation.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    await user.send({
      content: `You have been kicked from ${intercation.guild.name} for ${reason}`
    }).catch(console.log('user\'s DM\'s are off'));
    await member.kick(reason).catch(console.error);

    await intercation.reply({
      content: `booted ${user.tag} out of the server`
  })
  },
};
