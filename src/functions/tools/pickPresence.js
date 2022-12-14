// Credits: faint#1337

const { ActivityType } = require('discord.js')

module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: "instagram.com/h3lped.v2", // You can change this to whatever you want
                status: "idle"
            },
            {
                type: ActivityType.Listening,
                text: "my dev",
                status: "idle"
            },
            {
                type: ActivityType.Competing,
                text: "ya mom",
                status: "idle"
            }
        ];
        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [{
                name: options[option].text,
                type: options[option].type
            }],
            status: options[option].status
        })
    }
}