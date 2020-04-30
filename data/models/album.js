const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    image: [],
    date: Date,
    starred: Boolean,
    created: {
        type: Date, 
        default: Date.now
    }
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;