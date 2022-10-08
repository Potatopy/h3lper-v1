// Credits: faint#1337

const { ActivityType } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 15 * 1000);
        console.log(`${client.user.tag} is up!`);
    },
};