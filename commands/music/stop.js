
module.exports = {
    config: {
        name: "stop",
        aliases: [],
        description: "⏩・يتخطى الأغنية الحالية.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("يعالج .....");
    
    const queue = client.distube.getQueue(message)
    if (!queue) return client.error(`There is nothing in the queue right now!` ,message)
    queue.stop()
    .then(song => {
        msg.edit({ content: `⏩・تم تخطي الاغنية ` });
    });
  }
}
