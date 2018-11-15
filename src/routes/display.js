"use strict";
var express = require("express");
var authenticate = require("../middlewares/userAuthenticate");

var DisplayController = require("../controllers/display");
var displayRouter = express.Router();

displayRouter
  .route("/create")
  .post(authenticate, DisplayController.createDisplay);
displayRouter
  .route("/delete/:displayId")
  .post(authenticate, DisplayController.deleteDisplay);
displayRouter
  .route("/get/:displayId")
  .get(authenticate, DisplayController.getDisplay);
displayRouter
  .route("/update/:displayId")
  .post(authenticate, DisplayController.updateDisplay);
displayRouter
  .route("/getDisplays/:screenId")
  .get(authenticate, DisplayController.getDisplays);

module.exports = displayRouter;
