import { MessageEmbed, MessageComponentInteraction, MessageActionRow, MessageButton, MessageAttachment} from "discord.js";
import { ICommand } from "wokcommands";

const Canvas = require('canvas');
const Discord = require('discord.js');

export default {

    // Command Config
    category: 'Entertainment',
    description: 'Generate a random color.',
    
    slash: true,
    
    cooldown: '3s',

    // Command Actions
    callback: ({ interaction, channel }) => {

        let num = 0;
        let rcolor = Math.floor(Math.random()*16777215).toString(16);
        
        function makeCanvas(color: any, n: number) {
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, 500, 500);
        
        return new Discord.MessageAttachment(canvas.toBuffer(),`colorimage${n}.png`);
        }
                   
        function creatEmbed(color: any, n: number) {
            return new MessageEmbed()
                .setTitle(`**#${rcolor}**`)
                .setColor(color)
                .setFooter('Random Color Generator')
                .setImage(`attachment://colorimage${n}.png`)
                .setTimestamp()
        }

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('repick')
                .setLabel('Pick Again')
                .setStyle('SECONDARY')
            )

        
        let attachment = makeCanvas(rcolor, 0)
        let rcEmbed = creatEmbed(rcolor, 0)
    
        interaction.reply({
            embeds: [rcEmbed],
            files: [attachment],
        })
        

        // Filter who pressed the button
        // const filter = (btnInt: MessageComponentInteraction) => {
        //     return interaction.user.id === btnInt.user.id
        // }

        // // Define the collector
        // const collector = channel.createMessageComponentCollector({
        //     filter,
        // })
  
        // // When an interaction is collected, run this:
        // collector.on('collect', async (int: MessageComponentInteraction) => {
        //     try {
            
        //     rcolor = Math.floor(Math.random()*16777215).toString(16);

        //     let attachment = makeCanvas(rcolor, num)
        //     let rcEmbed = creatEmbed(rcolor, num)
        //     num++
        //     await int.editReply({
        //         embeds: [rcEmbed],
        //         files: [attachment],
        //         components: [button]
        //     })
        //     } catch (error) {}
        // })

    },

} as ICommand