"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setStatus = (client, status) => {
    var _a;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
        status: 'dnd',
        activities: [
            {
                name: status,
            },
        ],
    });
};
exports.default = {
    // Information about the command.
    category: 'Configuration',
    description: 'Update the bot\'s status.',
    minArgs: 1,
    expectedArgs: '<status>',
    ownerOnly: true,
    hidden: true,
    slash: true,
    testOnly: true,
    init: (client) => {
        // TODO: Load the status from the database
        const status = "The Testing Game"; // Would come from the database
        setStatus(client, status);
    },
    // Function that runs whenever the command is ran
    callback: ({ client, text, interaction }) => {
        setStatus(client, text);
        interaction.reply({
            content: 'Status set!',
            ephemeral: true
        });
    },
};
