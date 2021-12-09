import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Economy',
    description: 'Shows your account balance status.',

    slash: true,
    testOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client }) => {
        
      let currencyIcon = `<:Credits:918484129153187881>`

      // Get Balance Values from Database
      let balance = await db.get(`wallet_${interaction.user.id}`);
      let bank = await db.get(`bank_${interaction.user.id}`);
        

      if (balance === null) {
        balance = 500;
        }
      if (bank === null) {
        bank = 0;
        }
        
      const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Account Balance:`)
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${balance}`
          },
          {
            name: 'Bank:',
            value: `${currencyIcon} ${bank}`
          }
        ])
        .setColor('GOLD')
        .setTimestamp(Date.now())

        
      await interaction.reply({
        embeds: [embed]
      })


      // Save it back to the Database
      await db.set(`wallet_${interaction.user.id}`, balance);
      await db.set(`bank_${interaction.user.id}`, bank);

    },

} as ICommand