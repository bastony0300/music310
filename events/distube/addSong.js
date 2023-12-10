
module.exports = async (client, queue, song) => {
    queue.textChannel.send({ content:`**🎶・تمت اضافة ${song.name} الى قائمة التشغيل , مدتها (\`${song.formattedDuration}\`)**`})
}