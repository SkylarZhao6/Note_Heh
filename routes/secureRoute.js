const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

module.exports = (database, jwt, upload) => {
    router
        .route("/list")
        .get((req, res) => {
            database.getList(
                (err, lists) => {
                    if (err) {
                        // console.log(err);
                        res.send("error");
                        return;
                    }
                    res.render("list", { lists: lists });
                },
                {
                    user: req.user.user_id,
                }
            );
        })
        .post((req, res) => {
            database.updateItem(
                (err, res) => {
                    if (err) {
                        console.log(err);
                        res.send("error");
                        return;
                    }
                    console.log("list item updated");
                },
                {
                    list_id: req.body.list_Id,
                    checkbox: req.body.is_checked,
                    itemIndex: req.body.itemID,
                }
            );
        });

    // post a new list
    router.post("/newlist", (req, res) => {
        database.createList(
            (err, list) => {
                if (err) {
                    res.send("error");
                    return;
                }
                // console.log(list);
                res.redirect("/secure/list");
            },
            {
                author: req.user.user_id,
                title: req.body.listTitle,
            }
        );
    });

    router.post("/list/newitem/:id", (req, res) => {
        database.createItem(
            (err, item) => {
                if (err) {
                    // console.log(err);
                    res.send("error");
                    return;
                }
                res.redirect("/secure/list");
            },
            {
                list_id: req.params.id,
                item: req.body.newItem,
            }
        );
    });

    router.get("/image", (req, res) => {
        res.render("image");
    });

    // post a new notebook
    router.post("/newnotebook", (req, res) => {
        database.createNotebook(
            (err, notebook) => {
                if (err) {
                    // console.log(err);
                    res.send("error");
                    return;
                }
                res.redirect(`/secure/newnotebook/${notebook.id}`);
            },
            {
                author: req.user.user_id,
                title: req.body.notebookTitle,
            }
        );
    });

    router
        .route("/newnotebook/:id")
        // get to note editing page
        .get((req, res) => {
            res.render("note", { notebook_id: req.params.id });
        })
        // post a new note in the notebook
        .post(upload, (req, res) => {
            // console.log(req.file)
            database.createNote(
                (err, note) => {
                    if (err) {
                        console.log(err);
                        res.send("error");
                        return;
                    }

                    database.addNoteToBook(
                        (err, note) => {
                            if (err) {
                                res.send("error");
                                return;
                            }
                        },
                        {
                            notebook_id: req.params.id,
                            note_id: note.id,
                            noteTitle: req.body.noteTitle,
                        }
                    );

                    res.redirect("/secure/notebook");
                },
                {
                    title: req.body.noteTitle,
                    content: req.body.note,
                    // imagePath: path.join(`${__dirname}../uploads/images/${req.file.originalName}`)
                }
            );
        });

    // get to notebook overview page
    router.get("/notebook", (req, res) => {
        database.getNotebook(
            (err, notebooks) => {
                if (err) {
                    // console.log(err);
                    res.send("error");
                    return;
                }
                res.render("notebook", { notebooks: notebooks });
            },
            {
                user: req.user.user_id,
            }
        );
    });

    // view a note
    router.get("/note/:id", (req, res) => {
        database.getNote(
            (err, note) => {
                if (err) {
                    // console.log(err);
                    res.send("error");
                    return;
                }
                res.render("viewNote", { note: note });
            },
            {
                note: req.params.id,
            }
        );
    });

    // search notes and notebooks by keyword
    router.post("/notebook/search", (req, res) => {
        database.getNoteOrBook(
            (err, notebooks) => {
                if (err) {
                    // console.log(err);
                    res.send("error");
                    return;
                }
                res.render("notebook", { notebooks: notebooks });
            },
            {
                keyword: req.body.keyword,
            }
        );
    });

    return router;
};
