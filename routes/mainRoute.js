const express = require("express");
const router = express.Router();

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("main");
    })

    router.get("/profile", (req, res) => {
        res.render("profile");
    })

    router.get("/setting", (req, res) => {
        res.render("setting");
    })
    return router;
}