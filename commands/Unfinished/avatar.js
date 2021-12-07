"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    // Information about the command.
    category: 'Misc',
    description: 'Command that displays the user\s avatar.',
    slash: true,
    testOnly: true,
    // minArgs: 1,
    // expectedArgs: '<user>',
    // Function that runs whenever the command is ran
    callback: ({ interaction, text }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${interaction.user.username}\'s Avatar`)
            .setImage(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
            .setColor('#34c9eb');
        return embed;
        // const user = text.substr(3, 18);
        // const userId = interaction.guild?.members.fetch(`${user}`)
        // console.log(userId);
    },
};
