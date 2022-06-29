const Keyv = require("keyv");
const moneys = new Keyv("sqlite://db.sqlite", { table: "moneys" });

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "give",
    category: "economy",
    description: "give money",

    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            return message.reply(
                "```You do not have permissions.\n権限を持っていません。```"
            );
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(
                "```Choose the member.\nメンバーを選んでください。```"
            );
        }
        args[1] = Number(args[1]);
        if (!args[1]) {
            args[1] = 0;
        }
        const giveInt = args[1];
        message.reply(
            "```The process has been completed.\n処理が終了しました。```"
        );
        const Status = (await moneys.get(member.id)) || {
            money: 1000,
            bank: 0,
        };
        Status.money += giveInt;
        if (Status.money < 1) {
            Status.money = 0;
        }
        const embed = new MessageEmbed()
            .setTitle("✦Status✦")
            .setDescription("**" + member.tag + "**")
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
        moneys.set(message.author.id, Status);
    },
};
