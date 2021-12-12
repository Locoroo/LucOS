import { Message, MessageEmbed, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    // Information about the command.
    category: 'Information',
    description: 'Displays any user\'s avatar.',

    slash: true,
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    // Function that runs whenever the command is ran
    callback: ({ interaction, text }) => {
        
        const userID = interaction.options.getMember('user') as GuildMember

        const sameUser = new MessageEmbed()
            .setTitle(`${interaction.user.username}\'s Avatar`)
            // .setImage(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size`)
            .setImage(interaction.user.displayAvatarURL({ format: 'png', size: 2048 }))
            .setColor('#34c9eb')

        
        if(!userID) {
            return sameUser;
        } else {
            const targetUser = new MessageEmbed()
                .setTitle(`${userID.displayName}\'s Avatar`)
                .setImage(userID.user.displayAvatarURL({ format: 'png', size: 2048 }))
                .setColor('#34c9eb')
            return targetUser;
        }

    },

} as ICommand