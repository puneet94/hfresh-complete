let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let autoIncrement = require("mongoose-auto-increment");
let relationship = require("mongoose-relationship");

autoIncrement.initialize(mongoose.connection);

var DisplaySchema = new Schema({
  time: { type: Date, default: Date.now },
  screen: { type: Schema.ObjectId, ref: "Screen", childPath: "displays" },
  acknowledged: { type: Boolean },
  displayType: { type: String },
  products: { type: String }
});

DisplaySchema.plugin(relationship, { relationshipPathName: "screen" });
DisplaySchema.plugin(autoIncrement.plugin, {
  model: "Display",
  field: "displayId"
});
var Display = mongoose.model("Display", DisplaySchema);
exports.Display = Display;
