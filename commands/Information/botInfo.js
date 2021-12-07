"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    // Information about the command.
    category: 'Information',
    description: 'Displays information about the bot.',
    slash: true,
    // Function that runs whenever the command is ran
    callback: ({ interaction, client }) => {
        var _a, _b, _c, _d, _e, _f;
        const isBot = (_a = client.user) === null || _a === void 0 ? void 0 : _a.bot;
        let x;
        switch (isBot) {
            case true: {
                x = 'Yes, I am';
                break;
            }
            case false: {
                x = 'No, I\'m not.';
                break;
            }
        }
        function timeInSeconds(ms) {
            return ms / 1000;
        }
        function timeInMinutes(s) {
            return s / 60000;
        }
        function timeInHours(m) {
            return m / 3.6e+6;
        }
        let uptime = `${Math.floor(timeInSeconds(client.uptime))} Second(s)`;
        if (parseInt(uptime) >= 60) {
            uptime = `${Math.floor(timeInMinutes(client.uptime))} Minute(s)`;
        }
        if (parseInt(uptime) >= 60)
            [
                uptime = `${Math.floor(timeInHours(client.uptime))} Hour(s)`
            ];
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('Bot Information:')
            .setThumbnail(`${(_b = client.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL()}`)
            .setColor('#34c9eb')
            .addFields([
            {
                name: 'Username:',
                value: `${(_c = client.user) === null || _c === void 0 ? void 0 : _c.username}`,
                inline: true
            },
            {
                name: 'Discriminator:',
                value: `${(_d = client.user) === null || _d === void 0 ? void 0 : _d.discriminator}`,
                inline: true
            },
            {
                name: 'Am I a Bot?',
                value: `${x}`,
                inline: true
            },
            {
                name: 'Created at:',
                value: `${(_e = client.user) === null || _e === void 0 ? void 0 : _e.createdAt}`
            },
            {
                name: 'ID:',
                value: `${(_f = client.user) === null || _f === void 0 ? void 0 : _f.id}`,
                inline: true
            },
            {
                name: 'Uptime:',
                value: `Been running for ${uptime}.`,
                inline: true
            }
        ])
            .setFooter('Created by: Locoroo#1984');
        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};
