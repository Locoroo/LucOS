import { Message } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Information about the command.
    category: 'Administrator',
    description: 'Command that clears out multiple messages in a channel.',

    permissions: ['MANAGE_CHANNELS'],

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: true,
    guildOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, channel, args }) => {
        const amount = parseInt(args.shift()!)
        // const amount = args.length ? parseInt(args.shift()!) : 1
        
        const { size } = await channel.bulkDelete(amount, true);

        interaction.reply({
            content: `Deleted ${amount} message(s).`  
        })
        console.log(`[SlashCMD] ${Date()} | ${interaction.user.tag} cleared ${amount} message(s) at "${interaction.guild?.name}" in ChID: ${interaction.channelId}`)
        setTimeout(() => {
            interaction.deleteReply()
        }, 5000)
    },

} as ICommand
