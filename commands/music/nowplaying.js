const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "الان"],
        description: "❓・يعرض الأغنية الحالية قيد التشغيل.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('يعالج.....');

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new EmbedBuilder()
            .setAuthor({ name: queue.songs[0].playing ? 'توقف الأغنية ...' : 'الان العب...'})
            .setColor('#000001')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addFields({ name: 'رافع:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
            .addFields({ name: 'مقدم الطلب:', value: `${queue.songs[0].user}`, inline: true })
            .addFields({ name: 'الصوت:', value: `${queue.volume}%`, inline: true })
            .addFields({ name: 'المشاهدات', value: `${queue.songs[0].views}`, inline: true })
            .addFields({ name: 'الاعجابات:', value: `${queue.songs[0].likes}`, inline: true })
            .addFields({ name: `المدة الحالية: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``, inline: false })
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
