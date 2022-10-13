// Credits: faint#1337

const { 
    SlashCommandBuilder,
    EmbedBuilder,
    Embed
} = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song.')
    .addSubcommand(subcommand => {
        subcommand
            .setName('search')
            .setDescription('Search for the song you are looking for')
            .addStringOption(option => {
                option
                    .setName('searchterms')
                    .setDescription('Search Keywords')
                    .setRequired(true)
            })
    })
    .addSubcommand(subcommand => {
        subcommand
            .setName('playlist')
            .setDescription('Plays a playlist from Youtube')
            .addStringOption(option => {
                option
                    .setName('url')
                    .setDescription('URL Of the playlist')
                    .setRequired(true)
            })
    })
    .addSubcommand(subcommand => {
        subcommand
            .setName('song')
            .setDescription('Plays the song from YouTube')
            .addStringOption(option => {
                option
                    .setName('url')
                    .setDescription('URL of the song/video')
                    .setRequired(true)
                })
        }),
    execute: async ({client, interaction}) => {
        if (!interaction.member.voice.channel)
        {
            await interaction.reply('You must be in a Voice Channel to run this command!')
            return;
        }

        const queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connection(interaction.member.voice.channel)

        let embed = new EmbedBuilder();
        if(interaction.options.getSubcommand() === "song")
        {
            let url = interaction.options.getString('url');

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if (result.tracks.length === 0)
            {
                await interaction.reply("No results Found. Try searching something diffirent.")
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`Added **[${song.title}](${song.url})** to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`});
        } else if (interaction.options.getSubcommand() === "playlist")
        {
            let url = interaction.options.getString('url');

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if (result.tracks.length === 0)
            {
                await interaction.reply("No Playlist Found. Try Making the playlist public!.")
                return
            }

            const playlist = result.playlist
            await queue.addTrack(playlist)

            embed
                .setDescription(`Added **[${playlist.title}](${playlist.url})** to the queue`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({text: `Duration: ${playlist.duration}`});
        } else if (interaction.options.getSubcommand() === "search")
        {
            let url = interaction.options.getString('searchterms');

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (result.tracks.length === 0)
            {
                await interaction.reply("No Results Found. Try Searching Something else.")
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`Added **[${song.title}](${song.url})** to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`});
        }

        if(!queue.playing) await queue.play();

        await interaction.reply({
            embeds: [embed]
        })
    }
}