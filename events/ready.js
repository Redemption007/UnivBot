const logging = require('../logErrors');

module.exports = {
    name: 'ready',
	once: true,
	execute(client) {
        client.channels.fetch(client.variables.logChannel).then(logChannel => {
            logChannel.send(`Le bot est en ligne ! Restart : <t:${Math.floor(Date.now()/1000)}:F> (<t:${Math.floor(Date.now()/1000)}:R>)`)
            // logging(logChannel);
        })
	},
};