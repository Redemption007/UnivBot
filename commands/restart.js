const { SlashCommandBuilder } = require('discord.js');
const deploying = require('../deploy-commands')

module.exports = {
    name: 'restart',
    aliases: ['reaload'],
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Redémarre le bot.')
        .setDefaultMemberPermissions(0x0000000000000008),
	async execute(interaction) {
        await interaction.reply({content: 'Redémarrage en cours...', ephemeral: true})
        const logChannel = await interaction.client.channels.fetch(interaction.client.variables.logChannel)
        await logChannel.send({embeds: [{
            title: 'Redémarrage en cours',
            description: `<@!${interaction.user.id}> a demandé le redémarrage du bot.\n\nLe bot sera prêt dans quelques secondes...`,
            footer: {
                text: `Auteur : ${interaction.member.nickname?`${interaction.member.nickname} (${interaction.user.username} `:`${interaction.user.username} (`} #${interaction.user.discriminator} - ${interaction.user.id})`,
                iconURL: interaction.user.displayAvatarURL()
            }
        }]})
        return process.exit(0)
	},
};