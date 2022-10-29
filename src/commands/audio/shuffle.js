// Credits: zach.#0001

const { 
    SlashCommandBuilder
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the current queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

            queue.shuffle()
            await interaction.editReply(`Shuffling ${queue.tracks.length} songs!`)
    },
}