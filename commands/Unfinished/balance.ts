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
              name: interaction.user.username,
              id: interaction.user?.id,
              balance: 500,
              bank: 0
          }
      } else {
          acc = JSON.parse(data);
      }

      let credits = {
        name: acc.name,
        id: acc.id,
        balance: acc.balance,
        bank: acc.bank
      }

      console.log(credits);

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
          newButton('take100', `-100`, 'PRIMARY'),
          newButton('take10', `-10`, 'PRIMARY'),
          newButton('cancel2', `Back`, 'DANGER')
        );

      let mainMenu;
      let depEmbed;
      let withEmbed;
      let bankerEmbed

      // Embeds
      function createEmbed(bal: number, bank: number, color: any = "GOLD", footer = 'Select an option if you would like to manage your balance.') { 
        return new MessageEmbed()
        .setTitle(`${credits.name}'s Account Balance:`)
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
        .setThumbnail('https://i.imgur.com/iLBllNb.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }
      function createDepEmbed(bal: number, bank: number, color: any = "GOLD", footer = 'Select the amount you would like to deposit.') {
        return new MessageEmbed()
        .setTitle(`${credits.name}'s Account Balance:`)
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
        .setThumbnail('https://i.imgur.com/SrIYFfq.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }
      function createBankerEmbed(bal: number, color: any = "ORANGE", footer = 'Select how much you want to take or add.') {
        return new MessageEmbed()
        .setTitle(`${credits.name}'s Account Balance:`)
        .setDescription('Banker Mode: _Only the Bot Owner can access this._')
        .addFields([
          {
            name: 'Balance:',
            value: `${currencyIcon} ${bal}`,
            inline: true
          },
          {
            name: 'Banker:',
            value: `Locoroo`!,
            inline: true
          }
        ])
        .setColor(color)
        .setThumbnail('https://i.imgur.com/hBhTWpL.png')
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
        .setThumbnail('https://i.imgur.com/SrIYFfq.png')
        .setFooter(footer)
        .setTimestamp(Date.now())
      }

      mainMenu = createEmbed(credits.balance, credits.bank)
      const msg = await interaction.reply({ components: [defaultMenu], embeds: [mainMenu], fetchReply: true })
      console.log(msg.id)

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

        // console.log(credits);

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
              bankerEmbed = createBankerEmbed(credits.balance)
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            } else {
              mainMenu = createEmbed(credits.balance, credits.bank, 'RED', 'You are not allowed to access the Banker Controls!')
              await BtnPressed.update({
              embeds: [mainMenu],
              components: [menu]})
            break;
            }
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
              await db.set(`Credits_${credits.id}`, `${savedData}`);
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
            if (BtnPressed.user.id === '270600189859856385') {
              credits.balance = credits.balance + 10;
              bankerEmbed = createBankerEmbed(credits.balance);
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${credits.id}`, `${savedData}`);
            break;
            } else {
              bankerEmbed = createBankerEmbed(credits.balance, 'RED', 'Only the Bot Owner can press these buttons. Stop trying...')
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            }
          }
          case 'add100': {
            if (BtnPressed.user.id === '270600189859856385') {
              credits.balance = credits.balance + 100;
              bankerEmbed = createBankerEmbed(credits.balance);
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${credits.id}`, `${savedData}`);
            break;
            } else {
              bankerEmbed = createBankerEmbed(credits.balance, 'RED', 'Only the Bot Owner can press these buttons. Stop trying...')
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            }
          }
          case 'take10': {
            if (BtnPressed.user.id === '270600189859856385') {
              credits.balance = credits.balance - 10;
              bankerEmbed = createBankerEmbed(credits.balance);
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${credits.id}`, `${savedData}`);
            break;
            } else {
              bankerEmbed = createBankerEmbed(credits.balance, 'RED', 'Only the Bot Owner can press these buttons. Stop trying...')
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            }
          }
          case 'take100': {
            if (BtnPressed.user.id === '270600189859856385') {
              credits.balance = credits.balance - 100;
              bankerEmbed = createBankerEmbed(credits.balance);
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
              const savedData = JSON.stringify(credits);
              await db.set(`Credits_${credits.id}`, `${savedData}`);
            break;
            } else {
              bankerEmbed = createBankerEmbed(credits.balance, 'RED', 'Only the Bot Owner can press these buttons. Stop trying...')
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            }
          }
          case 'cancel2': {
            if (BtnPressed.user.id === '270600189859856385') {
              mainMenu = createEmbed(credits.balance, credits.bank)
              await BtnPressed.update({
              embeds: [mainMenu],
              components: [menu]
            })
            break;
            } else {
              bankerEmbed = createBankerEmbed(credits.balance, 'RED', 'Only the Bot Owner can press these buttons. Don\'t do that...')
              await BtnPressed.update({
              embeds: [bankerEmbed],
              components: [bankerRow]})
            break;
            }
          }
        }
      })
    },

} as ICommand