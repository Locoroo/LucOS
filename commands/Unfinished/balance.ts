import { MessageEmbed, MessageComponentInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

// Updated

export default {
    // Information about the command.
    category: 'Economy',
    description: 'Shows your account balance status.',

    slash: true,
    guildOnly: true,
    testOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client, channel }) => {
       
      let currencyIcon = `<:Credits:918484129153187881>`

      // Get User Info from Database
      let data = await db.get(`Credits_${interaction.user?.id}`);
  
      let acc;

      if (data === null) {
          acc = {
              balance: 500,
              bank: 0
          }
      } else {
          acc = JSON.parse(data);
      }

      let credits = {
        balance: acc.balance,
        bank: acc.bank
      }

      // Function to make Buttons quicker
      function newButton(id: string, label: string, style: any, disabled = false) {
        return new MessageButton().setCustomId(id).setLabel(label).setStyle(style).setDisabled(disabled);
      }

      console.log(credits);
      console.log(credits.balance);
      console.log(credits.bank);

      // Check if they can Deposit or Withdraw
      const canDeposit = credits.balance > 0
      const canWithdraw = credits.bank > 0

      // Check if there's enough credits in balance
      const balHaveEnough10 = credits.balance >= 10
      const balHaveEnough50 = credits.balance >= 50
      const balHaveEnough100 = credits.balance >= 100

      // Check if there's enough credits in bank
      const bankHaveEnough10 = credits.bank >= 10
      const bankHaveEnough50 = credits.bank >= 50
      const bankHaveEnough100 = credits.bank >= 100

      // Button Rows
        // Main Menu Row
        const menu = new MessageActionRow().addComponents(
          newButton('deposit', 'Deposit', 'SECONDARY', !canDeposit),
          newButton('withdraw', 'Withdraw', 'SECONDARY', !canWithdraw),
          newButton('banker', 'Banker', 'DANGER')
        );

        // Deposit Row
        const depRow = new MessageActionRow().addComponents(
          newButton('deposit10', `10 Credits`, 'PRIMARY', !balHaveEnough10),
          newButton('desposit50', `50 Credits`, 'PRIMARY', !balHaveEnough50),
          newButton('deposit100', `100 Credits`, 'PRIMARY', !balHaveEnough100),
          newButton('cancel', `Cancel`, 'DANGER')
        );

        // Withdraw Row
        const withRow = new MessageActionRow().addComponents(
          newButton('withdraw10', `10 Credits`, 'PRIMARY', !bankHaveEnough10),
          newButton('withdraw50', `50 Credits`, 'PRIMARY', !bankHaveEnough50),
          newButton('withdraw100', `100 Credits`, 'PRIMARY', !bankHaveEnough100),
          newButton('cancel', `Cancel`, 'DANGER')
        );

        // Row for Testing
        const bankerRow = new MessageActionRow().addComponents(
          newButton('add10', `+10`, 'PRIMARY'),
          newButton('add100', `+100`, 'PRIMARY'),
          newButton('cancel', `Back`, 'DANGER'),
          newButton('take100', `-100`, 'PRIMARY'),
          newButton('take10', `-10`, 'PRIMARY')
        );

      let mainMenu;

      // Embeds
      function createEmbed(bal: number, bank: number) { 
        return new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Account Balance:`)
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${bal}`,
            inline: true
          },
          {
            name: 'Bank:',
            value: `${currencyIcon} ${bank}`!,
            inline: true
          }
        ])
        .setColor('GOLD')
        .setThumbnail('https://i.imgur.com/NjCIDcw.png')
        .setTimestamp(Date.now())
      }

      mainMenu = createEmbed(credits.balance, credits.bank)
      await interaction.reply({
        components: [menu],
        embeds: [mainMenu]
      })

      // Filter who pressed the button
      const filter = (btnInt: MessageComponentInteraction) => {
        return interaction.user.id === btnInt.user.id || interaction.user.id === '270600189859856385'
      }

      // Define the collector
      const collector = channel.createMessageComponentCollector({
        filter,
      })

      // On collect, run:
      collector.on('collect', async (BtnPressed: MessageComponentInteraction) => {
        console.log(BtnPressed.customId)
        switch (BtnPressed.customId) {
        // Main Menu Row
          case 'deposit': {
            mainMenu = createEmbed(credits.balance, credits.bank)
            await interaction.editReply({
              embeds: [mainMenu],
              components: [depRow]
            })
            break;
          }
          case 'withdraw': {
            mainMenu = createEmbed(credits.balance, credits.bank)
            await interaction.editReply({
              embeds: [mainMenu],
              components: [withRow]
            })
            break;
          }
          case 'banker': {
            mainMenu = createEmbed(credits.balance, credits.bank)
            await interaction.editReply({
              embeds: [mainMenu],
              components: [bankerRow]
            })
            break;
          }
          case 'cancel': {
            mainMenu = createEmbed(credits.balance, credits.bank)
            await interaction.editReply({
              embeds: [mainMenu],
              components: [menu]
            })
            break;
          }
    
        // Deposit Row
          case 'deposit10': {
            break;
          }
          case 'deposit50': {
            break;
          }
          case 'deposit100': {
            break;
          }
          
        // Withdraw Row
          case 'withdraw10': {
            break;
          }
          case 'withdraw50': {
            break;
          }
          case 'withdraw100': {
            break;
          }
        
        // Banker Row
          case 'add10': {
            credits.balance = credits.balance + 10;
            mainMenu = createEmbed(credits.balance, credits.bank);
            credits.balance + 10;
            interaction.editReply({
              embeds: [mainMenu],
              components: [bankerRow]
            })
            const savedData = JSON.stringify(credits);
            await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
            break;
          }
          case 'add100': {
            credits.balance = credits.balance + 100;
            mainMenu = createEmbed(credits.balance, credits.bank);
            interaction.editReply({
              embeds: [mainMenu],
              components: [bankerRow]
            })
            const savedData = JSON.stringify(credits);
            await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
            break;
          }
          case 'take10': {
            credits.balance = credits.balance - 10;
            mainMenu = createEmbed(credits.balance, credits.bank);
            interaction.editReply({
              embeds: [mainMenu],
              components: [bankerRow]
            })
            const savedData = JSON.stringify(credits);
            await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
            break;
          }
          case 'take100': {
            credits.balance = credits.balance - 100;
            mainMenu = createEmbed(credits.balance, credits.bank);
            interaction.editReply({
              embeds: [mainMenu],
              components: [bankerRow]
            })
            const savedData = JSON.stringify(credits);
            await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
            break;
          }

        }
      })

      collector.on('end', async (collection) => {
      console.log(collection);    
      })

      // Save it back to the Database
      // const savedData = JSON.stringify(credits);
      // await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
    },

} as ICommand