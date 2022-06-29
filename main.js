const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: 65535 });
const path = require("path");
const fs = require("fs");
var config = require("./config");

client.commands = new Collection();
client.aliases = new Collection();
client.categoris = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`${client.user.tag} is ready! ✅`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});

client.login(config.token);
