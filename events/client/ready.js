const figlet = require('figlet');
const chalk = require('chalk');

module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.redBright(`[${client.user.tag}] Bot is ready!`));
  });
  const activities = [
      `${client.prefix}help`,
      `${client.prefix}play`,
      
  ];

    setInterval(() => {
        client.user.setPresence({ 
            activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }], 
            status: 'online', 
        });
    }, 15000)
}
