const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const dir = require('app-root-path');

module.exports = {
    name: 'help',
    description: 'Display Help!',

    run: async (client, msg, args) => {
        if (!args[0]) {
            const send = await msg.channel.send('🔁Creating...');
            let categories = fs.readdirSync(dir + '/commands/')
            for (let i = 0; i < categories.length; i++) {
                categories[i] = '> **' + categories[i] + '**\n';
            }
            const embed = new MessageEmbed()
                .setTitle('Categories')
                .setDescription(categories.join(' '))
            msg.reply({ embeds: [embed] });
            send.delete()
        } else if (!args[1]) {
            const send = await msg.channel.send('🔁Creating...');
            const category = args[0]
            let categories = fs.readdirSync(dir + '/commands/')
            if (!categories.includes(args[0])) {
                return msg.reply("```Error...Code-0```")
            }
            const files = fs.readdirSync(dir + '/commands/' + category + '/').filter(file => file.endsWith('.js'));
            let cmds = new Array();
            for (let i = 0; i < files.length; i++) {
                const command = require(dir + '/commands/' + category + '/' + files[i])
                cmds.push('**' + command.name + '**', command.description)
            }
            for (let i = 0; i < cmds.length; i++) {
                cmds[i] = '> ' + cmds[i] + '\n';
            }
            const embed = new MessageEmbed()
                .setTitle('**' + category + '**')
                .setDescription(cmds.join(' '))
            msg.reply({ embeds: [embed] });
            send.delete()
        }
    }
}