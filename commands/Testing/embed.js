"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    // Information about the command.
    category: 'Testing',
    description: 'Command that shows an embed example.',
    slash: true,
    testOnly: true,
    // Function that runs whenever the command is ran
    callback: ({ interaction, text }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setDescription("Description")
            .setTitle('Title')
            .setColor("RED") // Or Hex Code
            .setAuthor("The Author")
            .setFooter("Footer")
            //.setThumbnail("https://logos-marcas.com/wp-content/uploads/2020/12/Discord-Logo.png")
            .addFields([
            {
                name: 'Line 1',
                value: 'Text',
                inline: true
            },
            {
                name: 'Line 2',
                value: 'Text',
                inline: true
            }
        ])
            .addField('Line 3', 'Text')
            .setTimestamp();
        return embed;
    },
};
