const express = require("express");
const router = express.Router();

module.exports = (database, jwt) => {
	// log user in
	router.post("/signin", (req, res) => {
		const { email, password } = req.body;

		database.getUser(
			(err, user) => {
				if (err) {
					res.send("error");
					return;
				}

				if (!user) {
					res.send("Incorrect username or password");
					return;
				}

				const accessToken = jwt.generateToken({
					email,
					user_id: user._id,
                });
                res.cookie("JWT", { accessToken: accessToken });
				res.redirect("/main");
				
			},
			{ email, password }
		);
	});

	// create a new user
	router.post("/register", (req, res) => {
		// check if the email exists
		database.getUser((err, user) => {
				if (err) {
					console.log(err.message);
					res.send("error");
					return;
				}
				if (user) {
					res.send("Email has been taken");
					return;
				}

				console.log(req.body);

				// create the user
				database.createUser((err, user) => {
						// if (err) {
						// 	res.send("error");
						// 	return;
						// }
						
						const accessToken = jwt.generateToken({
							email: user.email,
							user_id: user.id,
						});
						res.cookie("JWT", { accessToken: accessToken });
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

	return router;
};
