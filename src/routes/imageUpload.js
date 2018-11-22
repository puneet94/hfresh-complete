"use strict";
var express = require("express");
var authenticate = require("../middlewares/userAuthenticate");

var UploadController = require("../controllers/imageUpload");
var displayRouter = express.Router();

displayRouter
  .route("/imageUpload")
  .post(authenticate, UploadController.multipleUpload);

module.exports = displayRouter;
