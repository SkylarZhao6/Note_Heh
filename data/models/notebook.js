const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    notes: [],
    created: {
        type: Date, 
        default: Date.now
    }
});

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;