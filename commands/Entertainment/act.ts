import { GuildMember, TextChannel, Permissions } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Entertainment',
    description: 'Pretend to be a user.',

    guildOnly: true,
    slash: false,
    
    minArgs: 2,
    
    // Command Actions
    callback: async ({ message, args }) => {

        try {
            
            // Check if they have permission
            if(message.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.id === '270600189859856385') {
                
                // Target User
                const targetUser = message.mentions.members?.first() as GuildMember

                // Message
                args.shift()
                const msg = args.join(' ')

                // Channel
                const channel = message.channel as TextChannel
                await channel.bulkDelete(1, true);

                // Webhook
                channel.createWebhook(`${targetUser.user.username}`, {avatar: targetUser.user.displayAvatarURL({ format: 'png', size: 2048 })})
                    .then(wb => {
                        wb.send(msg);
                        setTimeout(() => {
                            wb.delete()
                        }, 2000)
                        ;
                    })  

                // Log
                const today = new Date();
                const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
                console.log(`[ACT] ${time} | ${message.author.tag} acted as ${targetUser.user.tag} and said "${msg}"`)

            } else { return }
            
        } catch (error) {
            const today = new Date();
            const time = `${today.getHours()}:${today.getMinutes()} - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
            console.log(`[ACT] ${time} | ${message.author.tag}, incorrect use.`)
            return;
        }
    },

} as ICommand