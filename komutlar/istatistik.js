const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')

return message.inlineReply(embed.setDescription(`\`•\` **${client.ws.ping}** pingim bulunuyor!
\`•\` Toplamda **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** kullanıcıya hizmet ediyorum!
\`•\` **${client.guilds.cache.size.toLocaleString()}** adet sunucuya hizmet ediyorum!`))
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i'],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};