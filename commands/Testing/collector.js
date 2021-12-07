"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Reaction/Message collector testing',
    callback: ({ message, channel }) => {
        // Message 
        // message.reply('Enter your username:')
        // const filter = (m: Message) => {
        //     return m.author.id === message.author.id
        // }
        // const collector = channel.createMessageCollector({
        //     filter,
        //     max: 1,
        //     time: 1000 * 5
        // })
        // collector.on('collect', message => {
        //     console.log(message.content)
        // })
        // Reaction
        message.reply('Please confirm this action');
        message.react('👍');
        message.react('👎');
        const filter = (reaction, user) => {
            return user.id === message.author.id;
        };
        const collector = message.createReactionCollector({
            filter,
            max: 2,
            time: 1000 * 5
        });
        collector.on('collect', (reaction) => {
            // console.log(reaction.emoji)
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('You did not react in time.');
                return;
            }
            let text = 'Collected:\n\n';
            collected.forEach((message) => {
                text += `${message.emoji.name}\n`;
            });
            message.reply(text);
        });
    }
};
