const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setFooter(client.ekoayarlar.footer).setTimestamp().setColor('RANDOM')
   // const user = message.mentions.members.first();
    const arguman = args[1]

    if(!arguman) return message.inlineReply(`Lütfen bir argüman belirtiniz! \`.event\` `)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['event'],
    kategori: "Bot",
    permLevel: 0
  };
  
  exports.help = {
    name: 'event',
    description: 'event',
    usage: 'event'
  };