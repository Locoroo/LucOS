import {  } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Testing',
    description: 'Shows All Keys In Database',

    maxArgs: 1,
    expectedArgs: '[id]',

    slash: true,
    testOnly: true,
    ownerOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client, text }) => {

      if (!text) {
        console.log(await db.list());
        interaction.reply({
          content:'Printed to the console.',
          ephemeral: true,
        })
      } else {
        db.delete(text)
        interaction.reply({
          content: `${text} was deleted from the Database.`,
          ephemeral: true,
        })
      }
      
      // Define Object
      // const myData = {
      //   name: 'TestName',
      //   id: 'TestID'
      // }

      // Save the Object Changes
      // const stringifiedData = JSON.stringify(myData);
      // const test = await db.set("Test", `${stringifiedData}`);

      // Load Object from DB
      // const getIt = await db.get("Test");
      // const parsedData = JSON.parse(getIt);

    },

} as ICommand