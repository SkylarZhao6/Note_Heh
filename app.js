const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const upload = require("./middleware/upload");

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.set("view engine", "ejs");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    // serve landing page
    const landingRoute = require("./routes/indexRoute.js")();
    app.use("/", landingRoute);

    // serve auth pages
    const authRoute = require("./routes/authRoute")(database, jwt);
    app.use("/user", authRoute);

    const mainRoute = require("./routes/mainRoute")(database, jwt);
    app.use("/main", jwt.verifyToken, mainRoute);

    // serve features pages
    const secureRoute = require("./routes/secureRoute")(
        database,
        jwt,
        upload.uploadImg
    );
    app.use("/secure", jwt.verifyToken, secureRoute);

    return app;
};
