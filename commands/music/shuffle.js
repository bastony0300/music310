
module.exports = { 
    config: {
        name: "shuffle",
        aliases: ["mix","خلط"],
        description: "🔀・تبديل قائمة الانتظار الحالية عشوائيًا.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج ....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")

            await client.distube.shuffle(message);
			msg.edit({ content: `🔀・تم تبديل قائمة الانتظار عشوائياً` });
    }
};