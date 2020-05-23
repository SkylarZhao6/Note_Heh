const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    image: [],
    starred: Boolean,
    date: String,
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
