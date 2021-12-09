import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const Database = require("@replit/database")
const db = new Database()

export default {
    // Information about the command.
    category: 'Testing',
    description: 'Command that replies with Pong!',

    slash: true,
    testOnly: true,

    // Function that runs whenever the command is ran
    callback: async ({ interaction, client }) => {

      // const myData = {
      //   name: 'TestName',
      //   id: 'TestID'
      // }

      // const stringifiedData = JSON.stringify(myData);
        
      // const test = await db.set("Test", `${stringifiedData}`);

      // console.log(test);

      // const getIt = await db.get("Test");

      // const parsedData = JSON.parse(getIt);

      // console.log(parsedData);

      // console.log(parsedData.name);



    },

} as ICommand