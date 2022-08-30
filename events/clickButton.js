const client = require("../main");

client.on('interactionCreate', async (i) => {
    if (i.customId.startsWith('D')) {
        var reg = new RegExp("^(.{" + (0).toString() + "}).");
        const id = i.customId.replace(reg, '$1');
        let ary = id.trim().split(/ +/g)
        const voice = await i.guild.channels.fetch(ary[0])
        const text = await i.channel
        const role = (await i.guild.roles.fetch(ary[1]))
        role.delete()
        voice.delete()
        text.delete()
    }
})