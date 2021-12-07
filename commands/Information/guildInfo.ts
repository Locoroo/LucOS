import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    
    // Information about the command.
    category: 'Information',
    description: 'Displays information about the server.',

    slash: true,
    
    // Function that runs whenever the command is ran
    callback: ({ interaction, guild }) => {
        
        let verifiedIcon = ''
        let partnerIcon = ''

        if (interaction.guild?.verified) {
            verifiedIcon = '<:Verified:917510692544868382> Verified'
        }
        if (interaction.guild?.partnered) {
            partnerIcon = '<:Partner:917515232115560508> Partnered'
        }

        if (interaction.guild?.partnered === false && interaction.guild.verified === false) {
            verifiedIcon = 'This server has no badges.'
        }
        
        const embed = new MessageEmbed()
            .setColor('#34c9eb')
            .setTitle('Server Information:')
            .setThumbnail(`${interaction.guild?.iconURL()}`)
            .addFields([
                {
                    name: 'Name:',
                    value: `${interaction.guild?.name}`,
                    inline: true
                },
                {
                    name: 'Owner:',
                    value: `<@!${interaction.guild?.ownerId}>`,
                    inline: true
                },
                {
                    name: 'Server ID:',
                    value: `${interaction.guild?.id}`,
                    inline: true
                },
                {
                    name: 'Created at:',
                    value: `${interaction.guild?.createdAt}`
                },
                {
                    name: 'Members:',
                    value: `${interaction.guild?.memberCount}`,
                    inline: true
                },
                {
                    name: 'Badges:',
                    value: `${verifiedIcon} ${partnerIcon}`,
                    inline: true
                },
            ])

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })

    },

} as ICommand