import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Entertainment',
    description: 'Flip a Coin!',

    cooldown: '2s',

    slash: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, guild }) => {

        let data = await db.get(`Flip_${interaction.guild?.id}`);
        
        let flip;
        
        if (data === null) {
            flip = {
                heads: 0,
                tails: 0
            }
        } else {
            flip = JSON.parse(data);
        }

        // Random Number between 1 and 2
        const max = 2;
        const result = Math.floor(Math.random() * max + 1);

        switch (result) {
            case 1: {
                flip.tails = flip.tails + 1
                break;
            }
            case 2: {
                flip.heads = flip.heads + 1
                break;
            }
        }
        
        let flipTotal = flip.heads + flip.tails;

        // Create Embeds
        const tailsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('LIGHT_GREY')
            .setDescription('Coin landed on: **TAILS**')
            .setThumbnail('attachment://tails.png')
            .setFooter(`Heads: ${flip.heads}      |       Tails: ${flip.tails}      |       Total Flips: ${flipTotal}`)
        
        const headsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('GOLD')
            .setDescription('Coin landed on: **HEADS**')
            .setThumbnail('attachment://heads.png')
            .setFooter(`Heads: ${flip.heads}      |       Tails: ${flip.tails}      |       Total Flips: ${flipTotal}`)

            
        // Send Results
        switch (result) {
            case 1: {
                interaction.reply({
                    embeds: [tailsEmbed],
                    files: ['./images/tails.png']
                })
                break;
            }
            case 2: {
                interaction.reply({
                    embeds: [headsEmbed],
                    files: ['./images/heads.png']
                })
                break;
            }
        }
        // Save it back to the Database
        const savedData = JSON.stringify(flip);
        await db.set(`Flip_${interaction.guild?.id}`, `${savedData}`);
        
    },

} as ICommand