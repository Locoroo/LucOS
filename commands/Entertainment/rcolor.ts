import { MessageEmbed, MessageComponentInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Entertainment',
    description: 'Generate a random color.',

    testOnly: true,
    slash: true,
    
    cooldown: '3s',

    // Command Actions
    callback: ({ interaction, channel }) => {

        let rcolor = Math.floor(Math.random()*16777215).toString(16);
        
        function creatEmbed(color: any) {
            return new MessageEmbed()
                .setTitle(`**#${rcolor}**`)
                .setColor(color)
                .setFooter('Random Color Generator')
                .setThumbnail(`https://www.webfx.com/web-design/random-color-picker/#CC7011`)
        }

        let rcEmbed = creatEmbed(rcolor)

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('repick')
                .setLabel('Pick Again')
                .setStyle('SECONDARY')
            )
        
        interaction.reply({
            embeds: [rcEmbed],
            components: [button]
        })

        // Filter who pressed the button
        const filter = (btnInt: MessageComponentInteraction) => {
            return interaction.user.id === btnInt.user.id
        }

        // Define the collector
        const collector = channel.createMessageComponentCollector({
            filter,
        })
  
        // When an interaction is collected, run this:
        collector.on('collect', async (int: MessageComponentInteraction) => {
            try {
            rcolor = Math.floor(Math.random()*16777215).toString(16);
            rcEmbed = creatEmbed(rcolor)

            await int.update({
                embeds: [rcEmbed],
                components: [button]
            })
            } catch (error) {}
        })

    },

} as ICommand