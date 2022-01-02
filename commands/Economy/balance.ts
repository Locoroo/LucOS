import { MessageEmbed, MessageComponentInteraction, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Economy',
    description: 'Shows your account balance status.',

    slash: true,
    guildOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, guild, client, channel }) => {

      // Get Server Info from Database
      let data1 = await db.get(`Guild_${interaction.guild?.id}`);
        
      let server;
      
      if (data1 === null) {
          server = {
              flip: {
                  heads: 0,
                  tails: 0
              },
              lastBalMsgID: '<msgID>'
          }
      } else {
          server = JSON.parse(data1);
      }

      // Delete previous interaction
      try {
        interaction.channel?.messages.fetch(server.lastBalMsgID).then(int => int.delete())
      } catch (error) {}
       
      let currencyIcon = `<:Credits:918484129153187881>`

      // Get User Info from Database
      let data2 = await db.get(`User_${interaction.user?.id}`);
  
      let acc;

      if (data2 === null) {
          acc = {
              name: interaction.user.username,
              id: interaction.user?.id,
              balance: 500,
              bank: 0,
              dailyCheck: Date.now()          
          }
      } else {
          acc = JSON.parse(data2);
      }

      let credits = {
        name: acc.name,
        id: acc.id,
        balance: acc.balance,
        bank: acc.bank,
        daily: acc.dailyCheck
      }

      // Daily Claim
      let check = credits.daily;
      const timeout = 5000// 86400000;
      let canClaim: boolean;
      let timeLeft: any;
      if (timeout - (Date.now() - check) > 0) { 
        canClaim = false 
        const ms = require('pretty-ms');
        timeLeft = ms(timeout - (Date.now() - check));
      } else { canClaim = false } // < CHANGE THIS BACK TO TRUE TO BE ABLE TO ENABLE THE BUTTON (TEMPORARY DISABLE TO NO ONE CAN EXPLOIT INFINITE CURRENCY)

      console.log(credits);
      console.log(`Time Left: ${timeLeft} , Can Claim? ${canClaim}, Check: ${check}`)


      // Function to make Buttons quicker
      function newButton(id: string, label: string, style: any, disabled = false) {
        return new MessageButton().setCustomId(id).setLabel(label).setStyle(style).setDisabled(disabled);
      }

      // Check if they can Deposit Withdraw
      let canDeposit = credits.balance > 0
      let canWithdraw = credits.bank > 0

      // Button Rows
        // Main Menu Row
        const defaultMenu = new MessageActionRow().addComponents(
          newButton('deposit', 'Deposit', 'SECONDARY', !canDeposit),
          newButton('withdraw', 'Withdraw', 'SECONDARY', !canWithdraw),
          newButton('daily', 'Claim Daily', 'SUCCESS', !canClaim)
        );

      let mainMenu;
      let depEmbed;
      let withEmbed;

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

      // Send the reply and store ID
      mainMenu = createEmbed(credits.balance, credits.bank)
      const msg = await interaction.reply({ components: [defaultMenu], embeds: [mainMenu], fetchReply: true })

      // Save the Server Data
      server.lastBalMsgID = msg.id
      const savedData2 = JSON.stringify(server);
      await db.set(`Guild_${interaction.guild?.id}`, `${savedData2}`);

      // Save the User Data
      const savedData1 = JSON.stringify(credits);
      await db.set(`User_${credits.id}`, `${savedData1}`);

      // Filter who pressed the button
      const filter = (btnInt: MessageComponentInteraction) => {
        return interaction.user.id === btnInt.user.id //|| btnInt.user.id === '270600189859856385'
      }

      // Define the collector
      const collector = channel.createMessageComponentCollector({
        filter,
        time: 1000 * 120
      })

      // On collect, run:
      collector.on('collect', async (BtnPressed: MessageComponentInteraction) => {
        try {

        // Check if reward can be claimed
        if (timeout - (Date.now() - check) > 0) { 
          canClaim = false 
          const ms = require('pretty-ms');
          timeLeft = ms(timeout - (Date.now() - check));
        } else { canClaim = true }
      
        // Check if they can Deposit, Withdraw or Claim
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
          newButton('daily', 'Claim Daily', 'SUCCESS', !canClaim)
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
          case 'daily': {
            credits.balance = credits.balance + 100;
            mainMenu = createEmbed(credits.balance, credits.bank, "GREEN", 'Claimed your Daily Reward! Check back in 24H.');
            await BtnPressed.update({
              embeds: [mainMenu],
              components: [menu]
            })
            credits.daily = Date.now()
            const savedData = JSON.stringify(credits);
            await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
              await db.set(`User_${credits.id}`, `${savedData}`);
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
        }

      } catch (error) {}
      })
    },

} as ICommand