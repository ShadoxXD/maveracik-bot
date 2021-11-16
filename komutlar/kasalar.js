const { MessageEmbed } = require('discord.js');
const kasalar = require('../coinler/kasa-bilgi.json');

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  const kasalarfilter = kasalar.filter(x => x.kasaid).map(x => `➥ Kasa ID'si \`#${x.kasaid}\`
    ➥ Kasa İsmi: \`${x.isim}\`
    ➥ Kasa Fiyatı: \`${x.fiyat}$\`
    ───────────────`).join('\n ')
  message.inlineReply(embed.addField(`Satın Alacabileceğiniz Kasalar:`, kasalarfilter))
}

exports.conf = { enabled: true, guildOnly: false, aliases: [], permLevel: 0, katagori: "Ekonomi"}
exports.help = { name: 'kasalar', description: '', usage: ''}