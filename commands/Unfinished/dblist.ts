import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Testing',
    description: 'Shows All Keys In Database',

    slash: true,
    testOnly: true,
    ownerOnly: true,
    hidden: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client }) => {

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

      console.log(await db.list());
      interaction.reply({
        content:'Printed to the console.',
        ephemeral: true,
      })

    },

} as ICommand