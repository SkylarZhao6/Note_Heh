const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    items: [],
    created: {
        type: Date, 
        default: Date.now
    },
    archive: {
        type: Boolean,
        default: false
    }
});

const List = mongoose.model("List", listSchema);

module.exports = List;