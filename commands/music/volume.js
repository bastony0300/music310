const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        aliases: ["صوت", "v"],
        description: "🔊・يغير حجم تشغيل الموسيقى.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج ....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("يجب أن تكون في نفس / قناة صوتية.")

        const volume = parseInt(args[0]);

        if (!volume) {
            return msg.edit({ content:`الحجم الحالي : \`${queue.volume}\`%` });
        }

        if (isNaN(volume)) {
            return msg.edit({ content: `من فضلك أدخل رقما صالحا` });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`يرجى تقديم رقم بين 1 و 100`)

        client.distube.setVolume(message, volume);

        const embed = new EmbedBuilder()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Change volume to:** \`${args[0]}\`%`)

        msg.edit({ content: `🔊・تم تغيير حجم الصوت الى: \`${args[0]}\`%` });

    }
}
