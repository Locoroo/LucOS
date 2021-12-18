import { Client } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Configuration',
    description: 'Displays a list of all the guilds the bot is in.',

    ownerOnly: true,
    testOnly: true,
    slash: true,

    // Command Actions
    callback: ({ interaction, client }) => {
        // channel, args, text, client, prefix, instance, message
        client.guilds.cache.forEach(guild => {
            console.log(`${guild.name} | ${guild.id}`);
          })
        interaction.reply({
            content: 'Printed to the console.',
            ephemeral: true
        })
    },

} as ICommand