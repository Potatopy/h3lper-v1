// Credits: faint#1337

module.exports = {
    data: {
        name: `discords`
    },
    async execute(intercation, client) {
        await intercation.reply({
            content: `https://discord.gg/rtm`
        });
    }
}