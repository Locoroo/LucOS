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
                    value: `**Bot AI** - _Requires you to add a channel named "**bot-ai**"! Go ahead and talk with the bot there._
                    **/coinflip** - Flips a coin that lands on either Heads or Tails.
                    **/rcolor** - Picks a random color for you.`
                },
                {
                    name: 'Economy Commands:',
                    value: `**/balance** - Displays your current credits balance.`
                },
                {
                    name: 'Information Commands:',
                    value: `**/help** - The command you just used...
                    **/invite** - Shows an invite link to invite the bot to your server.
                    **/botInfo** - Displays information about the bot itself.
                    **/guildInfo** - Displays information about the server you\'re in.
                    **/profile <user>** - Show's information about a user's profile. Leave black to show your own profile.
                    **/avatar <user>** - Displays a specific user's avatar. Leave blank to show your own avatar.`
                },
                {
                    name: 'Moderation Commands:',
                    value: `**Logs** - _If you want these actions to be logged in a channel, you must create a channel named "**logs**"_.
                    **/ban <user> <reason>** - Ban a user from the server.
                    **/kick <user> <reason>** - Kick a user from the server.
                    **/clear <amount>** - Clears a specific amount of messages in a channel.`
                }
            ])
            .setFooter('Bot Created By: Locoroo#1984 | Last Updated: 12/26/21')
        
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    },

} as ICommand