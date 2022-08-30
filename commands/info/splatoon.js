const axios = require("axios");
const { MessageEmbed, Message } = require("discord.js");

let url = "https://spla2.yuu26.com/rule/now";

module.exports = {
    name: "splatoon",
    description: "Display splatoon!",

    run: async (client, msg, args) => {
        let rule = "regular";
        if (args) {
            if (
                args[0] == "gachi" ||
                args[0] == "regular" ||
                args[0] == "league"
            ) {
                rule = args[0];
            }
        }
        url = `https://spla2.yuu26.com/${rule}/now`;
        axios.get(url).then((res) => {
            //gachi regular league
            const data = res.data.result[0];
            const rand = Math.floor(Math.random() * 2);
            //0 -> 1 or 1 -> 0 ... x-1+1
            msg.reply({
                embeds: [
                    {
                        title: data.rule,
                        description: `${data.maps[0]}・${data.maps[1]}`,
                        thumbnail: {
                            url: data.maps_ex[rand * -1 + 1].image,
                        },
                        image: {
                            url: data.maps_ex[rand].image,
                        },
                    },
                ],
            });
        });
    },
};
