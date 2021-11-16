const express = require('express');
const app = express();
app.use(express.static("public"));
const queue = new Map();
const { apikey } = require('./ayarlar.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('apikey');
const prefix = ayarlar.prefix;
const fs = require('fs');
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");});
const db = require("quick.db")
require('./inlineReply.js')
require('./util/eventLoader')(client);

client.ekoayarlar = {
  parabirimi: "$",
  botunuzunprefixi: ".",
  botunuzunidsi: "877434091820183582",
  botismi: "Laynex",
  renk: "RANDOM",
  isimsiz: "Hesap İsmi Belirtilmemiş.",
  rastgelepara: true, // true yaparsam rastgele gunluk para verilecek.
  minpara: 500, // rastgele moneyi acarsam min gelecek para
  maxpara: 1000, // max gelcek para (rastgele)
  günlükpara: 100, // false return +100 money
  dbloy: false, // onaylanırsa açılacak
  dblkey: "KEY", // dbl onaylanırsa oyla eklenecek.
  dblmsj: "Bu komutu kullanabilmek için oy kullanmalısınız! ",
  başlangıçparası: 200,
  admin: ["860119403978817546"],
  footer: "Laynex "}
const kurulum = message => { console.log(`Kurulum: ${message}`)};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => { if (err) console.error(err);
  kurulum(`${files.length} komut kurulacak.`);
   kurulum(`-------------------------`);
   files.forEach(f => { let pingKodları = require(`./komutlar/${f}`);
  
    kurulum(`Kurulan komut ~ ${pingKodları.help.name}.`);
    client.commands.set(pingKodları.help.name, pingKodları); 
    kurulum(`-------------------------`);
    client.commands.set(pingKodları.help.name, pingKodları);
    pingKodları.conf.aliases.forEach(alias => { client.aliases.set(alias, pingKodları.help.name);});});});

client.reload = command => { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./komutlar/${command}`)];
      let pingDosya = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias);});
      client.commands.set(command, pingDosya);
      pingDosya.conf.aliases.forEach(alias => { client.aliases.set(alias, pingDosya.help.name);});resolve();} catch (e){ reject(e);}});};

client.load = command => { return new Promise((resolve, reject) => { try { let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => { client.aliases.set(alias, cmd.help.name);}); resolve();} catch (e){ reject(e);}});};

client.unload = command => { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias);});resolve();} catch (e){ reject(e);}})};

client.on('ready', () => { client.user.setPresence({ activity: { name: `Laynex | Economy Bot` }, status: "dnd" })})

client.login("token");