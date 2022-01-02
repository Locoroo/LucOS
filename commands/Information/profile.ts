import { Message, MessageEmbed, GuildMember, MessageAttachment} from "discord.js";
import { ICommand } from "wokcommands";

const wait = require('util').promisify(setTimeout);

const Canvas = require('canvas')

const Banner = require('discord.js-banner');
const banner = new Banner(process.env.TOKEN);

export default {
    // Information about the command.
    category: 'Information',
    description: 'Displays any user\'s profile.',

    slash: true,
    guildOnly: true,
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    // Function that runs whenever the command is ran
    callback: async ({ interaction, text }) => {

        let userID = interaction.options.getMember('user') as GuildMember

        let userAvatar;
        let userBanner;
        let userName;
        let userDisc;
        let userCreatedAt;
        let userBot;
        let userId;
        let x;

        if(!userID) {
            userAvatar = interaction.user.displayAvatarURL({ format: 'jpg' });
            userBanner = await banner.get(interaction.user?.id, 2048);
            userName = interaction.user?.username;
            userDisc = interaction.user?.discriminator;
            userCreatedAt = interaction.user?.createdAt
            userBot = interaction.user?.bot
            userId = interaction.user?.id
        } else {
            userAvatar = userID.user.displayAvatarURL({ format: 'jpg'});
            userBanner = await banner.get(userID.user?.id, 2048);
            userName = userID.user?.username;
            userDisc = userID.user?.discriminator;
            userCreatedAt = userID.user?.createdAt
            userBot = userID.user?.bot
            userId = userID.user?.id
        }

        switch (userBot) {
            case false: { x = '**Human**'; break; }
            case true: { x = 'a **Bot**'; break; }
        }

        const userEmbed = new MessageEmbed()
            .setTitle('User Profile:')
            .setThumbnail(`${userAvatar}`)
            .setImage(userBanner.banner)
            .setColor('#34c9eb')
            .addFields([
                {
                    name: '**Username:**',
                    value: `${userName}`,
                    inline: true
                },
                {
                    name: '**Discriminator:**',
                    value: `#${userDisc}`,
                    inline: true
                },
                {
                    name: '**Tag:**',
                    value: `<@${userId}>`,
                    inline: true
                },  
            ])
            .addFields([
                {
                    name: '**Created at:**',
                    value: `${userCreatedAt}`,
                },
                {
                    name: '**Type:**',
                    value: `I am ${x}`,
                    inline: true
                }, 
            ])
            .addFields([
                {
                    name: '**ID:**',
                    value: `${userId}`,
                    inline: true
                },                
            ])
            .setTimestamp()

        interaction.reply({ embeds: [userEmbed]});
    },

} as ICommand