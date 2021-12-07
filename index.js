"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Intents tells Discord what information it needs to use.
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
// Specify what to do when the bot is ready.
client.on('ready', () => {
    console.log(`The Bot is ready. `);
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, 'commands'),
        typeScript: true,
        // Test Servers ID
        testServers: ['498938933707800600', '809912783620931625', '885516509357686795', '568905801817653273'],
        // [0] LucOS HQ Server
        // [1] Furiends Server
        // [2] The Birds Server
        // [3] don't know Server
        // Mongoose Database
        // mongoUri: process.env.MONGO_URI,
        // dbOptions: {
        //     keepAlive: true
        // },
        // Bot Owner ID
        botOwners: ['270600189859856385'],
        // Disabled Default Commands
        disabledDefaultCommands: [
            'languaje',
            'prefix',
            'requiredrole',
            'channelonly',
            'command'
        ]
    })
        .setDefaultPrefix('-')
        .setCategorySettings([
        {
            name: 'Testing',
            emoji: '🔧',
            hidden: true
        },
        {
            name: 'Information',
            emoji: '📋'
        },
        {
            name: 'Configuration',
            emoji: '⚙️',
            hidden: true
        },
        {
            name: 'Administrator',
            emoji: '👑',
            hidden: true
        },
    ]);
});
// Whenever an interaction occurs, run this:
client.on('interactionCreate', interaction => {
    var _a;
    console.log(`[SlashCMD] ${Date()} | ${interaction.user.tag} used an interaction at "${(_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.name}" in ChID: ${interaction.channelId}`);
});
// Log in.
client.login(process.env.TOKEN);
