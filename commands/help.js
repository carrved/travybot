const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('what are you fuckin dumb???? its self explanatory'),
    async execute(interaction) {
        await interaction.reply('**welcome to the cng bot**\na bot to help with the cng server\n\n**commands**\nban - bans a user\nkick - kicks a user\npfp - gets someones pfp\nstatus - gets someones status and sends it\n[ADMIN ONLY] eval - uses a command on the bot side');
    },  
}