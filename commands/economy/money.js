const Keyv = require("keyv");
const moneys = new Keyv("sqlite://db.sqlite", { table: "moneys" });

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "money",
    category: "economy",
    description: "moeny-y-y!.",

    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        let name = new String();
        if (member) {
            name = member.user.username;
        } else {
            name = message.author.username;
            member = message.author;
        }
        const Status = (await moneys.get(member.id)) || {
            money: 1000,
            bank: 0,
        };
        const embed = new MessageEmbed()
            .setTitle("✦Status✦")
            .setDescription("**" + name + "**")
            .setFields([
                {
                    name: "**━━━━━━━━__現物__━━━━━━━━**",
                    value:
                        "*現在の所持金: **" +
                        Status.money +
                        "ℵ**" +
                        "*" +
                        "\n*銀行預金: **" +
                        Status.bank +
                        "ℵ** *",
                },
                {
                    name: "**━━━━━━━━━━━━━━━━━━**",
                    value: "億万長者をめざそう",
                },
            ]);
        await message.channel.send({ embeds: [embed] });
        moneys.set(member.id, Status);
    },
};
