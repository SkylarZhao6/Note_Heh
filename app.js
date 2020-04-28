const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const routes = require("./routes/index")

// app.use("/", routes);

// module.exports = app;

module.exports = function() {
    app.use(express.static("Public"));
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // landing
    const indexRoute = require("./routes/indexRoute.js")();
    app.use("/", indexRoute);

    // 
    return app;
}