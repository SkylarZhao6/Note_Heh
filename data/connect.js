require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = function (connected) {
    // connect to Mongo DB
    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                connected(err);
                return;
            } else {
                console.log("Connected to Mongo: " + mongoose.version);
            }

            // Import documents
            const User = require("./models/user");
            const Album = require("./models/album");
            const List = require("./models/list");
            const Notebook = require("./models/notebook");
            const Note = require("./models/note");

            // queries to database

            // insert a new user
            function createUser(callback, info) {
                bcrypt.hash(info.password, 12, (err, hashed) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    info.password = hashed;

                    User.create(info, (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const user = res;
                        delete user.password;
                        user.id = user._id;
                        callback(null, user);
                    });
                });
            }

            // validate user
            function getUser(callback, inputs) {
                User.findOne({ email: inputs.email }, (err, user) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (inputs.password && user) {
                        bcrypt.compare(
                            inputs.password,
                            user.password,
                            (err, same) => {
                                if (err) {
                                    callback(err);
                                    return;
                                }
                                callback(null, same ? user : null);
                                return;
                            }
                        );
                        return;
                    }
                    callback(null, user);
                });
            }

            // get user info on setting page
            function getUserInfo(callback, search) {
                User.findOne({ _id: search.user }, (err, user) => {
                    err ? callback(err, null) : callback(null, user);
                });
            }

            // change user password
            function updatePW(callback, { user, password }) {
                bcrypt.hash(password, 12, (err, hashed) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    password = hashed;

                    User.findOneAndUpdate(
                        { _id: user },
                        {
                            $set: { password: hashed },
                        },
                        (err, doc) => {
                            err ? callback(err, null) : callback(null, doc);
                        }
                    );
                });
            }

            function createAlbum(callback, { author, title, date }) {
                Album.create(
                    {
                        author: author,
                        title,
                        starred: false,
                        date: date,
                    },
                    (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const album = res;
                        album.id = album._id;
                        callback(null, album);
                    }
                );
            }

            function getAlbum(callback, search) {
                const author_id = new mongoose.Types.ObjectId(search.user);
                Album.find({ author: author_id }, (err, doc) => {
                    err ? callback(err, null) : callback(null, doc);
                });
            }

            function addImageToAlbum(callback, { album_id, image }) {
                Album.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(album_id) },
                    {
                        $push: {
                            image: image,
                        },
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            function starAlbum(callback, { starred, album_id }) {
                Album.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(album_id) },
                    {
                        $set: { starred: starred },
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            function getStarredAlbum(callback, { user, starred }) {
                Album.find(
                    {
                        $and: [{ author: user }, { starred: starred }],
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            function createNotebook(callback, { author, title, created }) {
                Notebook.create(
                    {
                        author: author,
                        title,
                        created,
                    },
                    (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const notebook = res;
                        notebook.id = notebook._id;
                        callback(null, notebook);
                    }
                );
            }

            function getNotebook(callback, search) {
                const author_id = new mongoose.Types.ObjectId(search.user);
                Notebook.find({ author: author_id }, (err, doc) => {
                    err ? callback(err, null) : callback(null, doc);
                });
            }

            function getNotebookbyId(callback, search) {
                const notebook_id = new mongoose.Types.ObjectId(search.notebook);
                Notebook.findOne({ _id: notebook_id }, (err, doc) => {
                    err ? callback(err, null) : callback(null, doc);
                })
            }

            function createNote(
                callback,
                { title, content, imagePath, created }
            ) {
                Note.create(
                    {
                        title,
                        content,
                        image: imagePath,
                        created,
                    },
                    (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const note = res;
                        note.id = note._id;
                        callback(null, note);
                    }
                );
            }

            function addNoteToBook(
                callback,
                { notebook_id, note_id, noteTitle }
            ) {
                Notebook.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(notebook_id) },
                    {
                        $push: {
                            notes: {
                                note_id: new mongoose.Types.ObjectId(note_id),
                                note_title: noteTitle,
                            },
                        },
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            // get a single note
            function getNote(callback, search) {
                const note_id = new mongoose.Types.ObjectId(search.note);
                Note.findOne(
                    {
                        _id: note_id,
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            // search note and notebook by keywords
            function getNoteOrBook(callback, search) {
                const keyword = search.keyword;
                Notebook.find(
                    {
                        $or: [
                            { title: { $regex: ".*" + keyword + ".*" } },
                            {
                                notes: {
                                    $elemMatch: {
                                        note_title: {
                                            $regex: ".*" + keyword + ".*",
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            function getList(callback, search) {
                // return all the to-do lists for user
                const author_id = new mongoose.Types.ObjectId(search.user);
                List.find({ author: author_id }, (err, doc) => {
                    err ? callback(err, null) : callback(null, doc);
                });
            }

            function createList(
                callback,
                { author, title, items, created, archive }
            ) {
                List.create(
                    {
                        author,
                        title,
                        items,
                        created,
                        archive,
                    },
                    (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const list = res;
                        list.id = list._id;
                        callback(null, list);
                    }
                );
            }

            function createItem(callback, { list_id, item }) {
                List.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(list_id) },
                    {
                        $push: {
                            items: {
                                item: item,
                                checkbox: false,
                            },
                        },
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            function updateItem(callback, { list_id, itemIndex, checkbox }) {
                const arr = `items.${itemIndex}.checkbox`;
                let set = { $set: {} };
                set.$set[arr] = checkbox;
                List.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(list_id) },
                    set,
                    {
                        new: true,
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            // search list by keywords
            function getListByKeyword(callback, search) {
                const keyword = search.keyword;
                List.find(
                    {
                        title: { $regex: ".*" + keyword + ".*" },
                    },
                    (err, doc) => {
                        err ? callback(err, null) : callback(null, doc);
                    }
                );
            }

            connected(null, {
                createUser,
                getUser,
                getUserInfo,
                updatePW,
                createAlbum,
                getAlbum,
                starAlbum,
                getStarredAlbum,
                addImageToAlbum,
                createNotebook,
                getNotebook,
                getNotebookbyId,
                createNote,
                getNote,
                addNoteToBook,
                getNoteOrBook,
                getList,
                createList,
                createItem,
                updateItem,
                getListByKeyword,
            });
        }
    );
};
