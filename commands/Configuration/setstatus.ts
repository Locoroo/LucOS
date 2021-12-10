import { Client } from 'discord.js'
import { ICommand } from 'wokcommands'
const Database = require("@replit/database")
const db = new Database()

const setStatus = (client: Client, status: string) => {
  client.user?.setPresence({
    status: 'dnd',
    activities: [
      {
        name: status,
      },
    ],
  })
}

export default {
  
  category: 'Configuration',
  description: 'Updates the status for the bot',

  minArgs: 1,
  expectedArgs: '<status>',
  
  ownerOnly: true,
  hidden: true,

  slash: true,

  init: async (client: Client) => {
    const status = await db.get("BotStatus")
    setStatus(client, `on ${client.guilds?.cache.size} servers.`);
  },
  
  callback: async ({ client, text, interaction }) => {
    
    if (text === 'servers') {
      setStatus(client, `on ${client.guilds?.cache.size} servers.`);
    } else {
    setStatus(client, text)
    }

    interaction.reply({
      content: 'Status set!',
      ephemeral: true,
    })
  },
} as ICommand
