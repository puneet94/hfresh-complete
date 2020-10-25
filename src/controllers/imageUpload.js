
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var upload = multer({ dest: './uploads/'});

cloudinary.config({
    cloud_name: '12345',
    api_key: '12345',
    api_secret: '12345'
});

const multipleUpload = async (req,res)=>{
  var imgArray = [];
  var imgArrayMin = [];
  console.log("check upload images");
  console.log(req.files);
  var size = Object.keys(req.files).length;
  console.log(size);
  var counter = 0;
  for(i=0; i<size;i++){
    cloudinary.uploader.upload(req.files[i].path, { eager: [{ width: 112, height: 112, crop: "pad" }
             ]},function(reqc, resc) {
                imgArray.push(resc.url);
                imgArrayMin.push(resc.eager[0].url);
                counter = counter + 1;
                if(counter == size){
                res.json(imgArray);
              }
            });
  }
 }


const uploadController = {
    multipleUpload
};
module.exports = uploadController;
