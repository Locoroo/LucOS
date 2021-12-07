import { MessageComponentInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
  category: 'Testing',
  description: 'Testing',

  slash: true,
  testOnly: true,

  callback: async ({ interaction: msgInt, channel }) => {

    // Create the Buttons
    const row = new MessageActionRow() // First Row

      // Button 1
      .addComponents(
        new MessageButton()
          .setCustomId('ban_yes')
          .setLabel('Confirm')
          .setStyle('SUCCESS')
      )

      // Button 2
      .addComponents(
        new MessageButton()
          .setCustomId('ban_no')
          .setLabel('Cancel')
          .setStyle('DANGER')
      )

    const linkRow = new MessageActionRow() // Second Row
    
      // Button 1
      .addComponents(
        new MessageButton()
          .setURL('https://theuselessweb.com/')
          .setLabel('Link Button')
          .setStyle('LINK')
      )
      .addComponents(
        new MessageButton()
          .setCustomId('disabled')
          .setDisabled(true)
          .setLabel('**Chuckles** I\'m Disabled...')
          .setStyle('SECONDARY')
      )

      const anotherRow = new MessageActionRow() // Second Row
    
      // Button 1
      .addComponents(
        new MessageButton()
          .setLabel('Useless')
          .setStyle('PRIMARY')
          .setCustomId('useless')
      )
      .addComponents(
        new MessageButton()
          .setCustomId('disabled2')
          .setDisabled(true)
          .setLabel('I\'m also Disabled..')
          .setStyle('PRIMARY')
      )

    // Respond to the command
    await msgInt.reply({
      content: 'Are you sure you want to do this?',
      components: [row, linkRow, anotherRow],
      // ephemeral: true,
    })

    // Filter who pressed the button
    // const filter = (btnInt: MessageComponentInteraction) => {
    //   return msgInt.user.id === btnInt.user.id
    // }

    // Define the collector
    const collector = channel.createMessageComponentCollector({
      //filter,
      max: 1,
    })

    // When an interaction is collected, run this:
    collector.on('collect', (i: MessageComponentInteraction) => {
      // i.reply({
      //   content: 'You clicked a button',
      //   ephemeral: true,
      // })
    })

    // When the collector ends, run this:
    collector.on('end', async (collection) => {
      collection.forEach((click) => {
        console.log(`${click.user.tag} pressed \"${click.customId}\"`)
      })

      // Decide what to do on each button

      switch (collection.first()?.customId) {

        case 'ban_yes': {

            await msgInt.editReply({
              content: 'Ok',
              components: []
            })
          
          break;
        }
        case 'ban_no': {

          await msgInt.editReply({
            content: 'Nvm',
            components: []
          })

          break;
        }
      }


    })
  },
} as ICommand
