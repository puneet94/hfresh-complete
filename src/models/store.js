var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

var StoreSchema = new Schema({
  time: { type: Date, default: Date.now },
  name: { type: String },
  state: { type: String },
  country: { type: String },
  suburb: { type: String },
  street: { type: String },
  address: { type: String },
  pincode: { type: String },
  screens: [{ type: Schema.ObjectId, ref: "Screen" }],
  user: { type: Schema.ObjectId, ref: "User", childPath: "stores" }
});
StoreSchema.plugin(relationship, { relationshipPathName: "user" });
StoreSchema.plugin(autoIncrement.plugin, {
  model: "Store",
  field: "storeId"
});
var Store = mongoose.model("Store", StoreSchema);
exports.Store = Store;
