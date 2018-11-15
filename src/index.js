var http = require("http");
var express = require("express");
var app = express();
const Sequelize = require("sequelize");
var server = http.createServer(app);
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");
var cors = require("cors");

mongoose.Promise = global.Promise;
require("dotenv").config();

app.set("dbUrl", process.env.DB_URL);

mongoose.connect(app.get("dbUrl")).then(function(){
  console.log("connected successfully");

}).catch(err=>console.log(err));

app.use(
  cors()
); /*
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}*/

var userRouter = require("./routes/user");
var screenRouter = require("./routes/screen");
var displayRouter = require("./routes/display");
var storeRouter = require("./routes/store");
var ProductModel = require("./models/product_model");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(compression());
app.set("port", process.env.PORT || 8080);

app.use("/user", userRouter);
app.use("/display", displayRouter);
app.use("/screen", screenRouter);
app.use("/store", storeRouter);

app.use(express.static(__dirname + "/hfresh-display/build"));

console.log(__dirname);
app.get("/products",productList);
app.get("*", function(req, res) {
 
  res.sendFile(__dirname + "/hfresh-display/build/index.html"); // load the single view file (angular will handle the page changes on the front-end)
});

function productList(req,res){
  var checkString = req.query.productString.toLowerCase();
  const Product = ProductModel(sequelize, Sequelize);
  Product.findAll({
    where:{ 
        $and: [{
          post_content: {
          $ne: null
        }
      },
      {
        post_title:{
            $ne: null
        }
      },
      { 
      post_content: { 
          $eq: sequelize.col('post_title') 
      }},{ post_content: { $like: '%' + checkString + '%' } 
      }
      
  ]
  
  }
}).then(products => res.json(products))

}
const sequelize = new Sequelize(
  "hfreshco_hfNeDB",
  "hfreshco_NuhFres3",
  "KnCuRg6PmEBk",
  {
    host: "103.18.109.167", //"159.69.113.45",
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection hassssss been established successfully.");
  })
  .catch(err => {
    console.error("Unable to sssssonnect to the database:", err);
  });

  

console.log("databse connected");
server.listen(app.get("port"), function() {
  console.log("listening on server...." + app.get("port"));
});
