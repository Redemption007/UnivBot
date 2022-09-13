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
        const options = interaction.options._hoistedOptions 
		const member = options.length?options[0].member:interaction.member
        interaction.client.emit('guildMemberAdd', member)
        return interaction.reply({
            content: `La commande est un succès ! :partying_face:\n<@!${member.id}> a 15 minutes pour remplir ses données, durée au delà de laquelle la procédure sera annulée.`,
            ephemeral: true
        })
	},
};