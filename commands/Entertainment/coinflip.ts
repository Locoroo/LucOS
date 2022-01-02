import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Entertainment',
    description: 'Flip a Coin!',

    cooldown: '2s',
    guildOnly: true,
    slash: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, guild }) => {

        let data = await db.get(`Guild_${interaction.guild?.id}`);
        
        let server;
        
        if (data === null) {
            server = {
                flip: {
                    heads: 0,
                    tails: 0
                },
                lastBalMsgID: '<msgID>'
            }
        } else {
            server = JSON.parse(data);
        }

        // Random Number between 1 and 2
        const max = 2;
        const result = Math.floor(Math.random() * max + 1);

        switch (result) {
            case 1: {
                server.flip.tails = server.flip.tails + 1
                break;
            }
            case 2: {
                server.flip.heads = server.flip.heads + 1
                break;
            }
        }
        
        let flipTotal = server.flip.heads + server.flip.tails;

        // Create Embeds
        const tailsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('LIGHT_GREY')
            .setDescription('Coin landed on: **TAILS**')
            .setThumbnail('attachment://tails.png')
            .setFooter(`Paws: ${server.flip.heads}      |       Tails: ${server.flip.tails}      |       Total Flips: ${flipTotal}`)
        
        const headsEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.username} flipped a coin!`)
            .setColor('GOLD')
            .setDescription('Coin landed on: **PAWS**')
            .setThumbnail('attachment://paws.png')
            .setFooter(`Paws: ${server.flip.heads}      |       Tails: ${server.flip.tails}      |       Total Flips: ${flipTotal}`)

            
        // Send Results
        switch (result) {
            case 1: {
                interaction.reply({
                    embeds: [tailsEmbed],
                    files: ['./images/coin/tails.png']
                })
                break;
            }
            case 2: {
                interaction.reply({
                    embeds: [headsEmbed],
                    files: ['./images/coin/paws.png']
                })
                break;
            }
        }
        // Save it back to the Database
        const savedData = JSON.stringify(server);
        await db.set(`Guild_${interaction.guild?.id}`, `${savedData}`);
        
    },

} as ICommand