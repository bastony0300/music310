module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap","تلقائي"],
        description: "🔄・يبدل التشغيل التلقائي للنقابة الحالية.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج.....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit({ content: `يجب أن تكون في نفس / قناة صوتية.`})

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
            msg.edit({ content:`🔄・التشغيل التلقائي \`مفعل\`` });
        } else {
            client.distube.toggleAutoplay(message);
            msg.edit({ content:`🔄・التشغيل التلقائي \`معطل\`` });
        }
    }
}
