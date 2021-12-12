import { MessageEmbed, MessageComponentInteraction, MessageActionRow, MessageButton } from "discord.js";
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

      // Check if they can Deposit or Withdraw
      let canDeposit = credits.balance > 0
      let canWithdraw = credits.bank > 0

      // Button Rows
        // Main Menu Row
        const defaultMenu = new MessageActionRow().addComponents(
          newButton('deposit', 'Deposit', 'SECONDARY', !canDeposit),
          newButton('withdraw', 'Withdraw', 'SECONDARY', !canWithdraw),
          newButton('banker', 'Banker Mode', 'DANGER')
        );

        // Banker Row
        const bankerRow = new MessageActionRow().addComponents(
          newButton('add10', `+10`, 'PRIMARY'),
          newButton('add100', `+100`, 'PRIMARY'),
          newButton('cancel', `Back`, 'DANGER'),
          newButton('take100', `-100`, 'PRIMARY'),
          newButton('take10', `-10`, 'PRIMARY')
        );

      let mainMenu;
      let depEmbed;
      let withEmbed;

      // Embeds
      function createEmbed(bal: number, bank: number, color: any = "GOLD", footer = 'Select an option if you would like to manage your balance.') { 
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
        .setColor(color)
        .setThumbnail('https://i.imgur.com/NjCIDcw.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }
      function createDepEmbed(bal: number, bank: number, color: any = "GOLD", footer = 'Select the amount you would like to deposit.') {
        return new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Account Balance:`)
        .setDescription('Deposit Mode:')
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${bal}`,
            inline: true
          },
          {
            name: 'Transfer to:',
            value: `**=======>**`,
            inline: true
          },
          {
            name: 'Bank:',
            value: `${currencyIcon} ${bank}`!,
            inline: true
          }
        ])
        .setColor(color)
        .setThumbnail('https://i.imgur.com/2dkYofN.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }
      function createWithEmbed(bal: number, bank: number, color: any = "GOLD", footer = 'Select the amount you would like to withdraw.') {
        return new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Account Balance:`)
        .setDescription('Withdraw Mode:')
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${bal}`,
            inline: true
          },
          {
            name: 'Transfer to:',
            value: `**<=======**`,
            inline: true
          },
          {
            name: 'Bank:',
            value: `${currencyIcon} ${bank}`!,
            inline: true
          }
        ])
        .setColor(color)
        .setThumbnail('https://i.imgur.com/2dkYofN.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }

      mainMenu = createEmbed(credits.balance, credits.bank)
        await interaction.reply({
        components: [defaultMenu],
        embeds: [mainMenu]
      })

      // Filter who pressed the button
      const filter = (btnInt: MessageComponentInteraction) => {
        return interaction.user.id === btnInt.user.id || btnInt.user.id === '270600189859856385'
      }

      // Define the collector
      const collector = channel.createMessageComponentCollector({
        filter,
      })

      // On collect, run:
      collector.on('collect', async (BtnPressed: MessageComponentInteraction) => {

        // Check if they can Deposit or Withdraw
        canDeposit = credits.balance > 0
        canWithdraw = credits.bank > 0

        // Check if there's enough credits in balance
        const balHaveEnough10 = credits.balance >= 10
        const balHaveEnough50 = credits.balance >= 50
        const balHaveEnough100 = credits.balance >= 100

        // Check if there's enough credits in bank
        const bankHaveEnough10 = credits.bank >= 10
        const bankHaveEnough50 = credits.bank >= 50
        const bankHaveEnough100 = credits.bank >= 100

        // Menu Row
        const menu = new MessageActionRow().addComponents(
          newButton('deposit', 'Deposit', 'SECONDARY', !canDeposit),
          newButton('withdraw', 'Withdraw', 'SECONDARY', !canWithdraw),
          newButton('banker', 'Banker Mode', 'DANGER')
        );

        // Deposit Row
        const depRow = new MessageActionRow().addComponents(
          newButton('deposit10', `10 Credits`, 'PRIMARY', !balHaveEnough10),
          newButton('deposit50', `50 Credits`, 'PRIMARY', !balHaveEnough50),
          newButton('deposit100', `100 Credits`, 'PRIMARY', !balHaveEnough100),
          newButton('cancel', `Back`, 'DANGER')
        );

        // Withdraw Row
        const withRow = new MessageActionRow().addComponents(
          newButton('withdraw10', `10 Credits`, 'PRIMARY', !bankHaveEnough10),
          newButton('withdraw50', `50 Credits`, 'PRIMARY', !bankHaveEnough50),
          newButton('withdraw100', `100 Credits`, 'PRIMARY', !bankHaveEnough100),
          newButton('cancel', `Back`, 'DANGER')
        );

        switch (BtnPressed.customId) {
        // Main Menu Row
          case 'deposit': {
            depEmbed = createDepEmbed(credits.balance, credits.bank)
            await BtnPressed.update({
              embeds: [depEmbed],
              components: [depRow]
            })
            break;
          }
          case 'withdraw': {
            withEmbed = createWithEmbed(credits.balance, credits.bank)
            await BtnPressed.update({
              embeds: [withEmbed],
              components: [withRow]
            })
            break;
          }
          case 'banker': {
            if (BtnPressed.user.id === '270600189859856385') {
              mainMenu = createEmbed(credits.balance, credits.bank)
              await BtnPressed.update({
              embeds: [mainMenu],
              components: [bankerRow]})
            break;
            } else {
              mainMenu = createEmbed(credits.balance, credits.bank, 'RED', 'You are not allowed to access the Banker Controls!')
              await BtnPressed.update({
              embeds: [mainMenu],
              components: [menu]})
            break;
            }
            
            break;
          }
          case 'cancel': {
            mainMenu = createEmbed(credits.balance, credits.bank)
            await BtnPressed.update({
              embeds: [mainMenu],
              components: [menu]
            })
            break;
          }
    
        // Deposit Row
          case 'deposit10': {
            if (credits.balance >= 10) {

              // If possible, make changes
              credits.balance = credits.balance - 10;
              credits.bank = credits.bank + 10;

              // Create Embed
              depEmbed = createDepEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              depEmbed = createDepEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits to deposit!');
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })
              break;
            }
          }
          case 'deposit50': {
            if (credits.balance >= 50) {

              // If possible, make changes
              credits.balance = credits.balance - 50;
              credits.bank = credits.bank + 50;

              // Create Embed
              depEmbed = createDepEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              depEmbed = createDepEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits to deposit!');
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })
              break;
            }
          }
          case 'deposit100': {
            if (credits.balance >= 100) {

              // If possible, make changes
              credits.balance = credits.balance - 100;
              credits.bank = credits.bank + 100;

              // Create Embed
              depEmbed = createDepEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              depEmbed = createDepEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits to deposit!');
              await BtnPressed.update({
                embeds: [depEmbed],
                components: [depRow]
              })
              break;
            }
          }
          
        // Withdraw Row
          case 'withdraw10': {
            if (credits.bank >= 10) {

              // If possible, make changes
              credits.bank = credits.bank - 10;
              credits.balance = credits.balance + 10;

              // Create Embed
              withEmbed = createWithEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              withEmbed = createWithEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits in your bank to withdraw!');
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })
              break;
            }
          }
          case 'withdraw50': {
            if (credits.bank >= 50) {

              // If possible, make changes
              credits.bank = credits.bank - 50;
              credits.balance = credits.balance + 50;

              // Create Embed
              withEmbed = createWithEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              withEmbed = createWithEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits in your bank to withdraw!');
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })
              break;
            }
          }
          case 'withdraw100': {
            if (credits.bank >= 100) {

              // If possible, make changes
              credits.bank = credits.bank - 100;
              credits.balance = credits.balance + 100;

              // Create Embed
              withEmbed = createWithEmbed(credits.balance, credits.bank);
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })

              // Save The Data
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${interaction.user?.id}`, `${savedData}`);
              break;
            } else {

              // Otherwise
              withEmbed = createWithEmbed(credits.balance, credits.bank, "RED", 'You do not have enough credits in your bank to withdraw!');
              await BtnPressed.update({
                embeds: [withEmbed],
                components: [withRow]
              })
              break;
            }
          }
        
        // Banker Row
          case 'add10': {
            credits.balance = credits.balance + 10;
            mainMenu = createEmbed(credits.balance, credits.bank);
            credits.balance + 10;
            BtnPressed.update({
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
            BtnPressed.update({
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
            BtnPressed.update({
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
            BtnPressed.update({
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