const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    item: [],
    created: {
        type: Date, 
        default: Date.now
    },
    archive: Boolean
});

const List = mongoose.model("List", listSchema);

module.exports = List;