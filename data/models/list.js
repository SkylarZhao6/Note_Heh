const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    item: [],
    // keep the timestamp?
    created: {
        type: Date, 
        default: Date.now
    },
    archive: Boolean
});

const List = mongoose.model("List", listSchema);

module.exports = List;