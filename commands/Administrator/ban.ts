import { GuildMember, Permissions, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Administrator',
    description: 'Ban an user from the server.',
    
    guildOnly: true,
    slash: true,
    
    permissions: ['BAN_MEMBERS'],
    
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    minArgs: 2,

    // Command Actions
    callback: ({ interaction, message, channel, args }) => {

        // Check if target is bannable
        const target = interaction.options.getMember('user') as GuildMember

        if (target.id === interaction.user.id) {
            return interaction.reply({
                        content: 'You cannot ban yourself!',
                        ephemeral: true
                    })
        }

        if (!target.bannable) {
            return interaction.reply({
                        content: 'This user cannot be banned!',
                        ephemeral: true
                    })
        }

        // Get reason
        args.shift()
        let reason = args.join(' ')

        // Ban the target
        target.ban({days: 7, reason: reason})

        const banEmbed = new MessageEmbed()
            .setTitle(`**${target.user.tag} was banned from the server.**`)
            .addField('**Reason:**', reason)
            .setColor('RED')
            .setThumbnail('attachment://ban.png')
            .setFooter(`Banned by: @${interaction.user.tag}`, interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())
        
        interaction.reply({
            embeds: [banEmbed],
            files: ['./images/ban.png']
        })

        // Log
        const findChannel = interaction.guild?.channels.cache.find(channel => channel.name === "logs") as TextChannel
        if (!findChannel) return
        const banLogEmbed = new MessageEmbed()
            .setTitle(`**Ban Report:**`)
            .addFields([
                {
                    name: '**User:**',
                    value: target.user.tag,
                    inline: true
                },
                {
                    name: '**ID:**',
                    value: target.user.id,
                    inline: true
                },
                {
                    name: '**Reason:**',
                    value: reason
                }
            ])
            .setColor('RED')
            .setThumbnail('attachment://info.png')
            .setFooter(`Banned by: ${interaction.user.tag} | ID: ${interaction.user.id} |`, interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())

        findChannel.send({
            embeds: [banLogEmbed],
            files: ['./images/info.png']
        })

        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        console.log(`[BANS] ${time} | ${interaction.user.tag} banned ${target.user.tag} from their server. `)
    },

} as ICommand