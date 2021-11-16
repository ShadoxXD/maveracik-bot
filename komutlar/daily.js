const { MessageEmbed, Message } = require('discord.js');
const ms = require('ms')
const db = require('quick.db')
const DBL = require('dblapi.js');

function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min;}

exports.run = async (client, message, args) => {
    let timeout = 86400000
    let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
    let daily = await db.fetch(`günlükkullanımgodareçdare-${message.author.id}`);
    const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);

    if(!hesapdurumu) return message.inlineReply(`:x: Veritabanımda bir hesabınız bulunmuyor! Eğer hesap oluşturmak istiyorsanız \`.hesapoluştur\` komutunu kullanınız.`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.inlineReply(`⏲️ Günlük ödülünü almak için **${time.hours}** saatin var!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));} else {
      if(client.ekoayarlar.dbloy == false) {
        db.set(`günlükkullanımgodareçdare-${message.author.id}`, Date.now())
        if(client.ekoayarlar.rastgelepara == true) {
          const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
          db.add(`bakiyeasreaper-${message.author.id}`, randomizer)
          message.inlineReply(embed.setDescription(`<a:mavera_para:841638847644434473> Günlük paran olan **${randomizer}${client.ekoayarlar.parabirimi}** hesabına yatırıldı! 24 saat sonra ödülünü tekrar almayı unutma!`))
        } else {
          if(client.ekoayarlar.rastgelepara == false) {
            db.add(`bakiyeasreaper-${message.author.id}`, client.ekoayarlar.günlükpara)
            message.inlineReply(embed.setDescription(`<a:mavera_para:841638847644434473> Günlük paran olan **${client.ekoayarlar.günlükpara}${client.ekoayarlar.parabirimi}** hesabına yatırıldı! 24 saat sonra ödülünü tekrar almayı unutma!`))}}
      } else {
        if(client.ekoayarlar.dbloy == true) {
          const dbl = new DBL(client.ekoayarlar.dblkey, client)
          dbl.hasVoted(message.author.id).then(voted => {
            if(voted) {
              db.set(`günlükkullanımgodareçdare-${message.author.id}`, Date.now())
              if(client.ekoayarlar.rastgelepara == true) {
                const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
                db.add(`bakiyecdare-${message.author.id}`, randomizer)
                message.inlineReply(embed.setDescription(`<a:mavera_para:841638847644434473> Günlük paran olan **${randomizer}${client.ekoayarlar.parabirimi}** hesabına yatırıldı! 24 saat sonra ödülünü tekrar almayı unutma!`))
              } else {
                if(client.ekoayarlar.rastgelepara == false) {
                  db.add(`bakiyecdare-${message.author.id}`, client.ekoayarlar.günlükpara)
                  message.inlineReply(embed.setDescription(`<a:mavera_para:841638847644434473> Günlük paran olan **${client.ekoayarlar.günlükpara}${client.ekoayarlar.parabirimi}** hesabına yatırıldı! 24 saat sonra ödülünü tekrar almayı unutma!`))
                }
              }
            } else {
              return message.channel.send(`${client.ekoayarlar.dblmsj}`)
            }
          })
        }
      }
   }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['günlük-para', 'daily', 'günlük'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'günlükpara',
    description: '',
    usage: ''
}