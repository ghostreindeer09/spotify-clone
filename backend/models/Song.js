const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        default: 'Unknown Album'
    },
    duration: {
        type: Number, // in seconds
        default: 0
    },
    coverImage: {
        type: String,
        default: ''
    },
    audioUrl: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: 'Pop'
    },
    plays: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Song', songSchema);
