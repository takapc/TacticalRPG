const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "You can check the bot ping.",

    run: async (client, message, args) => {
        const msg = await message.channel.send("🔄 Pinding...");
        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
                `> 📌Ping is ${
                    client.ws.ping
                }ms!\n> 📌Running speed is ${Math.floor(
                    msg.createdAt - message.createdAt
                )}ms!`
            );
        await message.channel.send({ embeds: [embed] });
        msg.delete();
    },
};
