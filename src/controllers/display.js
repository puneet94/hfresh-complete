"use strict";

var Display = require("..//models/display").Display;

const createDisplay = async (req, res) => {
  var display = new Display();
  display.screen = req.body.display.screen;
  display.acknowledged = false;
  display.displayType = req.body.display.displayType;
  display.products = req.body.display.products;

  try {
    //let savedUser = await user.save();

    let displaySaved = await display.save();

    res.json(displaySaved);
  } catch (e) {
    console.log("error in save display and user");
    console.log(e);
  }
};
const updateDisplay = async (req, res) => {
  try {
    let display = await Display.findById(req.params.displayId);
    display.state = req.body.type;
    let updatedDisplay = await display.save();
    res.json(updatedDisplay);
  } catch (e) {
    console.log("update display error");
    console.log(e);
  }
};
function getDisplays(req, res) {
  var query = {};

  query.screen = req.params.screenId;

  var options = {};

  options.sort = "-time";

  Display.find(query, null, options).then(displays => {
    res.json(displays);
  });
}
function deleteDisplay(req, res) {
  Display.findById(req.params.displayId, function(err, display) {
    if (err) {
      console.log(err);
    }
    if (display) {
      display.remove(function(err, removed) {
        if (err) {
          console.log("line 71");
          console.log(err);
        }
        if (removed) {
          res.json({ message: "Display has been deleted" });
        }
      });
    }
  });
}
function getDisplay(req, res) {
  Display.findById(req.params.displayId, function(err, display) {
    if (err) {
      console.log(err);
    }
    if (display) {
      res.json({ display: display });
    }
  });
}
var displayController = {
  createDisplay,
  getDisplay,
  deleteDisplay,
  getDisplays,
  updateDisplay
};

module.exports = displayController;
