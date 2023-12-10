
module.exports = async (client, queue, playlist) => {
      queue.textChannel.send({ content:`**🎶・تمت اضافة قائمة الموسيقى ${playlist.name} , العدد (${playlist.songs.length}) , الوقت (\`${queue.formattedDuration}\)**`})
}