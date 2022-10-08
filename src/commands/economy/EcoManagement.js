// Credits faint#1337

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    PermissionFlagsBits,
    WebhookClient
} = require('discord.js')

const eco = require('../../Database/ecoDB');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eco-staff')
    .setDescription('Modify a users balance.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) => 
    subcommand
        .setName('add-money')
        .setDescription('Adds money into a users balance.')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('The user who is recieving the cash.')
            .setRequired(true)
        )
        .addStringOption((option) => 
        option
            .setName('amount')
            .setDescription('Amount being added.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('remove-money')
        .setDescription('Removes money from a users balance.')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('The user who is being robbed.')
            .setRequired(true)
        )
        .addStringOption((option) => 
        option
            .setName('amount')
            .setDescription('Amount being removed.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('set-money')
        .setDescription('Adds money into a users balance.')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('The user who is recieving the cash.')
            .setRequired(true)
        )
        .addStringOption((option) => 
        option
            .setName('amount')
            .setDescription('Amount being added.')
            .setRequired(true)
        )
    )
}