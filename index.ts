import DiscordJS, { Client, Intents, Interaction } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const axios = require('axios')

const express = require('express');
const app = express();
const port = 3000;

// Start Express Server
app.get("/", (req: any, res: any) => {
        res.sendFile(path.join(__dirname + "/express/src/" + "index.html"))
})
app.listen(port, () => {
    console.log(`[EXPRESS] Listen on port ${port}`)
})

// Intents tells Discord what information it needs to use.
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})
 

// Specify what to do when the bot is ready.
client.on('ready', () => {
    console.log(`The Bot is ready. `)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,

        // Test Servers ID
        testServers: ['498938933707800600'],
   
        // Bot Owner ID
        botOwners: ['270600189859856385'],

        // Disabled Default Commands
        disabledDefaultCommands: [
            'languaje',
            'prefix',
            'requiredrole',
            'channelonly',
            'command',
            'help'
        ]
    })

    .setDefaultPrefix('-')

})

// Anti Crash
process.on("unhandledRejection", (reason, p) => {
    console.log(" [AntiCrash] Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [AntiCrash] Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [AntiCrash] Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [AntiCrash] Multiple Resolves");
    console.log(type, promise, reason);
});

// AI Chat
client.on("messageCreate", async(message) => {
    const findChannel = message.guild?.channels.cache.find(channel => channel.name === "bot-ai");
    if (findChannel === undefined) return; // Check if channel is undefined
    if (findChannel.id !== message.channelId) return; // Check if Channel ID is same as "aichat" channel ID
    if (!findChannel || message.author.bot) return; // Check if there's a channel named 'aichat' and ignore bot's own messages.
    if (message.attachments.size > 0) return;
    
    // API
    const baseUrl = `https://api.monkedev.com/fun/chat`;
    const res = await axios.get(`${baseUrl}?msg=${encodeURIComponent(message.content)}&uid=${message.author.id}&key=dGlrqULK8mZYSTPyhHT56lkUT`);
    
    // Response
    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    message.channel.send(res.data.response)
    console.log(`[AIChat] ${time} | ${message.author.tag} said "${message.content}" and bot responded with: "${res.data.response}"`)
})

// Whenever an interaction occurs, run this:
client.on('interactionCreate', interaction => {
    let channel = interaction.guild?.channels.cache.get(`${interaction?.channelId}`);
    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    console.log(`[SlashCMD] ${time} | ${interaction.user.tag} used an interaction at "${interaction.guild?.name}" in #${channel?.name}`)
})

// Log in.
client.login(process.env.TOKEN)