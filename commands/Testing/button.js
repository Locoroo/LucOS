"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Testing',
    description: 'Testing',
    slash: true,
    testOnly: true,
    callback: ({ interaction: msgInt, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the Buttons
        const row = new discord_js_1.MessageActionRow() // First Row
            // Button 1
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('ban_yes')
            .setLabel('Confirm')
            .setStyle('SUCCESS'))
            // Button 2
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('ban_no')
            .setLabel('Cancel')
            .setStyle('DANGER'));
        const linkRow = new discord_js_1.MessageActionRow() // Second Row
            // Button 1
            .addComponents(new discord_js_1.MessageButton()
            .setURL('https://theuselessweb.com/')
            .setLabel('Link Button')
            .setStyle('LINK'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('disabled')
            .setDisabled(true)
            .setLabel('**Chuckles** I\'m Disabled...')
            .setStyle('SECONDARY'));
        const anotherRow = new discord_js_1.MessageActionRow() // Second Row
            // Button 1
            .addComponents(new discord_js_1.MessageButton()
            .setLabel('Useless')
            .setStyle('PRIMARY')
            .setCustomId('useless'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('disabled2')
            .setDisabled(true)
            .setLabel('I\'m also Disabled..')
            .setStyle('PRIMARY'));
        // Respond to the command
        yield msgInt.reply({
            content: 'Are you sure you want to do this?',
            components: [row, linkRow, anotherRow],
            // ephemeral: true,
        });
        // Filter who pressed the button
        // const filter = (btnInt: MessageComponentInteraction) => {
        //   return msgInt.user.id === btnInt.user.id
        // }
        // Define the collector
        const collector = channel.createMessageComponentCollector({
            //filter,
            max: 1,
        });
        // When an interaction is collected, run this:
        collector.on('collect', (i) => {
            // i.reply({
            //   content: 'You clicked a button',
            //   ephemeral: true,
            // })
        });
        // When the collector ends, run this:
        collector.on('end', (collection) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            collection.forEach((click) => {
                console.log(`${click.user.tag} pressed \"${click.customId}\"`);
            });
            // Decide what to do on each button
            switch ((_a = collection.first()) === null || _a === void 0 ? void 0 : _a.customId) {
                case 'ban_yes': {
                    yield msgInt.editReply({
                        content: 'Ok',
                        components: []
                    });
                    break;
                }
                case 'ban_no': {
                    yield msgInt.editReply({
                        content: 'Nvm',
                        components: []
                    });
                    break;
                }
            }
        }));
    }),
};
