const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Make Ticket!',

    run: async (client, msg, args) => {
        const send = await msg.channel.send('🔁Making...')
        const guild = msg.guild
        const role = await guild.roles.create({
            name: '🎫｜' + msg.author.tag
        })
        msg.member.roles.add(role)
        const channel = await msg.guild.channels.create('🎫｜' + msg.member.displayName, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: role.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: guild.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ]
        })
        const voice = await msg.guild.channels.create('🎙｜' + msg.member.displayName, {
            type: 'GUILD_VOICE',
            permissionOverwrites: [
                {
                    id: role.id,
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                },
                {
                    id: guild.id,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                }
            ]
        })
        const btn = new MessageButton()
            .setCustomId('D' + voice.id + ' ' + role.id)
            .setStyle('DANGER')
            .setLabel('Delete')
        channel.send({
            content: 'チャンネルを削除するには以下のボタンを押してください。',
            components: [new MessageActionRow().addComponents(btn)]
        })
        send.delete();
        msg.reply('Create!');
    }
}