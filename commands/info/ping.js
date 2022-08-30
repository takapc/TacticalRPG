const { MessageEmbed, Message } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Display Ping!',

    run: async (client, msg, args) => {
        const send = await msg.channel.send('🔄Pinding...')
        const embed = new MessageEmbed()
            .setTitle('Pong')
            .setDescription('> 🔌 Ping is ' + client.ws.ping + " now!\n> 🔌 Run speed:" + (send.createdAt - msg.createdAt) + "ms!")
        msg.reply({ embeds: [embed] })
        send.delete()
    }
}