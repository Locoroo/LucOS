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
exports.default = {
    // Information about the command.
    category: 'Administrator',
    description: 'Command that clears out multiple messages in a channel.',
    permissions: ['MANAGE_CHANNELS'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
    slash: true,
    // Function that runs whenever the command is ran
    callback: ({ interaction, channel, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const amount = parseInt(args.shift());
        // const amount = args.length ? parseInt(args.shift()!) : 1
        const { size } = yield channel.bulkDelete(amount, true);
        interaction.reply({
            content: `Deleted ${amount} message(s).`
        });
        console.log(`[SlashCMD] ${Date()} | ${interaction.user.tag} cleared ${amount} message(s) at "${(_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.name}" in ChID: ${interaction.channelId}`);
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }),
};
