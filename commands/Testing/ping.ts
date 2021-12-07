import { Message } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    // Information about the command.
    category: 'Testing',
    description: 'Command that replies with Pong!',

    slash: true,

    // Function that runs whenever the command is ran
    callback: ({ interaction, client }) => {
        interaction.reply({
            content: `Pong! \`${Math.round(client.ws.ping)} ms\`, <@${interaction.user.id}>`
        })
    },

} as ICommand