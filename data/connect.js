require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = function (connected) {
	// connect to Mongo DB
	mongoose.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(err) => {
			if (err) {
				connected(err);
				return;
			} else {
				console.log("Connected to Mongo: " + mongoose.version);
			}

			// Import documents
			const User     = require("./models/user");
			const Album    = require("./models/album");
			const List     = require("./models/list");
			const Notebook = require("./models/notebook");
			const Note     = require("./models/note");

			// queries to database
			// insert a new user
			function createUser(callback, info) {
				bcrypt.hash(info.password, 12, (err, hashed) => {
					if (err) {
						callback(err);
						return;
					}
					info.password = hashed;

					User.create(info, (err, res) => {
						if (err) {
							callback(err);
							return;
						}
						const user = res;
						delete user.password;
						user.id = user._id;
						callback(null, user);
					});
				});
			}

			// validate user
			function getUser(callback, inputs) {
				User.findOne({ email: inputs.email }, (err, user) => {
					if (err) {
						callback(err, null);
						return;
					}
					if (inputs.password) {
						bcrypt.compare(inputs.password, user.password, (err, same) => {
							if (err) {
								callback(err);
								return;
							}
                            callback(null, same? user : null);
                            return;
                        })
                        return;
					}
					callback(null, null);
				});
			}

			// insert a new notebook
			function createNotebook(callback, { author, title, created }) {
				Notebook.create({ 
					author: new mongoose.Types.ObjectID(author), 
					title, 
					created 
				}, (err, res) => {
					if (err) {
						callback(err);
						return;
					}
					const notebook = res;
					notebook.id = notebook._id;
					callback(null, notebook);
				})
			}

			// get notebooks for the author
			function getNotebook(callback, search) {
				console.log(search);
				Notebook.find({
					author: mongoose.Types.ObjectID(search.user_id)
				}).map(notebook => ({
					...notebook, id: notebook._id
				})).toArray(callback);
			}

			

			connected(null, {
				createUser,
				getUser,
				createNotebook,
				getNotebook,
			});
		}
	);
};
