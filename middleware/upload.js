const multer = require("multer");
const path = require("path");
// router
const express = require("express");
const uploadRouter = express.Router();

// path for images and avatars
const publicPath = path.join(__dirname, "../uploads");
const imgsDir = "images";
// TODO user avatar saving
const avatarsDir = "avatars";

const imageMulter = multer({ dest: path.join(publicPath, imgsDir) }).single(
    "noteImage"
);
uploadRouter.use(imageMulter);

exports.uploadImg = uploadRouter;
