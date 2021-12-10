import DiscordJS, { Client, Intents, Interaction } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const Database = require("@replit/database");
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

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
        botOwners: ['270600189859856385', '386385894686326784'],

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
    
    .setCategorySettings([
        // Set Categories for the built in help menu when most commands are done.
    ])
})

// Whenever an interaction occurs, run this:
client.on('interactionCreate', interaction => {
    console.log(`[SlashCMD] ${Date()} | ${interaction.user.tag} used an interaction at "${interaction.guild?.name}" in ChID: ${interaction.channelId}`)
})

// Log in.
client.login(process.env.TOKEN)