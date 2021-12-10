import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    
    // Information about the command.
    category: 'Information',
    description: 'Displays information about the bot.',

    slash: true,

    cooldown: '5s',

    // Function that runs whenever the command is ran
    callback: ({ interaction, client }) => {

        const isBot = client.user?.bot
        let x;

        switch (isBot) {
            case true: {
                x = 'Yes, I am'
                break;
            }
            case false: {
                x = 'No, I\'m not.'
                break;
            }
        }

        function timeInSeconds (ms: any) {
            return ms / 1000
        }

        function timeInMinutes (s: any) {
            return s / 60000
        }

        function timeInHours (m: any) {
            return m / 3.6e+6
        }

        let uptime = `${Math.floor(timeInSeconds(client.uptime))} Second(s)`

        if (parseInt(uptime) >= 60) {
            uptime = `${Math.floor(timeInMinutes(client.uptime))} Minute(s)`
        }
    
        if (parseInt(uptime) >= 60) [
            uptime = `${Math.floor(timeInHours(client.uptime))} Hour(s)`
        ]

        
        
        const embed = new MessageEmbed()
            .setTitle('Bot Information:')
            .setThumbnail(`${client.user?.displayAvatarURL()}`)
            .setColor('#34c9eb')
            .addFields([
                {
                    name: 'Username:',
                    value: `${client.user?.username}`,
                    inline: true
                },
                {
                    name: 'Discriminator:',
                    value: `${client.user?.discriminator}`,
                    inline: true
                },
                {
                    name: 'Am I a Bot?',
                    value: `${x}`,
                    inline: true
                },
                {
                    name: 'Created at:',
                    value: `${client.user?.createdAt}`
                },
                {
                    name: 'ID:',
                    value: `${client.user?.id}`,
                    inline: true
                },
                {
                    name: 'Uptime:',
                    value: `Been running for ${uptime}.`,
                    inline: true
                }  
            ])
            .setFooter('Created by: Locoroo#1984')

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        })

    },

} as ICommand