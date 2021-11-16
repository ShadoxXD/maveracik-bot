const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
  let member = message.author;
  let kllanç = message.mentions.users.first() || message.author;
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);
  if (!hesapdurumu) {
    if (args[0])
      return message.inlineReply(`Bahsettiğin kullanıcının hesabı bulunmuyor!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
    message.inlineReply(`Hesap oluşturmadan bu komutu kullanamazsın! \`.hesapoluştur <Hesap İsmi>\` `).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  } else { if (hesapdurumu) { message.inlineReply(`Cüzdanınızda **${bakiye}$** bulunuyor! Dikkat edin hırsızlar cüzdanınızı kaçırmasın!`)
      } else {
        if (hesapdurumu) { if (hesapismi) { message.inlineReply(`Cüzdanınızda **${bakiye}$** bulunuyor! Dikkat edin hırsızlar cüzdanınızı kaçırmasın!`)}}}}};

exports.conf = { enabled: true, guildOnly: false, aliases: ['cüzdan', 'bakiyem', 'money', 'moneyim'], permLevel: 0, katagori: "Ekonomi"};
exports.help = { name: "bakiye", description: "", usage: ""};