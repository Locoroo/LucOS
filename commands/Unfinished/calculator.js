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
    category: 'Misc',
    description: 'Basic useful Calculator',
    slash: true,
    testOnly: true,
    callback: ({ interaction: msgInt, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        // Function to make Buttons quicker
        function newButton(id, label, style, disabled = false) {
            return new discord_js_1.MessageButton().setCustomId(id).setLabel(label).setStyle(style).setDisabled(disabled);
        }
        // Operator Buttons Default States
        const disabledEqual = true;
        const disabledDivide = true;
        const disabledMultiply = true;
        const disabledSubtract = false;
        const disabledAdd = true;
        // Rows of Buttons
        const row1 = new discord_js_1.MessageActionRow().addComponents(newButton('1', '1', 'SECONDARY'), newButton('2', '2', 'SECONDARY'), newButton('3', '3', 'SECONDARY'), newButton('divide', '÷', 'PRIMARY', disabledDivide));
        const row2 = new discord_js_1.MessageActionRow().addComponents(newButton('4', '4', 'SECONDARY'), newButton('5', '5', 'SECONDARY'), newButton('6', '6', 'SECONDARY'), newButton('multiply', 'x', 'PRIMARY', disabledMultiply));
        const row3 = new discord_js_1.MessageActionRow().addComponents(newButton('7', '7', 'SECONDARY'), newButton('8', '8', 'SECONDARY'), newButton('9', '9', 'SECONDARY'), newButton('subtract', '-', 'PRIMARY', disabledSubtract));
        const row4 = new discord_js_1.MessageActionRow().addComponents(newButton('dot', '.', 'SECONDARY'), newButton('0', '0', 'SECONDARY'), newButton('equal', '=', 'SUCCESS', disabledEqual), newButton('add', '+', 'PRIMARY', disabledAdd));
        // Function to make embeds quicker
        function newEmbed(color, numbers = '-', result = '0') {
            return new discord_js_1.MessageEmbed().setColor(color).setTitle('▰▰▰▰▰ Calculator ▰▰▰▰▰').addField(result, numbers);
        }
        const defaultState = newEmbed('#34c9eb');
        // Send the default state of the calculator
        msgInt.reply({
            embeds: [defaultState],
            components: [row1, row2, row3, row4]
        });
        // Define the filter
        const filter = (btnInt) => {
            return msgInt.user.id === btnInt.user.id;
        };
        // Filters out anyone who isn't the user who called the command
        const collector = channel.createMessageComponentCollector({
            filter,
        });
        // Function that returns what button was pressed.
        function btnPressed(x) {
            switch (x) {
                case '1': {
                    return 1;
                }
                case '2': {
                    return 2;
                }
                case '3': {
                    return 3;
                }
                case '4': {
                    return 4;
                }
                case '5': {
                    return 5;
                }
                case '6': {
                    return 6;
                }
                case '7': {
                    return 7;
                }
                case '8': {
                    return 8;
                }
                case '9': {
                    return 9;
                }
                case '0': {
                    return 0;
                }
                case 'divide': {
                    return "/";
                }
                case 'multiply': {
                    return "*";
                }
                case 'add': {
                    return "+";
                }
                case 'subtract': {
                    return "-";
                }
                case 'dot': {
                    return ".";
                }
            }
        }
        // When a button is pressed, do this:
        collector.on('collect', (i) => __awaiter(void 0, void 0, void 0, function* () {
            const firstNum = btnPressed(i.customId);
            const firstState = newEmbed('#34c9eb', `${firstNum}`);
            yield i.update({
                embeds: [firstState],
                components: [row1, row2, row3, row4]
            });
        }));
        // When the collector stops, do this.
        collector.on('end', (collection) => __awaiter(void 0, void 0, void 0, function* () {
            // Nothing here yet
        }));
    })
};
