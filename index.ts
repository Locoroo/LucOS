import DiscordJS, { Client, Intents, Interaction } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => res.send('Bot is up and running!'));
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

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

})

// Whenever an interaction occurs, run this:
client.on('interactionCreate', interaction => {
    const channel = interaction.guild?.channels.cache.get(`${interaction?.channelId}`);
    console.log(`[SlashCMD] ${Date()} | ${interaction.user.tag} used an interaction at "${interaction.guild?.name}" in #${channel?.name}`)
})

// Log in.
client.login(process.env.TOKEN)