const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    image: [],
    date: String,
    starred: Boolean,
    created: {
        type: Date,
        default: Date.now,
    },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
