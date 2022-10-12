// Credits: faint#1337

// Dependancies (idk how to spell)
require("dotenv").config();
const { token, database } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")

const client = new Client({ intents: 32767 }); //Intents
// Collections
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddListWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

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
(async () => {
  await connect(database).catch(console.error)
})();