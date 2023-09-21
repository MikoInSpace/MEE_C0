(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let https = require("https")
    const miliConverter = require("millisecond-converter")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.16.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 25/8');
    });
    server.listen(3000);
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: 'I like cheesecake', ephemeral: true, components: [] });
    
                while(s4d.client && s4d.client.token) {
                    await delay(50);
                      s4d.client.user.setPresence({status: "online",activities:[{name:'Visual Studio Code',type:"PLAYING"}]});
          s4d.client.channels.cache.get('1143923218734919846').sendTyping();
    
                    console.log('ran')
                }
            }
      if ((interaction.commandName) == 'website') {
        await interaction.reply({ content: 'https://mikoinspace.github.io/MikoInSpace/', ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'alterrawebsite') {
        await interaction.reply({ content: 'https://alterralaboratories.github.io/Website/', ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'uptime') {
        await interaction.reply({ content: (miliConverter.secsMinsHoursDays((os.sysUptime() * 1000), "string")), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'setup') {
        await interaction.reply({ content: No content, ephemeral: false , components: [] });
      }
    
        });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'ping',
      		description: 'Pings the bot to see if it is online.',
      		options: [
    
          ]
      },{
          name: 'website',
      		description: 'Shows my personal website.',
      		options: [
    
          ]
      },{
          name: 'alterrawebsite',
      		description: 'Shows the Alterra website.',
      		options: [
    
          ]
      },{
          name: 'uptime',
      		description: 'Shows uptime of the bot.',
      		options: [
    
          ]
      },{
          name: 'setup',
      		description: 'Shows my setup specs.',
      		options: [
    
          ]
      },
    ],{
        debug: false,
    
    });
    
    return s4d
})();