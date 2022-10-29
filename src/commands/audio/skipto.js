// Credits: zach.#0001

const { 
    SlashCommandBuilder, 
    Embed 
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to a specific track #")
        .addNumberOption((option) => option.setName("tracknumber").setDescription("Track to skiip to").setMinValue(1).setRequired(true)),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Invalid Track number!")
        queue.skipTo(trackNum -1)
            await interaction.editReply(`Skipped to track number ${trackNum}`)
    },
}