let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let autoIncrement = require("mongoose-auto-increment");
let relationship = require("mongoose-relationship");

autoIncrement.initialize(mongoose.connection);

var DisplaySchema = new Schema({
  time: { type: Date, default: Date.now },
  screen: { type: Schema.Types.ObjectId, ref: "Screen", childPath: "displays" },
  store: { type: Schema.ObjectId, ref: "Store" },
  acknowledged: { type: Boolean },
  displayType: { type: String },
  delay: {type:Number},
  products: { type: String },
  productName: {type:String},
  productPrice: {type:Number},
  productCategory: {type:String},
  productImage: {type:String}
});

DisplaySchema.plugin(relationship, { relationshipPathName: "screen" });
DisplaySchema.plugin(autoIncrement.plugin, {
  model: "Display",
  field: "displayId"
});
var Display = mongoose.model("Display", DisplaySchema);
exports.Display = Display;
