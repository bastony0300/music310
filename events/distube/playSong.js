const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client, queue, track) => {
  var newQueue = client.distube.getQueue(queue.id)
  var data = mahmoud(newQueue, track)

  const nowplay = await queue.textChannel.send(data)

  const filter = (message) => {
    if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({ content: "يجب أن تكون في نفس  قناة صوتية.", ephemeral: true });
    }
  };
  const collector = nowplay.createMessageComponentCollector({ filter, time: 600000 });

  collector.on('collect', async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        message.reply({ content:`**⏯・الموسيقة استئنفت من جديد **`, ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        message.reply({ content:`**⏯・الموسيقة توقفت مؤقتاً**`, ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        message.reply({ content:`**❎・لا يوجد موسيقى في قائمة التشغيل**`, ephemeral: true });
      } else {
        await client.distube.skip(message)
          .then(song => {
            nowplay.edit({ components: [] });
            message.reply({ content:`**⏩・لقد تم تخطي الموسيقى **`, ephemeral: true });
          });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }

      await client.distube.stop(message.guild.id);
      await nowplay.edit({ components: [] });
      message.reply({ content:`**▶・ تم ايقاف تشغيل الموسيقى وحذف قائمة التشغيل **`, ephemeral: true });
    } else if (id === "loop") {
      if (!queue) {
        collector.stop();
      }
      if (queue.repeatMode === 0) {
        client.distube.setRepeatMode(message.guild.id, 1);
        message.reply({ content:`**🔁・وضع التكرار \`مفعل\`**`, ephemeral: true });
      } else {
        client.distube.setRepeatMode(message.guild.id, 0);
        message.reply({ content:`**🔁・وضع التكرار \`غير مفعل\`**`, ephemeral: true });
      }
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        message.reply({ content:`**❎・لا يوجد اغاني سابقة في قائمة التشغيل **`, ephemeral: true });
      } else {
        await client.distube.previous(message)
        nowplay.edit({ components: [] });
        message.reply({ content:`**⏪・تم الرجوع الى الاغنية السابقة **`, ephemeral: true });
      }
    }
  });
  collector.on('end', async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
}

function mahmoud(nowQueue, nowTrack) {
  const embeded = new EmbedBuilder()
    .setImage(nowTrack.thumbnail)
    .setColor('#eaee89')
    .setDescription(`**${nowTrack.name}**`)
    .setFooter({ text:`الصوت: ${nowQueue.volume}% ・ التكرار: ${nowQueue.loop ? 'مفعل' : 'معطل'}`})

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setEmoji("⏯")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji("⏪")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stop")
        .setEmoji("▶")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("skip")
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("loop")
        .setEmoji("🔁")
        .setStyle(ButtonStyle.Secondary)
    )
  return {
    embeds: [embeded],
    components: [row]
  }
}