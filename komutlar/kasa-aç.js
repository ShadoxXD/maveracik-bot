const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const kasalar = require('../coinler/kasa-bilgi.json');
exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  let kasamsg = new MessageEmbed().setDescription(`Lütfen bir kasa ID'si belirtiniz! \`.kasaaç <numara>\` 
:warning: Eğer kasa bilgilerini öğrenmek istiyorsanız \`.kasabilgi\` komutunu kullanın.`).setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  const kasaid = args[0];
  const bakiye = await db.fetch(`bakiyeasreaper-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);
  const kasasayisi = kasalar.length
  if(!hesapdurumu) return message.inlineReply(`:x: Veritabanımda bir hesabınız bulunmuyor! Eğer hesap oluşturmak istiyorsanız \`.hesapoluştur\` komutunu kullanınız.`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(!kasaid) return message.inlineReply(kasamsg).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(kasaid > kasasayisi) return message.inlineReply(kasamsg).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(isNaN(kasaid)) return message.inlineReply(kasamsg).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const kasafiyat = kasalar.filter(x => x.kasaid == kasaid).map(x => x.fiyat)
  if(bakiye < kasafiyat) return message.inlineReply(embed.setDescription(`:x: **${bakiye}${client.ekoayarlar.parabirimi}** bakiyeniz bulunuyorken \`${kasafiyat}${client.ekoayarlar.parabirimi}\` olan bir kasayı satın alamazsınız!`))

  const icindekiler = require(`../coinler/coin${kasaid}`)
  const icindeki = icindekiler[Math.floor(Math.random() * icindekiler.length)];
   db.add(`bakiyeasreaper-${message.author.id}`, -kasafiyat)
   db.add(`bakiyeasreaper-${message.author.id}`, icindeki)
    let karzarar = icindeki - kasafiyat
  message.channel.send(embed.setDescription(`<:mavera_right:875002081042391091> Makine döndü ve şifre açıldı.. Başarıyla kasayı açtın!
<:mavera_nokta:841638847393824788> Açtığın Kasa Numarası: **#${kasaid}**
<:mavera_cash:875002080916557867> Kasadan Kazandığın Para: **${icindeki}${client.ekoayarlar.parabirimi}**
<a:mavera_no:866605462840410113> Kâr-Zarar Durumun: **${karzarar}${client.ekoayarlar.parabirimi}**
`))

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kasaaç'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'kasa-aç',
    description: '',
    usage: ''
}