const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  let kllanç = message.mentions.users.first() || message.author;
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);
  const hesaptarihyıl = await db.fetch(`hesaptarihyılasreaper-${kllanç.id}`);
  const hesaptarihay = await db.fetch(`hesaptarihayasreaper-${kllanç.id}`);
  const hesaptarihgün = await db.fetch(`hesaptarihgünasreaper-${kllanç.id}`)

  if(!hesapdurumu) {
    message.inlineReply(`Hesap oluşturmadan bu komutu kullanamazsın! \`.hesapoluştur <Hesap İsmi>\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));} else {
    if(hesapdurumu) {
      if(!hesapismi) { message.inlineReply(embed.setDescription(`✅ Hesap oluşturma işlemi başarılı!

\`>\` Oluşturulan Hesap İsmi: **${client.ekoayarlar.isimsiz}**
\`>\` Şuanda Cüzdanda Bulunan Para Miktarı: **${bakiye}**
\`>\` Hesabın Oluşturulma Tarihi: **Veride Bulunamadı!**`)).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }))} else {
        if(hesapdurumu) {
          if(hesapismi) { message.inlineReply(embed.setDescription(`✅ Hesap oluşturma işlemi başarılı!

\`>\` Oluşturulan Hesap İsmi: **${hesapismi}**
\`>\` Şuanda Cüzdanda Bulunan Para Miktarı: **${bakiye}**
\`>\` Hesap Oluşturulma Tarihi: **${hesaptarihay}.${hesaptarihgün}.${hesaptarihyıl}**`)).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));}}}}}}
 
exports.conf = { enabled: true, guildOnly: false, aliases: ['bilgim', 'hesabım', 'profile', 'profilim', 'profil'], permLevel: 0, katagori: "Ekonomi"}
exports.help = { name: 'bilgilerim', description: '', usage: '', }