require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const discord = require('discord.js');
const client = new discord.Client(
    {
        partials: ["MESSAGE", "USERS", "GUILD_MEMBER", "CHANNEL", "REACTION"],
        intents: 46594
    });
const guildId = process.env.GUILD_ID
const clientId = process.env.CLIENT_ID
const logChannel = process.env.LOG_CHANNEL
client.variables = {
    guildId,
    clientId,
    logChannel
};
['commands', 'events'].forEach(one => {
    client[one] = new discord.Collection()
});

const getFiles = name => {
    const pathFiles = path.join(__dirname, name);
    const files = fs.readdirSync(pathFiles).filter(file => file.endsWith('.js'));
    return [pathFiles, files]
}
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const filePath = path.join(eventPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
        console.log(`L'event ${event.name} est chargé ! ✅`);
	}
}

client.login(process.env.TOKEN);
