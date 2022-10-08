// Credits: faint#1337

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
      }
    }

    const clientId = "751218169129074748"; // Please Insert Your own Id's these are my Id's
    const guildId = "812765735645347911"; // Same thing here
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
