// Unknown router problems...
const express = require("express");
const router = express.Router();

module.exports = () => {
    router.get("/fk", (req, res) => {
        res.render("main");
    })
    return router;
}