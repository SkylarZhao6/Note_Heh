const express = require("express");
const app = express();

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.set("view engine", "ejs");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // serve landing page
    const landingRoute = require("./routes/indexRoute.js")();
    app.use("/", landingRoute);

    // serve auth pages
    const authRoute = require("./routes/authRoute.js")({database, authenticate: jwt.authenticateJWT, generateAccessToken: jwt.generateAccessToken});
    app.use("/user", authRoute);

    // const mainRoute = require("./routes/mainRoute.js")();
    // app.use("/main", mainRoute);

    return app;
}