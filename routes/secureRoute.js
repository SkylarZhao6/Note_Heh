const express = require("express");
const router = express.Router();

module.exports = () => {
    // router.get("/", (req, res) => {
    //     res.render("main");
    // })

    router.get("/list", (req, res) => {
        res.render("list");
    })

    router.get("/notebook", (req, res) => {
        res.render("notebook");
    })

    router.get("/note", (req, res) => {
        res.render("note");
    })

    router.get("/album", (req, res) => {
        res.render("image");
    })

    return router;
}