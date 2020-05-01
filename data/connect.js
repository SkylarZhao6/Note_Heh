require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");   

module.exports = function(connected) {
    // connect to Mongo DB
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            connected(err); return
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
        function createUser(callback, {firstname, lastname, email, password}) {
            bcrypt.hash(password, 12, (err, hashed) => {
                if (err) {
                    callback(err); return
                };

                User.insertOne({firstname, lastname, email, password: hashed}, (err, res) => {
                    if (err) {
                        callback(err); return
                    }

                    const user = res.ops[0];
                    delete user.password;
                    user.id = user._id;
                    callback(null, user);
                })
            })
        }
        
        // validate user
        function getUser(callback, inputs) {
            User.findOne({email: inputs.email}, (err, user) => {
                if (err) {
                    callback(err); return 
                }
        
                if (inputs.password) {
                    bcrypt.compare(inputs.password, user.password, (err, same) => {
                        if (err) {
                            callback(err); return 
                        }
                        callback(null, same? user:null); return 
                    })
                }
            })
        }
        connected(null, {
            createUser,
            getUser
        })
    })
}

