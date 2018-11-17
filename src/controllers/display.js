"use strict";

var Display = require("..//models/display").Display;

const createDisplay = async (req, res) => {
  var display = new Display();
  const displayType = req.body.display.displayType;
  display.acknowledged = false;
  display.screen = req.body.display.screen;
  display.store = req.body.display.store;
  display.displayType = displayType;
  
  if(displayType=="dynamic"){
    display.screen = req.body.display.screen;
    display.products = JSON.stringify(req.body.display.products);
    display.delay = req.body.display.delay;
  }
  else if(displayType=="static"){
    display.productName = req.body.display.productName 
    display.productPrice = req.body.display.productPrice
    display.productCategory = req.body.display.productCategory
    display.productImage = req.body.display.productImage
  }

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
