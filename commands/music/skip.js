const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s","تخطي","ت"],
        description: "⏩・يتخطى الأغنية الحالية.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج .....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")

        if (queue.songs.length === 0 && queue.autoplay === false) {
                msg.edit({ content: `❎・لا توجداغاني في قائمة الانتظار` });
        } else {
           
          //  client.distube.skip(message)
          const song = await queue.skip() .then(song => {
                    msg.edit({ content: `⏩・تم تخطي الاغنية ` });
                });
        }
    }
}