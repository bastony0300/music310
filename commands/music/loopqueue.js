
module.exports = {
    config: {
        name: "loopqueue",
        aliases: ["lq", "كرر"],
        description: "🔁・حلقة الأغنية في قائمة الانتظار.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج.....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")

        if (queue.repeatMode === 2) {
                client.distube.setRepeatMode(message, 0);
                msg.edit({ content: `🔁・تكرار القائمة \`معطل\`` });
            } else {
                client.distube.setRepeatMode(message, 2);
                msg.edit({ content: `🔁・تكرار القائمة \`معطل\`` });
            }
    }
}
