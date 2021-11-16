const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  if(!client.ekoayarlar.admin.includes(message.author.id)) return message.inlineReply(`Para ekleme işlemini yanlızca sahibim uygulayabilir!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const silinecekkllnc = message.mentions.members.first();
  let para = args[1]
  if(!silinecekkllnc) return message.inlineReply(`Bir kullanıcı etiketlemedik sanırım admin bey?`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const bakiye = await db.fetch(`bakiyeasreaper-${silinecekkllnc.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${silinecekkllnc.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${silinecekkllnc.id}`);
  
  if(!hesapdurumu) return message.inlineReply(`Bahsettiğiniz kullanıcının veritabanında kayıtlı bir banka hesabı bulunmadığından işlemler gerçekleşemiyor!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  await db.add(`bakiyeasreaper-${silinecekkllnc.id}`, -para)

  message.inlineReply(`:white_check_mark:`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['parasil', 'para-sil', 'money-sil', 'moneysil', 'para-çıkart'],
    permLevel: 0
}

exports.help = {
    name: 'coinsil',
    description: '',
    usage: ''
}