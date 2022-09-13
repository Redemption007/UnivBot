const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'again',
    aliases: ['init'],
	data: new SlashCommandBuilder()
		.setName('again')
		.setDescription('Permet d\'enregistrer à nouveau ses informations personnelles.')
        .addUserOption( option => {
            return option.setName('utilisateur')
                .setDescription("Sur quel utilisateur cette commande doit-elle s'appliquer ?")
                .setRequired(false)
        }),
	async execute(interaction) {
        console.log(interaction);
		// const member = interaction.arguments.member||await interaction.guild.members.fetch(interaction.user.id)
        // client.emit('guildMemberAdd', member)
	},
};