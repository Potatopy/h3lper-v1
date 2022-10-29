// Credits: zach.#0001

const { 
    SlashCommandBuilder, 
    Embed 
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current track."),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

            queue.setPaused(false)
            await interaction.editReply("Resumed! :arrow_forward:")
    },
}