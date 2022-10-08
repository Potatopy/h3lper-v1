// Credits: faint#1337

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    WebhookClient,
} = require('discord.js')

const eco = require('../../Database/ecoDB');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eco')
    .setDescription('The Economy System')
    .addSubcommand((subcommand) => 
    subcommand
        .setName('main')
        .setDescription('All eco cmds')
        .addStringOption((option) => 
        option
            .setName('types')
            .setDescription('Select command type')
            .setRequired(true)
            .setChoices(
                { name: 'Balance', value: 'Balance' },
                { name: 'Daily', value: 'Daily' },
                { name: 'Weekly', value: 'Weekly' },
                { name: 'Coins Leaderboard', value: 'Coins Leaderboard' },
                { name: 'Bank Leaderboard', value: 'Bank Leaderboard' },
                { name: 'Inventory', value: 'Inventory' },
            )
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('money')
        .setDescription('Money types.')
        .addStringOption((option) => 
        option
            .setName('types')
            .setDescription('Select command type')
            .setRequired(true)
            .setChoices(
                { name: 'Deposit', value: 'Deposit' },
                { name: 'Withdraw', value: 'Withdraw' },
            )
        )
        .addNumberOption((option) => 
        option
            .setName('amount')
            .setDescription('Amount?')
            .setRequired(true)
        )
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand()
        const embed = new EmbedBuilder();
        const { guild, member } = interaction

        switch(sub) {
            case('main') : {
                const Type = interaction.options.getString('types')

                switch(Type) {
                    case('Balance') : {
                        let balance = eco.balance.fetch(member.id, guild.id);
                        let bank = eco.bank.fetch
                    }
                    break;
                    case('Daily') : {

                    }
                    break;
                    case('Weekly') : {

                    }
                    break;
                    case('Coins Leaderboard') : {

                    }
                    break;
                    case('Bank Leaderboard') : {

                    }
                    break;
                    case('Inventory') : {

                    }
                    break;
                }
            }
            break;
            case('money') : {
                const Type = interaction.options.getString('types')

                switch(Type) {
                    case('Deposit') : {

                    }
                    break;
                    case('Withdraw') : {

                    }
                    break;
                }
            }
            break
        }
    }
}