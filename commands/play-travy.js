const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus, entersState, VoiceConnectionStatus, VoiceConnection } = require('@discordjs/voice');

const audioPlayer = createAudioPlayer();
const path = require('path')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play-travy')
		.setDescription('plays tracvy'),
    async execute(message) {
        await message.deferReply("hold on")
        const connection = joinVoiceChannel({
            channelId: "1076053570245369886",
	        guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        })

        const subscription = connection.subscribe(audioPlayer);

        const travy = createAudioResource('C:/Users/z4xi/Dev/Bots/travy bot/travy.mp3');
        audioPlayer.play(travy);

        audioPlayer.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
        });

        audioPlayer.on(AudioPlayerStatus.Idle, () => {
            const travy = createAudioResource('C:/Users/z4xi/Dev/Bots/travy bot/travy.mp3');
            audioPlayer.play(travy);
            console.log('looping');
        })

        await message.editReply('travy is play');
    },  
}