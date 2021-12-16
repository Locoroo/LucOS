import { Message, MessageEmbed, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

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
        let bnr = undefined

        if (userID) { 
            const targetUserBanner = await banner.get(userID.user?.id, 2048) 
            bnr = targetUserBanner.banner
        }
        const userBanner = await banner.get(interaction.user?.id, 2048)


        const timestamp = interaction.guild?.joinedTimestamp!
        const d = new Date(timestamp);
        let date = d.toDateString();

        const timestamp2 = interaction.user?.createdTimestamp!
        const t = new Date(timestamp2);
        let date2 = t.toDateString();

        const isBot = interaction.user?.bot
            let x;

            switch (isBot) {
                case false: { x = '**Human**'; break; }
                case true: { x = 'a **Bot**'; break; }
            }

        const sameUser = new MessageEmbed()
            .setTitle('User Profile:')
            .setThumbnail(`${interaction.user?.displayAvatarURL()}`)
            .setImage(userBanner.banner)
            .setColor('#34c9eb')
            .addFields([
                {
                    name: '**Username:**',
                    value: `${interaction.user?.username}`,
                    inline: true
                },
                {
                    name: '**Discriminator:**',
                    value: `#${interaction.user?.discriminator}`,
                    inline: true
                },
                {
                    name: '**Tag:**',
                    value: `<@${interaction.user?.id}>`,
                    inline: true
                },  
            ])
            .addFields([
                {
                    name: '**Created at:**',
                    value: `${interaction.user?.createdAt}`,
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
                    value: `${interaction.user?.id}`,
                    inline: true
                },                
            ])
            .setTimestamp(Date.now())

        
        if(!userID) {
            return sameUser;
        } else {

        const timestamp3 = userID.guild?.joinedTimestamp!
        const f = new Date(timestamp3);
        let date3 = f.toDateString();

        const timestamp4 = userID.user?.createdTimestamp!
        const a = new Date(timestamp4);
        let date4 = a.toDateString();

        const isBot2 = userID.user.bot
            let z;

            switch (isBot2) {
                case false: { z = '**Human**'; break; }
                case true: { z = 'a **Bot**'; break; }
            }
          
        const nick = userID.nickname
        let y;

        if (!nick) {y = "None"} else {y = userID.nickname}
            

        const targetUser = new MessageEmbed()
            .setTitle('User Profile:')
            .setThumbnail(`${userID.user?.displayAvatarURL()}`)
            .setColor('#34c9eb')
            .setImage(bnr)
            .addFields([
                {
                    name: '**Username:**',
                    value: `${userID.user.username}`,
                    inline: true
                },
                {
                    name: '**Discriminator:**',
                    value: `#${userID.user.discriminator}`,
                    inline: true
                },
                {
                    name: '**Tag:**',
                    value: `<@${userID.user.id}>`,
                    inline: true
                }, 
            ])
            .addFields([
                {
                    name: '**Created at:**',
                    value: `${userID.user.createdAt}`,
                },
            ])
            .addFields([
                
                {
                    name: '**ID:**',
                    value: `${userID.user.id}`,
                    inline: true
                },
                {
                    name: '**Type:**',
                    value: `I am ${z}`,
                    inline: true
                }, 
                {
                    name: '**Nickname:**',
                    value: `${y}`,
                    inline: true
                },
            ])
            .setTimestamp(Date.now())
            return targetUser;
       }
    },

} as ICommand