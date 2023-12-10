const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["مساعدة", "halp", "هيلب"],
        usage: "(command)",
        category: "utilities",
        description: "❓・ لرؤية قائمة المساعدة الخاصة بي ",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor('#000001')
            .setAuthor({ name: `${message.guild.members.me.displayName} قائمة مساعدتي `, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`**البادئة الخاصة بي**: \`${client.prefix}\`\n المطور : [Mp,Temperamental ོ ☭](https://discordapp.com/users/222859144896577536)`)
            embed.setFooter({ text: `${message.guild.members.me.displayName}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addFields({ name: `${capitalise}:`, value: dir.map(c => `\`${c.config.name}\` : ${c.config.description}`).join(", \n"), inline: true })
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("أمر خاطئ.").setDescription(`استعمل \`${client.prefix}help\` لقائمة الأوامر.`)] })
            command = command.config

            embed.setDescription(stripIndents`البادئة الخاصة بي : \`${client.prefix}\`\n
            **الامر:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **الوصف:** ${command.description || "لم يتم تقديم وصف."}
            **استعمل:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "لا يوجد مثال"}
            **يمكن الوصول إليها عن طريق:** ${command.accessableby || "Members"}
            **الاختصارات:** ${command.aliases ? command.aliases.join(", ") : "لا أحد."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}