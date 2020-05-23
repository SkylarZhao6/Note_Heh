const express = require("express");
const router = express.Router();

module.exports = (database, jwt) => {
    // log user in
    router.post("/signin", (req, res) => {
        const { email, password } = req.body;

        database.getUser(
            (err, user) => {
                if (err) {
                    res.render("error");
                    return;
                }
                if (!user) {
                    res.render("login", {
                        msg: "Incorrect username or password!",
                    });
                    return;
                }
                const token = jwt.generateToken({
                    email,
                    user_id: user._id,
                });
                res.cookie("JWT", { token: token });
                res.redirect("/main");
            },
            { email, password }
        );
    });

    // user registration
    router.post("/register", (req, res) => {
        // check if the email exists
        database.getUser(
            (err, user) => {
                if (err) {
                    res.render("error");
                    return;
                }
                if (user) {
                    res.render("signup", {
                        msg: "Email has been taken",
                    });
                    return;
                }
                console.log(req.body);

                // create the user
                database.createUser(
                    (err, user) => {
                        if (err) {
                            res.render("error");
                            return;
                        }
                        const token = jwt.generateToken({
                            email: user.email,
                            user_id: user.id,
                        });
                        res.cookie("JWT", { token: token });
                        res.redirect("/main");
                    },
                    {
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                    }
                );
            },
            { email: req.body.email }
        );
    });

    // log user out
    router.get("/logout", (req, res) => {
        res.clearCookie("JWT");
        res.status(204).redirect("/");
    });

    return router;
};
