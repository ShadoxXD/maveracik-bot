const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
  let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')

  message.inlineReply(embed.setDescription(`\`.hesapoluştur\`: Hesabınızı oluşturarak tüm komutlara erişebilirsiniz!
  \`.daily\`: Bu komutu 24 saatte bir komutu kullanarak hesabınıza **200$** alırsınız!
  \`.hesabım\`: Hesabınızın detaylı bilgilerini öğrenirsiniz!
  \`.kasaaç\`: ID'sini belirttiğiniz kasayı satın alırsınız!
  \`.kasabilgi\`: ID'sini belirttiğiniz kasanın ayrıntılarını öğrenirsiniz!
  \`.kasalar\`: Kabataslak bir şekilde tüm kasaları görürsünüz!
  \`.money\`: Banka hesabınızda bulunan paranıza bakarsınız!
  \`.transfer\`: Bahsettiğiniz kullanıcıya para transferi yaparsınız!
  \`.istatistik\`: Botun istatistikleri açılır!
  \`.davet\`: Botu sunucunuza eklemek için kullanmanız gereken bir komut :)
  
  • Botumuz için destek sunucusuna gerek duyulmadığı için sorununuz/istek/öneriniz varsa ShadoxVEVO#2009'a yazarak veya [ekip sunucusuna](https://discord.gg/2009) gelerek ulaşabilirsiniz!`))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help', 'y', 'h'],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};