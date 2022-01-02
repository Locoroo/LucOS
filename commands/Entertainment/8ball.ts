import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    // Command Config
    category: 'Entertainment',
    description: 'Ask the 8ball a question to find answers.',

    testOnly: true,
    slash: true,
    
    expectedArgs: '<question>',
    minArgs: 1,

    cooldown: '2s',

    // Command Actions
    callback: ({ interaction, args }) => {

        // Questions and Answers
        let question = args.join(' ')
        let answer = ["Don't count on it", "Yes", "Very doubtful", "Without a doubt", "No", "Of course", "Probably not", "Most likely", "My sources say no", "It is certain", "I don't think so", "Definitely"]

        // Images
        let image = ['DONT_COUNT_ON_IT', 'YES', 'VERY_DOUBTFUL', 'WITHOUT_A_DOUBT', 'NO', 'OF_COURSE', 'PROBABLY_NOT', 'MOST_LIKELY', 'MY_SOURCES_SAY_NO', 'IT_IS_CERTAIN', 'I_DONT_THINK_SO', 'DEFINITELY']

        // Random Number Generator
        const max = 12;
        const rng = Math.floor(Math.random() * max + 1);

        const embed = new MessageEmbed()
            .setTitle("**Magic 8 Ball**")
            .addField("**Question:**", question)
            .addField("**Answer:**", answer[rng])
            .setColor("PURPLE")
            .setThumbnail(`attachment://${image[rng]}.png`)
            .setFooter('Ask me anything...')
            .setTimestamp()
        
        interaction.reply({
            embeds: [embed],
            files: [`./images/answers/${image[rng]}.png`]
        })

    },

} as ICommand