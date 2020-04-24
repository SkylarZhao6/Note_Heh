const express = require("express");
const app = express();

module.exports = () => {
    app.use(express.static("Public"));
    app.set("view engine", "ejs");

    
}