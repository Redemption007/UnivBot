require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const discord = require('discord.js');
const client = new discord.Client(
    {
        partials: ["MESSAGE", "USERS", "GUILD_MEMBER", "CHANNEL", "REACTION"],
        intents: 46594
    });
const guildId = `${process.env.GUILD_ID}`
const clientId = `${process.env.CLIENT_ID}`
const logChannel = `${process.env.LOG_CHANNEL}`
client.variables = {
    guildId,
    clientId,
    logChannel
}

const getFiles = name => {
    const pathFiles = path.join(__dirname, name);
    const files = fs.readdirSync(pathFiles).filter(file => file.endsWith('.js'));
    return [pathFiles, files]
}

['commands', 'events'].forEach(one => {
    client[one] = new discord.Collection()
    const [pathFile, files] = getFiles(one)
    for (const file of files) {
        const filePath = path.join(pathFile, file);
        const obj = require(filePath);
        if (obj.once) {
            client.once(obj.name, (...args) => obj.execute(...args));
        } else if (obj.once === false) {
            client.on(obj.name, (...args) => obj.execute(...args));
        } else {
        client[one].set(obj.data.name, obj);
        }
    }
});

client.login(`${process.env.TOKEN}`);
