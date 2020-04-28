const express = require("express");
const app = express();
const bodyParser = require("body-parser");

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.set("view engine", "ejs");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // serve landing page
    const landingRoute = require("./routes/landingRoute.js")();
    app.use("/", landingRoute);

    // serve auth pages
    const authRoute = require("./routes/authRoute.js")({database, authenticate: jwt.authenticateJWT, generateAccessToken: jwt.generateAccessToken});
    app.use("/user", authRoute);

    return app;
}