const { MessageEmbed, Message } = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min}

exports.run = async (client, message, args, perms) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  const isim = args.slice(0).join(' ');
  const bakiye = await db.fetch(`bakiyeasreaper-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${message.author.id}`);
  
  if(hesapdurumu) return message.inlineReply(`:x: Veritabanımda bir hesabınız bulunuyor! Eğer hesap bilgilerinizi öğrenmek istiyorsanız \`.hesabım\` komutunu kullanın!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(hesapismi) return message.inlineReply(`:x: Veritabanımda bir hesabınız bulunuyor! Eğer hesap bilgilerinizi öğrenmek istiyorsanız \`.hesabım\` komutunu kullanın!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(!isim) return message.inlineReply(`:x: Veri eksikliği tespit ettim! Lütfen hesabınızın adını belirleyiniz. \`.hesapoluştur <Hesap İsmi>\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  if(!hesapdurumu) {
if(!hesapismi) {
  db.set(`hesapdurumasreaper-${message.author.id}`, "aktif");
      if(client.ekoayarlar.rastgelepara == true) {
        db.set(`hesapismiasreaper-${message.author.id}`, isim)
        const yıl = new Date().getFullYear();
        const ay = new Date().getDate();
        const gün = new Date().getMonth();
        db.set(`hesaptarihyılasreaper-${message.author.id}`, yıl)
        db.set(`hesaptarihayasreaper-${message.author.id}`, ay)
        db.set(`hesaptarihgünasreaper-${message.author.id}`, gün)
        const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
        db.add(`bakiyeasreaper-${message.author.id}`, randomizer)
        message.inlineReply(embed.setDescription(`:white_check_mark: **${isim}** isimli banka hesabınız oluşturuldu ve veritabanına kaydedildi!
➥ Hesabınızı oluşturduğunuz için bankamız olarak hesabınıza **${randomizer}${client.ekoayarlar.parabirimi}** eklendi!
➥ Paranızı katlamak için \`.kasaaç\` komutu kullanabilir, düzenli para arttırmak içinse \`.daily\` yazmanız yeterlidir!`))
      } else {
        if(client.ekoayarlar.rastgelepara == false) {
          db.set(`hesapismiasreaper-${message.author.id}`, isim)
          const yıl = new Date().getFullYear();
          const ay = new Date().getDate();
          const gün = new Date().getMonth();
          db.set(`hesaptarihyılasreaper-${message.author.id}`, yıl)
          db.set(`hesaptarihayasreaper-${message.author.id}`, ay)
          db.set(`hesaptarihgünasreaper-${message.author.id}`, gün)
          db.add(`bakiyeasreaper-${message.author.id}`, client.ekoayarlar.başlangıçparası)
          message.inlineReply(embed.setDescription(`:white_check_mark: **${isim}** isimli banka hesabınız oluşturuldu ve veritabanına kaydedildi!
          ➥ Hesabınızı oluşturduğunuz için bankamız olarak hesabınıza **${client.ekoayarlar.başlangıçparası}${client.ekoayarlar.parabirimi}** eklendi!
          ➥ Paranızı katlamak için \`.kasaaç\` komutu kullanabilir, düzenli para arttırmak içinse \`.daily\` yazmanız yeterlidir!`))}}}}}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hesap', 'hesapoluştur', 'oluştur'],
    permLevel: 0,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'hesap-oluştur',
    description: '',
    usage: '',
}
