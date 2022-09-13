module.exports = {
    name: 'interactionCreate',
	once: false,
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.log('OOPS !\n\n', error);
			await interaction.reply({ content: 'Le bot a rencontré un problème ! :grimacing:', ephemeral: true });
		}
	},
};