const express = require("express");
const router = express.Router();

module.exports = ({ database, authenticate, generateAccessToken }) => {
    // log user in
    router.post("/signin", (req, res) => {
        const { email, password } = req.body;

        database.getUser((err, user) => {
            if (err) {
                res.send("error"); return
            }

            if (!user) {
                res.send("Incorrect username or password"); return
            }

            const accessToken = generateAccessToken({ email, user_id: user._id });
            res.send({ accessToken: accessToken });
            res.redirect("landing");
        }, { email, password })
    });

    // create a new user
    router.post("/register", (req, res) => {
        // check if the email exists
        database.getUser((err, user) => {
            if (err) {
                console.log(err);
                res.send("error"); return
            }
            if (user) {
                res.send("Email has been taken"); return
            }

            // create the user
            database.createUser((err, user) => {
                if (err) {
                    res.send("error"); return
                }
                const accessToken = generateAccessToken({ email: user.email, user_id: user.id});
                res.send({ accessToken: accessToken });

                res.redirect("landing");
            }, { email: req.body.email, password: req.body.password});

        }, {email: req.body.email});
        
    });

    return router;
}
