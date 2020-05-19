const express = require("express");
const router = express.Router();

module.exports = (database) => {
    router.get("/", (req, res) => {
        res.render("main");
    });

    router.get("/setting", (req, res) => {
        database.getUserInfo(
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.send("err");
                    return;
                }
                res.render("setting", { user: user });
            },
            { user: req.user.user_id }
        );
    });

    router.get("/profile", (req, res) => {
        database.getUserInfo(
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.send("err");
                    return;
                }
                res.render("profile", { user: user });
            },
            { user: req.user.user_id }
        );
    });

    router.post("/profile/pwreset", (req, res) => {
        database.updatePW(
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.send("err");
                    return;
                }
                res.render("setting", {
                    user: user,
                    msg: "Password has been reset!",
                });
            },
            { user: req.user.user_id, password: req.body.password }
        );
    });

    return router;
};
