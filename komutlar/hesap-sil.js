const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  if(!client.ekoayarlar.admin.includes(message.author.id)) return message.inlineReply(`Hesap silme işlemlerini yanlızca sahibim uygulayabilir!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const silinecekkllnc = message.mentions.members.first();
  if(!silinecekkllnc) return message.inlineReply(`Bir kullanıcı etiketlemedik sanırım admin bey?`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  const bakiye = await db.fetch(`bakiyeasreaper-${silinecekkllnc.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${silinecekkllnc.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${silinecekkllnc.id}`);
  
  if(!hesapdurumu) return message.inlineReply(`Bahsettiğiniz kullanıcının veritabanında kayıtlı bir banka hesabı bulunmadığından işlemler gerçekleşemiyor!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  db.delete(`bakiyeasreaper-${silinecekkllnc.id}`)
  db.delete(`hesapdurumasreaper-${silinecekkllnc.id}`)
  db.delete(`hesapismiasreaper-${silinecekkllnc.id}`)
  message.channel.send(`:+1:`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sil', 'hesapsil'],
    permLevel: 0
}

exports.help = {
    name: 'hesap-sil',
    description: '',
    usage: ''
}