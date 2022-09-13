require('dotenv').config()
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const guildId = process.env.GUILD_ID
const applicationId = process.env.APPLICATION_ID

const deploying = _ => {
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}
	
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
	
	const registering = async () => {
		try {
			console.log(`${commands.length} (/)-Commandes vont être enregistrées...`);
	
			const data = await rest.put(
				Routes.applicationGuildCommands(applicationId, guildId),
				{ body: commands },
			);
	
			console.log(`${data.length} (/)-Commandes ont été enregistrées !`);
		} catch (error) {
			console.error('OUPS !\n\n', error);
		}
	}
	return registering()
}
module.exports = deploying