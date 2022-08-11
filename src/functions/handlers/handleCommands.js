const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been called!`);
      }
    }

    const clientId = "908818107093622814"; // Please Insert Your own Id's these are my Id's
    const guildId = "1006778553829961759"; // Same thing here
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started Refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Succesfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
