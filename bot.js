const irc = require("irc-upd");

const options = {
	userName: "robweatherbot",
	realName: "Rob's Weather Bot",
	password: "6uldv8",
	port: 6697,
	secure: true,
	selfSigned: true,
	channels: ["#theasylum"]
};

const owner = "robdrake";

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

