const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    image: [],
    notebook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notebook"
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;