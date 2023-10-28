
// sharp('1.jpg')
// .resize( 200, 200)
// .toFile('out.jpg', (err,data)=>{
  //     if(err){
    //         console.log(err)
    //     }else{
      //         console.log("Resized succesfully");
      //     }
      // })
      
const sharp = require ('sharp');
const path = require('path');
const multer = require('multer');
const express =  require('express');
const app = new express;

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "hbs");


// app.get("/",(req,res)=>{
//     res.render("home");
// })

app.get("/",(req,res)=>{
    res.render("imgresizer");
})

// Configure Multer to use memory storage
const upload = new multer ();

app.post('/imgresizer', upload.single('image'), (req, res) => {
  //body-parser le body tag vitra ko elements lai direct access garn milx, likr: req.body.element-Name
  const height = Number(req.body.height);
  const width = Number(req.body.width);
  // console.log(hight);
  // console.log(width);

  // req.file contains the uploaded image as a buffer
  const imageBuffer = req.file.buffer;
  console.log(imageBuffer);
  sharp(imageBuffer)
    .resize(width, height)
    .png()
    .toBuffer()
    .then((processedImage) => {
      const imageBase64 = processedImage.toString('base64');
      const dataUrl = `data:image/png;base64,${imageBase64}`;
      res.send(dataUrl);
    })
  .catch((err) => {
    res.status(500).send('Image processing error');
  });

});


app.listen((4500),()=>{
    console.log("server running on port 4500");
});