import { Message } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Information about the command.
    category: 'Administrator',
    description: 'Command that clears out multiple messages in a channel.',

    permissions: ['MANAGE_CHANNELS'],

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<amount>',
    expectedArgsTypes: ['NUMBER'],

    slash: true,
    guildOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, channel, args }) => {
        const amount = parseInt(args.shift()!)
        
        if (isNaN(amount)) {
            interaction.reply({ 
                content: 'Please input a valid number!', 
                ephemeral: true 
            })
        } else {
            channel.bulkDelete(amount, true);
            interaction.reply({
                content: `Deleted ${amount} message(s).`  
            })
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        }
        
        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        console.log(`[SlashCMD] ${time} | ${interaction.user.tag} cleared ${amount} message(s) at "${interaction.guild?.name}" in ChID: ${interaction.channelId}`)
    },

} as ICommand
