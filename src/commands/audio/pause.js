// Credits: faint#1337

const { 
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current track'),
    execute: async ({client, interaction}) => {

        const queue = client.player.getQueue(interaction.guild);

        if (!queue) {
            await interaction.reply("There is no song playing. Add a song!");
            return;
        }

        queue.setPaused(true);

        await interaction.reply(`Paused **${currentSong.title}**`)
    }
}