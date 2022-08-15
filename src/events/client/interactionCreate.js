module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Oops Something went wrong in the command trying to be executed!`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
        const { buttons } = client;
        const { customId } = interaction;
        const button = buttons.get(customId);
        if (!button) return new Error('There is nothing in this button ;(');

        try {
            await button.execute(interaction, client);
        } catch (err) {
            console.error(err)
        }
    }
  },
};
