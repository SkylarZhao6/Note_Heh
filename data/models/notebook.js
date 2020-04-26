const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    created: {
        type: Date, 
        default: Date.now
    }
});

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;