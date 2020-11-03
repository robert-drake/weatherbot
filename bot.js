const config  = require("./config/config.json");
const irc = require("irc-upd");
const geocode = require("node-geocoder");

const options = {
	userName: config.botName,
	realName: config.realName,
	password: config.password,
	port: 6697,
	secure: true,
	selfSigned: true,
	channels: config.channels
};

const owner = config.owner;

let bot = new irc.Client("irc.tilde.chat", "robweatherbot", options);

bot.addListener("error", (message) => {
	console.log('error: ' + message);
});

bot.addListener("pm", function(from, message) {
	from = from.toLowerCase();
	message = message.toLowerCase();
	
	if(from === owner) {
		if( message === "quit") {
			console.log("bye bye");
			bot.disconnect();
			process.exit();
		}
	} else {
		bot.say(from, "You are not my boss!");
		console.log(from + " tried to control me!");
	}
});

bot.addListener("message", (nick, to, text, message) => {
	console.log(to);
	if(!text.startsWith("*")) {
		console.log("Not for me!");
		return;
	}
});