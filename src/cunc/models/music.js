const mongoose = require('mongoose');
const { connection, Schema } = mongoose;

const musicSchema = new Schema({
    title: String,
    author: String,
    album: String,
    icon: String,
    color: String,
    music: {
        text: String,
        video: String,
        audio: String
    },
    number: Number
});

const Music = connection.useDb('db_cunc').model('cunc', musicSchema);

module.exports = Music;
