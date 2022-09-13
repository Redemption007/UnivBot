const { SlashCommandBuilder } = require('discord.js');
const deploying = require('../deploy-commands')

module.exports = {
    name: 'deploy',
	data: new SlashCommandBuilder()
		.setName('deploy')
		.setDescription('Met à jour les (/)-commandes du bot.')
        .setDefaultMemberPermissions(0x0000000000000008),
	async execute(interaction) {
        const logChannel = await interaction.client.channels.fetch(interaction.client.variables.logChannel)
        logChannel.send({embeds: [{
            title: 'Redéploiement en cours',
            description: `<@!${interaction.user.id}> a demandé le redéploiement des (/)-Commandes.\n\nRedéploiement en cours...`,
            footer: {
                text: `Auteur : ${interaction.member.nickname} (${interaction.user.usernam} #${interaction.user.discriminator} - ${interaction.user.id})`,
                iconURL: interaction.user.displayAvatarURL()
            }
        }]})
        interaction.reply({content: 'Redéploiement en cours...', ephemeral: true})
        return deploying()
	},
};