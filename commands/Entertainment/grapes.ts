import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    // Information about the command.
    category: 'Misc',
    description: 'Grapes.',

    cooldown: '3s',

    // Function that runs whenever the command is ran
    callback: ({ message, text }) => {

        
        const embed = new MessageEmbed()
            .setTitle('Grapes.')
            .setColor("YELLOW")
            .setFooter("Don't ask why this is a thing.")
            .setImage("https://i.imgflip.com/5wnvpg.jpg")

        const specialEmbed = new MessageEmbed()
            .setTitle('You.')
            .setColor("YELLOW")
            .setFooter("Why did you make me do this?")
            .setImage("https://i.imgflip.com/5wnvpg.jpg")

        if (message.author.id === '756799520851099759') {
            message.reply({
                embeds: [specialEmbed]
            })
        } else {
            message.reply({
                embeds: [embed]
            })
        }

    },

} as ICommand