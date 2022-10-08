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
        .addNumberOption((option) => 
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
        .addNumberOption((option) => 
        option
            .setName('amount')
            .setDescription('Amount being removed.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('set-money')
        .setDescription('Sets a certain balance to a user.')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('The user to set the balance to.')
            .setRequired(true)
        )
        .addNumberOption((option) => 
        option
            .setName('amount')
            .setDescription('Balance being set.')
            .setRequired(true)
        )
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, member } = interaction;
        const embed = new EmbedBuilder
        const sub = interaction.options.getSubcommand()

        switch(sub) {
            case('add-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.add(amount, Target.id, guild.id)

                embed
                    .setTitle('Completed!')
                    .setDescription(`Added ${amount} coins to ${Target}!`)
                    .setColor('Random')
                    .setTimestamp()

                interaction.reply({embeds: [embed]})
            }
            break;
            case('remove-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.subtract(amount, Target.id, guild.id)

                embed
                    .setTitle('Completed!')
                    .setDescription(`Removed ${amount} coins from ${Target}!`)
                    .setColor('Random')
                    .setTimestamp()

                interaction.reply({embeds: [embed]})
            }
            break;
            case('set-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.set(amount, Target.id, guild.id)

                embed
                    .setTitle('Completed!')
                    .setDescription(`Succesfully set ${amount} coins to ${Target}!`)
                    .setColor('Random')
                    .setTimestamp()

                interaction.reply({embeds: [embed]})
            }
            break;
        }
    }
}