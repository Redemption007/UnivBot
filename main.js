const discord = require('discord.js');
const client = new discord.Client(
    {
        partials: ["MESSAGE", "USERS", "GUILD_MEMBER", "CHANNEL", "REACTION"],
        intents: 46594
    });

client.once('ready', _ => {
    client.channels.fetch('1018994942892310598').then(logChannel => logChannel.send(`The bot is now ready to work ! Restart : <t:${Math.floor(Date.now()/1000)}:F> (<t:${Math.floor(Date.now()/1000)}:R>)`))

})
client.on('guildMemberAdd', async member => {
    member.guild.members.addRole({user: member.id, role: '1018995648869191721'})
    const message1Content = `Bonjour, <@!${member.id}> !\n\nPeux-tu répondre à ces quelques questions afin de faciliter ton expérience du serveur ?\n\n\
    Tout d'abord, peux-tu sélectionner parmis le menu déroulant ci-après le groupe dans lequel tu te trouves ?\n\n**Question 1/3**`
    const groupSelectMenu = new discord.SelectMenuBuilder()
        .setCustomId("groupe")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder('Choisissez votre groupe')
        .setOptions([
            {label: 'Groupe 547 O', value: '1019021238926053397'},
            {label: 'Groupe 547 P', value: '1019021294144073788'},
            {label: 'Groupe 555 K', value: '1019000803354214493'},
            {label: 'Groupe 555 L', value: '1019000864263909407'},
            {label: 'Groupe 556 L', value: '1019001036922433536'},
            {label: 'Groupe 556 M', value: '1019000961685016577'},
            {label: 'Groupe 559 EEP', value: '1019021156067577856'},
        ])
    const groupRow = new discord.ActionRowBuilder().addComponents(groupSelectMenu)
    const message2Content = 'Sélectionne le parcours dans lequel tu es :\n\n**Question 2/3**'
    const parcoursSelectMenu = new discord.SelectMenuBuilder()
        .setCustomId("groupe")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder('Choisissez votre groupe')
        .setOptions([
            {label: 'Physique Mineure Physique', description: 'C\'est ton parcours ? Clique ici !', value: '0'},
            {label: 'Physique Mineure Mécanique', description: 'C\'est ton parcours ? Clique ici !', value: '1'},
            {label: 'Physique Mineure EEP', description: 'C\'est ton parcours ? Clique ici !', value: '2'},
            {label: 'Double Diplôme Maths - Physique', description: 'Peut importe si la mineure est Maths ou Physique. C\'est ton parcours ? Clique ici !', value: '3'},
            {label: 'Double Diplôme Chimie - Physique', description: 'Peut importe si la mineure est Chimie ou Physique. C\'est ton parcours ? Clique ici !', value: '4'},
            {label: 'Je ne sais pas', description: 'Tu ne sais plus ? Clique ici !', value: '5'},
        ])
    const parcoursRow = new discord.ActionRowBuilder().addComponents(parcoursSelectMenu)
    const parcoursArray = ['Physique Mineure Physique', 'Physique Mineure Mécanique', 'Physique Mineure EEP', 'Double Diplôme Maths - Physique', 'Double Diplôme Chimie - Physique', 'Ne sait pas']
    const message3Content = 'Comment t\'appelles-tu ?\nFormats possibles de réponse : `NOM Prénom`, `Prénom NOM`, `NOM Initiale de prénom`\n\n**Question 3/3**'
    const endMessageContent = (groupe, parcours, nom) => `<@!${member.id}> Incroyable !\n Je te laisse profiter à fond du serveur et l\'exploiter au maximum !\n\nPour information, voici les informations que tu as donné :\n> Ton groupe : ${groupe}\n> Ton parcours : ${parcoursArray[parcours]}\n> Ton nom : ${nom}\n*Une de ces informations est erronée ? N'hésite pas à contacter <@!554344205405650957> pour régler ce souci au plus vite !* :wink:`
    let groupe = '1019000803354214493'
    let parcours = 'Ne sait pas'
    let nom = 'Un.e illustre inconnu.e'
    try {
        const message1 = await member.send({content: message1Content, components: [groupRow]})
        await message1.awaitMessageComponent({filter: interaction => interaction.user.id === member.id, componentType:3, time:300_000})
            .then(async interaction => {
                member.guild.roles.fetch(interaction.values[0]).then(role => groupe = role.name)
                member.guild.members.addRole({user: member.id, role: interaction.values[0]})

                interaction.update({content: 'Super ! Plus que 2 questions !', components: []})
                const message2 = await member.send({content: message2Content, components: [parcoursRow]})
                await message2.awaitMessageComponent({filter: interaction => interaction.user.id === member.id, componentType:3, time:300_000})
                    .then(async interaction => {
                        parcours = +interaction.values[0]
                        switch (parcours) {
                            case 3:
                                member.guild.members.addRole({user: member.id, role: '1019003865837875201'})
                                break
                            case 4:
                                member.guild.members.addRole({user: member.id, role: '1019003732161200230'})
                            default:
                                break
                        }
                        interaction.update({content: 'Génial ! Dernière question :', components: []})
                        const message3 = await member.send(message3Content)
                        await message3.channel.awaitMessages({max: 1, time:300_000})
                            .then(collectedMessage => {
                                nom = collectedMessage.first().content||'Un.e illustre inconnu.e'
                                member.setNickname(nom)
                                member.send(endMessageContent(groupe, parcours, nom))
                            })
                            .catch(_ => member.send('La procédure est annulée.'))
                    })
                    .catch(_ => member.send('La procédure est annulée.'))
            })
            .catch(_ => member.send('La procédure est annulée.'))
    } catch (err) {
        const generalChannel = await member.guild.channels.fetch('1018994587664121878')
        const message1 = await generalChannel.send({content: message1Content, components: [groupRow]})
        await message1.awaitMessageComponent({filter: interaction => interaction.user.id === member.id, componentType:3, time:300_000})
            .then(async interaction => {
                member.guild.roles.fetch(interaction.values[0]).then(role => groupe = role.name)
                member.guild.members.addRole({user: member.id, role: interaction.values[0]})
    
                interaction.update({content: 'Super ! Plus que 2 questions !', components: []})
                const message2 = await generalChannel.send({content: message2Content, components: [parcoursRow]})
                await message2.awaitMessageComponent({filter: interaction => interaction.user.id === member.id, componentType:3, time:300_000})
                    .then(async interaction => {
                        parcours = +interaction.values[0]
                        switch (parcours) {
                        case 3:
                            member.guild.members.addRole({user: member.id, role: '1019003865837875201'})
                            break
                        case 4:
                            member.guild.members.addRole({user: member.id, role: '1019003732161200230'})
                        default:
                            break
                        }
                        interaction.update({content: 'Génial ! Dernière question :', components: []})
                        const message3 = await generalChannel.send(message3Content)
                        await message3.channel.awaitMessages({max: 1, time:300_000})
                            .then(async collectedMessage => {
                                nom = collectedMessage.first().content||'Un.e illustre inconnu.e'
                                member.setNickname(nom)
                                await generalChannel.bulkDelete(4)
                                generalChannel.send(endMessageContent(groupe, parcours, nom))
                            })
                            .catch(_ => member.send('La procédure est annulée.'))
                    })
                    .catch(_ => member.send('La procédure est annulée.'))
            })
            .catch(_ => member.send('La procédure est annulée.'))
    }
})


client.login('MTAxOTAxMTIxNjU2OTU1MjkwNg.G0Q5Ga.wzo2Gzs_Cn8IOC5HT_bdTyW5ol2W14GZznTsPs');
