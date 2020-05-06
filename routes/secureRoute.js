const express = require("express");
const router = express.Router();

module.exports = (database, jwt, upload) => {
    // router.get("/", (req, res) => {
    //     res.render("main");
    // })

    router.get("/list", (req, res) => {
        res.render("list");
    })

    router.get("/image", (req, res) => {
        res.render("image");
    })

    router.get("/notebook", (req, res) => {
        res.render("notebook");
    })

    router.get("/note", jwt.verifyToken, (req, res) => {
        // database.getNotebook((err, books) => {
        //     if (err) {
        //         res.send("error");
        //         return;
        //     }
        //     res.send(books);
        //     res.render("note");
        // }, {
        //     ...req.query, user_id: req.user.user_id
        // })
        res.render("note");
    })

    router.post("/newnotebook", jwt.verifyToken, (req, res) => {
        database.createNotebook((err, notebook) => {
            if (err) {
                res.send("error");
                return;
            }
            console.log(notebook);
            res.redirect("/secure/note");
        }, {
            author: req.user.user_id,
            title: req.body.notebookTitle
        })
    })

    return router;
}