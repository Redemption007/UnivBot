const { SlashCommandBuilder } = require('discord.js');
const deploying = require('../deploy-commands')

module.exports = {
    name: 'deploy',
	data: new SlashCommandBuilder()
		.setName('deploy')
		.setDescription('Met à jour les (/)-commandes du bot.')
        .setDefaultMemberPermissions(0x0000000000000008),
	async execute(interaction) {
        await interaction.reply({content: 'Redéploiement en cours...', ephemeral: true})
        const logChannel = await interaction.client.channels.fetch(interaction.client.variables.logChannel)
        await logChannel.send({embeds: [{
            title: 'Redéploiement en cours',
            description: `<@!${interaction.user.id}> a demandé le redéploiement des (/)-Commandes.\n\nRedéploiement en cours...`,
            footer: {
                text: `Auteur : ${interaction.member.nickname?`${interaction.member.nickname} (${interaction.user.username} `:`${interaction.user.username} (`} #${interaction.user.discriminator} - ${interaction.user.id})`,
                iconURL: interaction.user.displayAvatarURL()
            }
        }]})
        return deploying()
	},
};