const  { MessageEmbed } = require('discord.js')
const db = require('quick.db');
// .then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
exports.run = async (client, message, args) => {
  
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  let transkllanç = message.mentions.users.first()
  if(!transkllanç) return message.inlineReply(`Lütfen bir kullanıcı etiketleyiniz!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  let kllanç = message.author
  let para = args[1]
  if(transkllanç == kllanç) return message.inlineReply(`Kendinize para transfer edemezsiniz!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(transkllanç.bot == true) return message.inlineReply(`Botlara para transfer edemezsiniz!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(!transkllanç) return message.inlineReply(`Lütfen bir kullanıcı etiketleyiniz!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(!para) return message.inlineReply(`Lütfen bir miktar belirtiniz!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);
  
  const transbakiye = await db.fetch(`bakiyeasreaper-${transkllanç.id}`);
  const transhesapdurumu = await db.fetch(`hesapdurumasreaper-${transkllanç.id}`);
  const transhesapismi = await db.fetch(`hesapismiasreaper-${transkllanç.id}`);
  
  if(!hesapdurumu) { message.inlineReply(`Hesabın bulunmadığı için transfer işlemi iptal edildi! \`.hesapoluştur\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  } else { if(hesapdurumu) { if(!hesapismi) { message.inlineReply(`Hesabın bulunmadığı için transfer işlemi iptal edildi! \`.hesapoluştur\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
      } else { if(hesapdurumu) { if(hesapismi) { if(bakiye < para) return message.channel.send(`:x: Transfer edeceğiniz para kendi paranızdan az olduğu için işlem iptal edildi!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
            if(!transhesapdurumu) return message.inlineReply(`:x: Transfer edeceğiniz kullanıcının banka hesabı bulunmuyor!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
            if(transhesapdurumu) {
                db.add(`bakiyeasreaper-${message.author.id}`, -para)
                db.add(`bakiyeasreaper-${transkllanç.id}`, para)
                transkllanç.send(embed.setDescription(`Merhaba ${transkllanç} ! :tada:

<:mavera_right:875002081042391091> ${message.author} (**${message.author.tag}**) adlı kullanıcı bakiyenize **${para}$** yolladı!`))
                message.channel.send(`${transkllanç} kullanıcısına **${para}$** yolladınız!`)}}}}}}}

exports.conf = { enabled: true, guildOnly: false, aliases: ['paragonder', 'paragönder', 'para-gonder', 'para-gönder'], permLevel: 0, katagori: "Ekonomi"}
exports.help = { name: 'transfer',  description: '', usage: '',}
