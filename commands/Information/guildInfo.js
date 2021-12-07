"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    // Information about the command.
    category: 'Information',
    description: 'Displays information about the server.',
    slash: true,
    // Function that runs whenever the command is ran
    callback: ({ interaction, guild }) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let verifiedIcon = '';
        let partnerIcon = '';
        if ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.verified) {
            verifiedIcon = '<:Verified:917510692544868382> Verified';
        }
        if ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.partnered) {
            partnerIcon = '<:Partner:917515232115560508> Partnered';
        }
        if (((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.partnered) === false && interaction.guild.verified === false) {
            verifiedIcon = 'This server has no badges.';
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#34c9eb')
            .setTitle('Server Information:')
            .setThumbnail(`${(_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.iconURL()}`)
            .addFields([
            {
                name: 'Name:',
                value: `${(_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.name}`,
                inline: true
            },
            {
                name: 'Owner:',
                value: `<@!${(_f = interaction.guild) === null || _f === void 0 ? void 0 : _f.ownerId}>`,
                inline: true
            },
            {
                name: 'Server ID:',
                value: `${(_g = interaction.guild) === null || _g === void 0 ? void 0 : _g.id}`,
                inline: true
            },
            {
                name: 'Created at:',
                value: `${(_h = interaction.guild) === null || _h === void 0 ? void 0 : _h.createdAt}`
            },
            {
                name: 'Members:',
                value: `${(_j = interaction.guild) === null || _j === void 0 ? void 0 : _j.memberCount}`,
                inline: true
            },
            {
                name: 'Badges:',
                value: `${verifiedIcon} ${partnerIcon}`,
                inline: true
            },
        ]);
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
};
