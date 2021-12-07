import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    // Information about the command.
    category: 'Entertainment',
    description: 'Flip a Coin!',

    slash: true,
    testOnly: true,

    // Function that runs whenever the command is ran
    callback: ({ interaction }) => {

        let timesFlipped = 0;
        let timesLandedHeads = 0;
        let timesLandedTails = 0;

        const tailsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('LIGHT_GREY')
            .setDescription('Coin landed on: **TAILS**')
            .setThumbnail('https://i.imgur.com/mdLEHjx.png')
            .setFooter(`Heads: ${timesLandedHeads}      |       Tails: ${timesLandedTails}      |       Total Flips: ${timesFlipped}`)
        
        const headsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('GOLD')
            .setDescription('Coin landed on: **HEADS**')
            .setThumbnail('https://i.imgur.com/GXl4S9N.png')
            .setFooter(`Heads: ${timesLandedHeads}      |       Tails: ${timesLandedTails}      |       Total Flips: ${timesFlipped}`)

            const max = 2;
            const result = Math.floor(Math.random() * max + 1);

        switch (result) {
            case 1: {
                interaction.reply({
                    embeds: [tailsEmbed],
                })
                break;
            }
            case 2: {
                interaction.reply({
                    embeds: [headsEmbed],
                })
                break;
            }
        }
    },

} as ICommand