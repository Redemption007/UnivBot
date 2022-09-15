const logging = logChannelError => {
    console.log('Hop 1');
    const logProcessEvent = async (typeError, NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR) => {
        console.log('Hop 3');/*
        await logChannelError.send({embeds:[{
            title:typeError==='warning'?'Un avertissement est arrivé !':'Le bot a rencontré une erreur...',
            fields:[
                {title: 'Date :', value: `<t:${Math.floor(Date.now()/1000)}:F> (<t:${Math.floor(Date.now()/1000)}:R>)`},
                {title: 'Type d\'erreur :', value: typeError},
                {title: `${NAME} (Code ${CODE})`, value: MESSAGE},
                {title: `Emplacement : ${FILE}`, value: `Ligne ${LINE}, Colonne ${COLUMN} (${LINE}:${COLUMN})`},
                {title: 'Pile d\'appels', value: STACK},
                {title: 'Erreur complète :', value: '```js\n'+ERROR+'```'}
            ],
            color: (typeError==='warning'||typeError==='rejectionHandled')?'#ffa500':'#f00'
        }]})*/
    }

    process.on('uncaughtException', async (error, origin) => {
        if (origin === 'unhandledRejection') return process.emit('unhandledRejection', error)
        const [NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR] = [
            new String(reason.name),
            new String(reason.code),
            new String(reason.message),
            new String(reason.lineNumber),
            new String(reason.columnNumber),
            new String(reason.stack),
            new String(reason.fileName),
            new String(reason.toString()),
        ]
        await logProcessEvent('uncaughtException', NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR);
        return process.exit(0)
    })

    process.on('unhandledRejection', async (reason, promise) => {
        const [NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR] = [
            new String(reason.name),
            new String(reason.code),
            new String(reason.message),
            new String(reason.lineNumber),
            new String(reason.columnNumber),
            new String(reason.stack),
            new String(reason.fileName),
            new String(promise),
        ]
        await logProcessEvent('unhandledRejection', NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR);
        return process.exit(0)
    })

    process.on('rejectionHandled', promise => {
        const [NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR] = [
            new String('Une erreur a été prise en charge !'),
            new String('No code provided'),
            new String('Une Promise rejetée a été prise en charge !'),
            new String(0),
            new String(0),
            new String('No stack'),
            new String('Idk'),
            new String(promise),
        ]
        logProcessEvent('rejectionHandled', NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR);
    })

    process.on('warning', warning => {
        const [NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR] = [
            new String(warning.name),
            new String(warning.code),
            new String(warning.message),
            new String(warning.lineNumber),
            new String(warning.columnNumber),
            new String(warning.stack),
            new String(warning.fileName),
            new String(warning.detail),
        ]
        console.log('Hop 2');
        logProcessEvent('warning', NAME, CODE, MESSAGE, LINE, COLUMN, STACK, FILE, ERROR);
    })

    process.on('exit', async code => {
        await logChannelError.send({embeds:[{
            title:'Le bot redémarre suite à une erreur...',
            fields:[
                {title: 'Date :', value: `<t:${Math.floor(Date.now()/1000)}:F> (<t:${Math.floor(Date.now()/1000)}:R>)`},
                {title: 'Code d\'arrêt :', value: code||'No code provided'}
            ],
            footer: {text: 'Le redémarrage devrait prendre quelques secondes, merci de patienter.'}
        }]})
  })
}

module.exports = logging