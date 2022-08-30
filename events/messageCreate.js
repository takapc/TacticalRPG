const client = require('../main.js');
require('dotenv').config();

client.on('messageCreate', async msg => {
    if (msg.author.bot || !msg.content.startsWith(process.env.PREFIX)) return;
    if (!msg.guild) return;
    if (!msg.member) msg.member = await msg.guild.fetchMember(msg);
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, msg, args)
})