const { MessageEmbed } = require('discord.js');
const kasalar = require('../coinler/kasa-bilgi.json');

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  const kasaid = args[0];
  const kasasayisi = kasalar.length
  //
  if(!kasaid) return message.inlineReply(`Lütfen bir kasa ID'si belirtiniz! \`.kasalar\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(kasaid > kasasayisi) return message.inlineReply(`Lütfen bir kasa ID'si belirtiniz! \`.kasalar\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(isNaN(kasaid)) return message.inlineReply(`Lütfen bir kasa ID'si belirtiniz! \`.kasalar\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));

  const kasalarfilter = kasalar.filter(x => x.kasaid == kasaid).map(x => `➥ Kasa İsmi: \`${x.isim}\`
  ➥ Kasa Fiyatı: \`${x.fiyat}${client.ekoayarlar.parabirimi}\`

  • Kasa Özellikleri: ${x.açıklama} `).join('\n ')
  const icindekiler = require(`../coinler/coin${kasaid}`)
  const kasalariçindekilerfilter = icindekiler.map(x => x).join('$, ')
  message.inlineReply(embed.setDescription(`➥ Kasa ID'si: \`#${kasaid}\`
${kasalarfilter}
• Kasadan Çıkabilecek Para Fiyatları: \`${kasalariçindekilerfilter}\` `))}

exports.conf = { enabled: true, guildOnly: false, aliases: ['kasabilgi', 'kasabilgisi', 'kasa'], permLevel: 0}
exports.help = { name: 'kasa-bilgi', description: '', usage: '' }