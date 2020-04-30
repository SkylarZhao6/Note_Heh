require("dotenv").config();
const mongoose = require("mongoose");

// connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        connected(err); return
    } else {
        console.log("Connected to Mongo: " + mongoose.version);
    }

    // Import documents
    const User     = require("./models/user");

    const newUser = new User({
        firstname: "john",
        lastname: "doe",
        email: "johndoe@email.com",
        password: "password"
    })

    newUser
        .save()
        .then(item => console.log(item))
        .catch(err => console.log(err));
})