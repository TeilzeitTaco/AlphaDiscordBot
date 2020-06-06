const weatherLookupTable = {
"1000": ":sunny:",
"1003": ":white_sun_cloud:",
"1006": ":cloud:",
"1063": ":white_sun_rain_cloud:",
"1009": ":white_sun_small_cloud:",
"1066": ":cloud_snow:",
"1087": ":cloud_lightning:",
"1117": ":cloud_snow:",
"1180": ":white_sun_rain_cloud:",
"1183": ":cloud_rain:",
"1186": ":cloud_rain:",
"1189": ":cloud_rain:",
"1192": ":thunder_cloud_rain:",
"1195": ":thunder_cloud_rain:",
"1210": ":cloud_snow:",
"1213": ":cloud_snow:",
"1219": ":cloud_snow:",
"1222": ":cloud_snow:",
"1225": ":cloud_snow:",
"1273": ":thunder_cloud_rain:",
"1276": ":thunder_cloud_rain:",
"1279": ":thunder_cloud_rain:",
"1246": ":cloud_tornado:"
};



var key = require("./_keys.js");
const Discord = require("discord.js");
const bot = new Discord.Client();
const axios = require('axios');

const mainURL = 'https://api.weatherapi.com/v1/current.json'; // &q=Athens
const weatherKey = "key=" + key.weatherapi;
const botName = "alpha";

const comfyEmbed1= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Yokohama.Kaidashi.Kikou.full.434673.jpg')

const comfyEmbed2= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Alpha.Hatsuseno.full.434695.jpg')


const comfyEmbed3= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Yokohama.Kaidashi.Kikou.full.434689.jpg')

const comfyEmbed4= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://s1.zerochan.net/Yokohama.Kaidashi.Kikou.600.434675.jpg')

const comfyEmbed5= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Yokohama.Kaidashi.Kikou.full.434312.jpg')

const comfyEmbed6= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://s1.zerochan.net/Yokohama.Kaidashi.Kikou.600.434285.jpg')

const comfyEmbed7= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://s1.zerochan.net/Yokohama.Kaidashi.Kikou.600.445870.jpg')

const comfyEmbed8= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://s1.zerochan.net/Yokohama.Kaidashi.Kikou.600.445859.jpg')

const comfyEmbed9= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://s1.zerochan.net/Yokohama.Kaidashi.Kikou.600.445868.jpg')

const comfyEmbed10= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Alpha.Hatsuseno.full.445865.jpg')

const comfyEmbed11= new Discord.MessageEmbed()
	.setColor('#555555')
	.setImage('https://static.zerochan.net/Yokohama.Kaidashi.Kikou.full.434693.jpg')

const scareEmbed= new Discord.MessageEmbed()
	.setTitle(';-;')
	.setColor('#555555')
	.setImage(url='https://i.imgur.com/jy2EgzV.gif')

const boredEmbed= new Discord.MessageEmbed()
	.setTitle('Hmm...')
	.setColor('#555555')
	.setImage(url='https://i.imgur.com/FljhcLG.gif')

const photoEmbed= new Discord.MessageEmbed()
	.setTitle('Say cheese!')
	.setColor('#555555')
	.setImage(url='https://i.imgur.com/y7jr3a8.gif')

const unpackEmbed= new Discord.MessageEmbed()
	.setTitle('What could be inside?')
	.setColor('#555555')
	.setImage(url='https://i.imgur.com/d5nrnbZ.gif')

const byeEmbed= new Discord.MessageEmbed()
	.setTitle('Until we meet again...')
	.setColor('#555555')
	.setImage(url='https://i.imgur.com/WuHuOK4.gif')

const embedLookupTable = {
0: comfyEmbed1,
1: comfyEmbed2,
2: comfyEmbed3,
3: comfyEmbed4,
4: comfyEmbed5,
5: comfyEmbed6,
6: comfyEmbed7,
7: comfyEmbed8,
8: comfyEmbed9,
9: comfyEmbed10,
10: comfyEmbed11
};


var _message = {};
var currentEmbed=0;

bot.once('ready', () => {
	console.log('Ready');
});

bot.login(key.key);



bot.on("message", (message) => {
    console.log(message);
    _message = message;
    if (message.author.username === botName) {
        return;
    }

	if(message.content.indexOf("a!")!== -1){

if (message.content === "a!comfy") {
        message.channel.send(embedLookupTable[currentEmbed]);
	if(currentEmbed<11){
	currentEmbed++;
	}
	else{
	currentEmbed=0;
	}
	
    }

else if(message.content === "a!scary"){
	message.channel.send(scareEmbed);
}

else if(message.content === "a!bored"){
	message.channel.send(boredEmbed);
}

else if(message.content === "a!photo"){
	message.channel.send(photoEmbed);
}

else if(message.content === "a!unpack"){
	message.channel.send(unpackEmbed);
}

else if(message.content === "a!bye"){
	message.channel.send(byeEmbed);
}

else if(message.content ==="a!link"){
	message.channel.send("https://discord.com/api/oauth2/authorize?client_id=718773791945261097&permissions=378944&scope=bot");
}

else if (message.content.indexOf("a!weather") !== -1) {
        let params = message.content.split("in");
        let queryParameter = params[1].trim();

        message.channel.startTyping();
        fetchWeatherConditions(queryParameter, (result) => {
            let weather = parseWeatherConditions(result);

            let temperature = result["current"].temp_c + "℃" + " - " + result["current"].temp_f + "℉";
            message.channel.send("The weather currently is: " + weather + " and the :thermometer:" + temperature);
            message.channel.stopTyping();
        });
    } 
}
});

/**
 *
 *
 * @param {*} queryParameter - The city or other condition to search the weather API for
 * @param {*} callback - A function to receive our response
 */
function fetchWeatherConditions(queryParameter, callback) {
    const options = {
        hostname: mainURL,
        path: "?" + weatherKey + "&q=" + escape(queryParameter),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get(options.hostname + options.path)
        .then(response => {

            if (callback) {
                callback(response.data);
            }

        })
        .catch(error => {
            console.log(error);
            _message.channel.stopTyping();
        });
}


/**
 *
 *
 * @param {*} data - the weather data response
 * @returns
 */
function parseWeatherConditions(data) {
    return weatherLookupTable[String(data["current"]["condition"].code)];
}