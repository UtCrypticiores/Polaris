require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

function swear(message, client, msg, channelId, messageId) {
    let list = fs.readFileSync(
        path.join(__dirname, "../resources/swears.txt"),
        "utf-8"
    );
    let sassy = fs.readFileSync(
        path.join(__dirname, "../resources/sassy.txt"),
        "utf-8"
    );
    let config = fs.readFileSync(path.join(__dirname, "../config/config.json"));
    let R;

    message = message.toLowerCase();
    list = list.toLowerCase();
    sassy = sassy.split("\n");
    message = message.split(" ");
    config = JSON.parse(config);
    list = list.split("\n");
    R = Math.floor(Math.random() * sassy.length);
    for (let index = 0; index < list.length; index++) {
        for (let i = 0; i < message.length; i++) {
            if (message[i] == list[index]) {
                client.channels.fetch(channelId).then((channel) => {
                    channel.messages.delete(messageId);
                });
                msg.channel.send({
                    content: "<@" + msg.author.id + "> " + sassy[R],
                });
            }
        }
    }
}

module.exports = { swear };
