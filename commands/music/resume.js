
module.exports = {
    config: {
        name: "resume",
        aliases: ["re","كمل","استئناف"],
        description: "⏯・يستأنف الموسيقى",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")
		
		if (queue.paused) { 
			await client.distube.resume(message);
			msg.edit({ content:`⏯・تم استئناف الاغنية` });
		} else {
			msg.edit({ content:`⏯・تم استئناف القائمة` });
		}
    }
}
