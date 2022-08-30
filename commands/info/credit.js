const { MessageEmbed } = require("discord.js");
const dir = require("app-root-path");
const { version } = require(dir + "/package.json");

module.exports = {
    name: "credit",
    description: "Display Credit!",

    run: async (client, msg, args) => {
        const send = await msg.channel.send("🔁Creating...");
        const embed = new MessageEmbed()
            .setTitle("Credit")
            .setDescription("> ⚙Made By Taka#9849\n> ⚙ver " + version);
        msg.reply({ embeds: [embed] });
        send.delete();
    },
};
