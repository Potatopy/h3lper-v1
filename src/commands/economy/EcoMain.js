// Credits: zach.#0001

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
                        let bank = eco.bank.fetch(member.id, guild.id)

                        if(!balance) balance = 0;
                        if(!bank) bank = 0;

                        embed
                            .setTitle(`**${interaction.member.user.username}**'s balance`)
                            .setDescription('Info about this user\'s balance')
                            .addFields(
                                {
                                    name: 'Coins',
                                    value: `${balance}`,
                                    inline: true
                                },
                                {
                                    name: 'Bank',
                                    value: `${bank}`,
                                    inline: true
                                },
                            )
                            .setTimestamp()
                            .setColor('Gold')

                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Daily') : {
                        let daily = eco.rewards.getDaily(member.id, guild.id)
                        if(!daily.status) {
                            embed
                                .setDescription(`I'm not Jeff Bezos and I con only provide you everyday`)
                                .setColor('Red')
                            return interaction.reply({embeds: [embed]})
                        }

                        embed
                            .setTitle('Daily Rewards')
                            .setDescription(`You have recieved **${daily.reward}** in coins`)
                            .setColor('Gold')
                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Weekly') : {
                        let weekly = eco.rewards.getWeekly(member.id, guild.id)
                        if(!weekly.status) {
                            embed
                                .setDescription(`im poor asf cuh`)
                                .setColor('Red')
                            return interaction.reply({embeds: [embed]})
                        }

                        embed
                            .setTitle('Weekly Rewards')
                            .setDescription(`You have recieved **${weekly.reward}** in coins`)
                            .setColor('Gold')
                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Coins Leaderboard') : {
                        let lb = eco.balance.leaderboard(guild.id);
                        if(!lb.length) {
                            return interaction.reply(
                                {
                                    content: `everybody poor lel`
                                }
                            )
                        }

                        let leaderboard = await lb.map((value, index) => {
                            return `\`${index + 1}\`<@${value.userID}>'s Coins: **${value.money}**`
                        })

                        embed
                            .setColor('Random')
                            .setTitle('Account Leaderboard')
                            .setDescription(leaderboard.join('\n'))

                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Bank Leaderboard') : {
                        let lb = eco.bank.leaderboard(guild.id);
                        if(!lb.length) {
                            return interaction.reply(
                                {
                                    content: `why is everybody so greedy deposit some money in ur bank`
                                }
                            )
                        }

                        let leaderboard = await lb.map((value, index) => {
                            return `\`${index + 1}\`<@${value.userID}>'s Coins: **${value.money}**`
                        })

                        embed
                            .setColor('Random')
                            .setTitle('Bank Leaderboard')
                            .setDescription(leaderboard.join('\n'))

                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Inventory') : {
                        const inv = eco.inventory.fetch(member.id, guild.id);
                        if(!inv.length) return interaction.reply(
                            {
                                content: `There is nothing in your inventory. Buy something`
                            }
                        )

                        let invMap = inv.map((x, i) => `ID: ${i + 1}: ${x.name}`)

                        embed
                            .setTitle('Inventory')
                            .setDescription(invMap.join('\n'))
                            .setColor('Blurple')
                        interaction.reply({embeds: [embed]})
                    }
                    break;
                }
            }
            break;
            case('money') : {
                const Type = interaction.options.getString('types')
                let amount = interaction.options.getNumber('amount')

                switch(Type) {
                    case('Deposit') : {
                        let balance = eco.balance.fetch(member.id, guild.id);

                        if(amount > balance) return interaction.reply(
                            {
                                content: `You need atleast **${amount}** in your account to deposit`,
                                ephemeral: true
                            }
                        )

                        eco.balance.subtract(amount, member.id, guild.id)
                        eco.bank.add(amount, member.id,guild.id)

                        embed
                            .setTitle('Deposit || Money to Bank transfer ||')
                            .setDescription(`Added ${amount} coins to your bank.`)
                            .setColor('Green')
                        interaction.reply({embeds: [embed]})
                    }
                    break;
                    case('Withdraw') : {
                        let balance = eco.balance.fetch(member.id, guild.id);
                        let bank = eco.bank.fetch(member.id, guild.id)

                        if(amount > bank) return interaction.reply(
                            {
                                content: `You don't have enough to deposit ${amount} of coins`,
                                ephemeral: true
                            }
                        )

                        eco.balance.subtract(amount, member.id, guild.id)
                        eco.bank.add(amount, member.id,guild.id)

                        embed
                            .setTitle('Withdraw || Bank to Account ||')
                            .setDescription(`Added ${amount} coins to your account.`)
                            .setColor('Green')
                        interaction.reply({embeds: [embed]})
                    }
                    break;
                }
            }
            break
        }
    }
}