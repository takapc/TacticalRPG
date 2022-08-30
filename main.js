const Discord = require('discord.js');
const { Intents, Client } = require('discord.js');
const client = new Client({ intents: 32767 })

module.exports = client;

const fs = require('fs');
require('dotenv').config();

const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN;


client.on('ready', () => {
    console.info(client.user.tag + " is enabled ✅")
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');

['command', 'event'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})


client.login(token)