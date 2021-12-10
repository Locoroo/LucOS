import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Economy',
    description: 'Shows your account balance status.',

    slash: true,
    guildOnly: true,
    testOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client }) => {
       
      let currencyIcon = `<:Credits:918484129153187881>`

      let data = await db.get(`Credits_${interaction.user?.id}`);
        
      let credits;
        
      if (data === null) {
          credits = {
              balance: 500,
              bank: 0
          }
      } else {
          credits = JSON.parse(data);
      }

        
      const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Account Balance:`)
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${credits.balance}`,
            inline: true
          },
          {
            name: 'Bank:',
            value: `${currencyIcon} ${credits.bank}`,
            inline: true
          }
        ])
        .setColor('GOLD')
        .setThumbnail('https://i.imgur.com/aUckj2T.jpg')
        .setTimestamp(Date.now())

        
      await interaction.reply({
        embeds: [embed]
      })


      // Save it back to the Database
      const savedData = JSON.stringify(credits);
      await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
    },

} as ICommand