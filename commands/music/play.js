const { PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        aliases: ["ش", "p","تشغيل"],
        description: "🎶・يقوم بتشغيل أغنية من المصدر.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
     //   message.channel.send(`**Searching.....** \`${args.join(" ")}\``).then(msg => {
     //       setTimeout(() => msg.delete(), 5000)
     //   })
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("يجب أن تكون في قناة صوتية.")
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Connect)) return message.channel.send(`ليس لدي صلحية \`CONNECT\` في ${channel.name} للانضمام إلى الصوت!`);
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Speak)) return message.channel.send(`ليس لدي صلحية \`SPEAK\` في ${channel.name} للانضمام إلى الصوت`);

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("يرجى تقديم اسم الأغنية أو الرابط.");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
