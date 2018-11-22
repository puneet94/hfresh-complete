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

var Promise = require('bluebird');
var {Storage} = require('@google-cloud/storage');

var storage = new Storage({
  projectId: 'hfresh-new',
  keyFilename: './src/hfresh-new-5c1003bcc8b9.json'
})
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
var uploadRouter = require("./routes/imageUpload");
var screenRouter = require("./routes/screen");
var displayRouter = require("./routes/display");
var storeRouter = require("./routes/store");
var ProductModel = require("./models/product_model");
const formData = require('express-form-data')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(compression());

app.use(formData.parse())
app.set("port",  process.env.PORT || 8080);

app.use("/user", userRouter);
app.use("/display", displayRouter);
app.use("/screen", screenRouter);
app.use("/store", storeRouter);
app.use("/upload", uploadRouter);

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
/*
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

  */
server.listen(app.get("port"), function() {
  console.log("listening on server...." + app.get("port"));
  uploadImage();
});

function uploadImage(){

var BUCKET_NAME = 'my-bucket'
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket(BUCKET_NAME)

// check if a file exists in bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists
console.log("bucket access");
    
    
// upload file to bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket?method=upload
let localFileLocation = './bg_paral.jpg'
let file = myBucket.file(localFileLocation);
    console.log("file exists");

const stream = file.createWriteStream({
  metadata: {
    contentType: "image/jpeg"
  }
});

stream.on('error', (err) => {
 
 console.log(err);
});

stream.on('finish', () => {
  var cloudStorageObject = gcsname;
  var cloudStoragePublicUrl = getPublicUrl("bg_paral.jpg");
  console.log("end file load");
  console.log(cloudStoragePublicUrl)
});

stream.end();
// get public url for file
function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}


}