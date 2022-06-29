const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "credit",
    category: "info",
    description: "You can check the bot information.",

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Credit")
            .setDescription("```Made by Taka#3651\nversion 1.0.0```");
        await message.channel.send({ embeds: [embed] });
    },
};
