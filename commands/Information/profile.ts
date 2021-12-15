import { Message, MessageEmbed, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    // Information about the command.
    category: 'Information',
    description: 'Displays any user\'s profile.',

    testOnly: true,
    slash: true,
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    // Function that runs whenever the command is ran
    callback: ({ interaction, text }) => {

        let userID = interaction.options.getMember('user') as GuildMember
        
        const isBot = interaction.user?.bot
            let x;

            switch (isBot) {
                case false: { x = '**Human**'; break; }
                case true: { x = '**a Bot**'; break; }
            }

        const sameUser = new MessageEmbed()
            .setTitle('User Profile:')
            .setThumbnail(`${interaction.user?.displayAvatarURL()}`)
            .setColor('#34c9eb')
            .addFields([
                {
                    name: 'Username:',
                    value: `${interaction.user?.username}`,
                    inline: true
                },
                {
                    name: 'Discriminator:',
                    value: `${interaction.user?.discriminator}`,
                    inline: true
                },
                {
                    name: 'Account created at:',
                    value: `${interaction.user?.createdAt}`
                },
                {
                    name: 'ID:',
                    value: `${interaction.user?.id}`,
                    inline: true
                },
                {
                    name: 'Type:',
                    value: `I am ${x}`,
                    inline: true
                }  
            ])
            .setTimestamp(Date.now())

        
        if(!userID) {
            return sameUser;
        } 
        // else {
        //     const targetUser = new MessageEmbed()
        //     .setTitle('User Profile:')
        //     .setThumbnail(`${interaction.user?.displayAvatarURL()}`)
        //     .setColor('#34c9eb')
        //     .addFields([
        //         {
        //             name: 'Username:',
        //             value: `${userID.username}`,
        //             inline: true
        //         },
        //         {
        //             name: 'Discriminator:',
        //             value: `${userID.discriminator}`,
        //             inline: true
        //         },
        //         {
        //             name: 'Account created at:',
        //             value: `${userID.createdAt}`
        //         },
        //         {
        //             name: 'ID:',
        //             value: `${userID.id}`,
        //             inline: true
        //         },
        //         {
        //             name: 'Type:',
        //             value: `I am ${x}`,
        //             inline: true
        //         }  
        //     ])
        //     .setTimestamp(Date.now())
        //     // return targetUser;
        // }
    },

} as ICommand