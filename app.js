const express      = require("express");
const cookieParser = require("cookie-parser");
const cors         = require("cors");
const app          = express();

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.set("view engine", "ejs");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    // serve landing page
    const landingRoute = require("./routes/indexRoute.js")();
    app.use("/", landingRoute);

    // serve auth pages
    // const authRoute = require("./routes/authRoute.js")({database, authenticate: jwt.authenticateJWT, generateAccessToken: jwt.generateAccessToken});
    const authRoute = require("./routes/authRoute")(database, jwt);
    app.use("/user", authRoute);

    const mainRoute = require("./routes/mainRoute")();
    app.use("/main", mainRoute);

    const secureRoute = require("./routes/secureRoute")(database, jwt);
    app.use("/secure", secureRoute);
    
    return app;
}