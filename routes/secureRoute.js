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

    router.get("/notebook", jwt.verifyToken, (req, res) => {
        database.getNotebook((err, notebooks) => {
            if (err) {
                console.log(err);
                res.send("error");
                return;
            }
            // console.log(notebooks);
            res.render("notebook", { notebooks: notebooks });
        }, { 
            user: req.user.user_id 
        })
        
    })

    router.get("/note", jwt.verifyToken, (req, res) => {
        res.render("note");
    })

    router.post("/newnotebook", jwt.verifyToken, (req, res) => {
        database.createNotebook((err, notebook) => {
            if (err) {
                console.log(err);
                res.send("error");
                return;
            }
            // console.log(notebook);
            res.redirect("/secure/note");
        }, {
            author: req.user.user_id,
            title: req.body.notebookTitle
        })
    })

    return router;
}