import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Information',
    description: 'Displays all the commands you can use with LucOS.',

    slash: true,

    cooldown: '5s',

    // Command Actions
    callback: ({ interaction }) => {
        
        const embed = new MessageEmbed()
            .setTitle('LucOS\'s Command List')
            .setDescription('_Bot is still in development. More commands will be added soon!_')
            .setColor('#34c9eb')
            .addFields([
                {
                    name: 'Entertainment Commands:',
                    value: `**/coinflip** - Flips a coin that lands on either Heads or Tails.`
                },
                {
                    name: 'Information Commands:',
                    value: `**/help** - The command you just used...
                    **/botInfo** - Displays information about the bot itself.
                    **/guildInfo** - Displays information about the server you\'re in.
                    **/avatar <user>** - Displays a specific user's avatar. Leave blank to show your own avatar.`
                },
                {
                    name: 'Moderation Commands:',
                    value: `**/clear <amount>** - Clears a specific amount of messages in a channel.`
                }
            ])
            .setFooter('Bot Created By: Locoroo#1984 | Last Updated: 12/11/21')
        
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    },

} as ICommand