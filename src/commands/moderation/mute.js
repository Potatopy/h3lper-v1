// Credits: faint#1337

const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mute`)
        .setDescription(`Mutes a user`)
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member that is a squeaker.")
                .setRequired(true)
        )
        .addIntegerOption((option) => 
        option
            .setName('time')
            .setDescription('The amount of minutes to mute the member for.')
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for muting the member.')
        ),
    async execute(intercation, client) {
        const user = intercation.options.getUser("target");
        let reason = intercation.options.getString('reason');
        let time = intercation.options.getInteger('time');
        const member = await intercation.guild.members
            .fetch(user.id)
            .catch(console.error);

        if (!reason) reason = "No reason provided.";
        if (!time) time = null;

        await member.timeout(time == null ? null : time * 60 * 1000, reason).catch(console.error);

        await intercation.reply({
            content: `STFU ${user.tag}`
        })
    },
};
