const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')

return message.inlineReply(embed.setDescription(`[Beni sunucuna eklemek için tıkla!](https://discord.com/api/oauth2/authorize?client_id=875021418872569937&permissions=8&scope=bot)`))
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['link'],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};