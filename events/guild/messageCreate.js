const { PermissionsBitField } = require("discord.js");

module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    const PREFIX = client.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      message.channel.send({ content:`**بادئة التشغيل هي : \`${PREFIX}\`**` })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return await message.author.dmChannel.send({ content: `ليس لدي صلحية **\`SEND_MESSAGES\`** في هذا  <#${message.channelId}> لاستعمل اوامري!` }).catch(() => {});
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return await message.channel.send({ content: `ليس لدي صلحية  **\`EMBED_LINKS\`** لابدأ في تشغيل الموسيقى!` }).catch(() => {});
    
  

    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
        return message.channel.send({ content:`حدث خطأ أثناء تنفيذ هذا الأمر.` });
    }
}