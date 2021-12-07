import { ICommand } from "wokcommands";
import { Client, Interaction } from "discord.js";

const setStatus = (client: Client, status: string) => {
    client.user?.setPresence({
        status: 'dnd',
        activities: [
            {
                name: status,
            },
        ],
    })
}

export default {
    // Information about the command.
    category: 'Configuration',
    description: 'Update the bot\'s status.',

    minArgs: 1,
    expectedArgs: '<status>',

    ownerOnly: true,
    hidden: true,

    slash: true,
    testOnly: true,

    init: (client: Client) => {
        // TODO: Load the status from the database
        const status = "The Testing Game"; // Would come from the database
        setStatus(client, status)
      },

    // Function that runs whenever the command is ran
    callback: ({ client, text, interaction }) => {
        setStatus(client, text)

        interaction.reply({
            content: 'Status set!',
            ephemeral: true
        })
    },

} as ICommand