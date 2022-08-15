// Dependancies (idk how to spell)
require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 32767 }); //Intents
// Collections
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`); // Calls Functions Folders
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

// Calls Events & Commands + Login
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);