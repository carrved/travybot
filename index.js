const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { Player, QueryType } = require("discord-player");

const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates]});

client.once(Events.ClientReady, c => {
	console.log(`logged in as ${c.user.tag}`);
    client.user.setActivity('travy patty', { type: ActivityType.Listening });
    client.user.setStatus('streaming');
});

client.login(token);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property`);
	}
}

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`no command matching ${interaction.commandName} was found	`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'awwwww you got an error thats so cute x3 :3 :D >-< >_<' });
	}
});