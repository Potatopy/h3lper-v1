// Credits: zach.#0001

const {
    SlashCommandBuilder
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the bot and purges the queue."),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        queue.destroy()
        await interaction.editReply("Bye! :wave:")
    },
}