import { GuildMember, Permissions, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Administrator',
    description: 'Kick an user from the server.',

    guildOnly: true,
    slash: true,
    
    permissions: ['KICK_MEMBERS'],
    
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    minArgs: 2,

    // Command Actions
    callback: ({ interaction, message, channel, args }) => {

        // Check if target is kickable
        const target = interaction.options.getMember('user') as GuildMember

        if (target.id === interaction.user.id) {
            return interaction.reply({
                        content: 'You cannot kick yourself!',
                        ephemeral: true
                    })
        }

        if (!target.kickable) {
            return interaction.reply({
                        content: 'This user cannot be kicked!',
                        ephemeral: true
                    })
        }

        // Get reason
        args.shift()
        let reason = args.join(' ')

        // Kick the target
        target.kick(reason)

        const imgArray = ['./images/admin/kick.png', './images/admin/kickalt.png']
        const attachArray = ['attachment://kick.png', 'attachment://kickalt.png']
        let y;

        const max = 20;
        const x = Math.floor(Math.random() * max + 1);
        if (x >= 2) { y = 0 } else { y = 1 }

        const banEmbed = new MessageEmbed()
            .setTitle(`**${target.user.tag} was kicked from the server.**`)
            .addField('**Reason:**', reason)
            .setColor('ORANGE')
            .setThumbnail(attachArray[y])
            .setFooter(`Kicked by: @${interaction.user.tag}`, interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())
        
        interaction.reply({
            embeds: [banEmbed],
            files: [imgArray[y]]
        })

        // Log
        const findChannel = interaction.guild?.channels.cache.find(channel => channel.name === "logs") as TextChannel
        if (!findChannel) return
        const banLogEmbed = new MessageEmbed()
            .setTitle(`**Kick Report:**`)
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
            .setColor('ORANGE')
            .setThumbnail('attachment://info.png')
            .setFooter(`Kicked by: ${interaction.user.tag} | ID: ${interaction.user.id} |`, interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())

        findChannel.send({
            embeds: [banLogEmbed],
            files: ['./images/admin/info.png']
        })

        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        console.log(`[KICKS] ${time} | ${interaction.user.tag} kicked ${target.user.tag} from their server. `)
    },

} as ICommand