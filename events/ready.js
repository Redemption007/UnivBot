module.exports = {
    name: 'ready',
	once: true,
	execute(client) {
        client.channels.fetch(client.variables.logChannel)
        .then(logChannel => 
            logChannel.send(`The bot is now ready to work ! Restart : <t:${Math.floor(Date.now()/1000)}:F> (<t:${Math.floor(Date.now()/1000)}:R>)`))
	},
};