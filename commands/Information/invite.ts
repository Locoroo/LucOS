import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Information',
    description: 'Invite the bot to your server or join our community server!',
    
    slash: true,

    // Command Actions
    callback: ({ interaction }) => {
        
        const inviteEmbed = new MessageEmbed()
            .setTitle('Invite me or join our Community Server!')
            .setColor('#34c9eb')
            .setDescription('Like the bot so far? You can add it to your server using the buttons bellow! Come join our community if you\'d like!')
            .setFooter('- @Locoroo#1984')

        function newButton(url: string, label: string, style: any, disabled = false) {
            return new MessageButton().setURL(url).setLabel(label).setStyle(style).setDisabled(disabled);
        }

        const buttons = new MessageActionRow().addComponents(
            newButton('https://discord.com/api/oauth2/authorize?client_id=916166557070147594&permissions=8&scope=bot%20applications.commands', 'Invite me!', 'LINK'),
            newButton('https://discord.gg/ykJzjwDfbF', 'Community Server', 'LINK')
        )

        interaction.reply({
            embeds: [inviteEmbed],
            components: [buttons]
        })
    },

} as ICommand