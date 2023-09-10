var express = require('express');
var router = express.Router();
const fs = require('fs');
// import { mkdir } from 'node:fs';


/* GET home page. */





router.get('/', function (req, res) {

//--------------Show File & Folder -----------------//

  fs.readdir("./upload", { withFileTypes: true }, function (err, files) {
    var dupArr = [];
    files.forEach(function (dirent) {
      dupArr.push({ name: dirent.name, isFile: dirent.isDirectory() });
    })
    // console.log(files);
    res.render('index', { files: dupArr });
  })
});

//--------------Create File-----------------//

router.get('/fileCreation',(req, res) => {
  fs.writeFile(`./upload/${req.query.filename}`, " ", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/");
    }
  });
})

//--------------Create Folder-----------------//


router.get('/folderCreation', (req, res) => {

  fs.mkdir(`./upload/${req.query.foldername}`, (err) => {
    if (err) {
      console.error(err);
    } 
    else {
      res.redirect("/");

    }
  });
})

// router.get('./openedfile/:filename',function(req,res){
//   fs.readdir("./upload", { withFileTypes: true }, function (err, files) {
//     var dupArr = [];
//     files.forEach(function (dirent) {
//       dupArr.push({ name: dirent.name, isFile: dirent.isDirectory() });
//     })
//     fs.writeFile(`./upload/${req.params.foldername}`,utf8, function(err,data){
//        console.log("hogyaa");
//           res.render('index', { files: dupArr, filename: req.params.foldername, filedata: data });
//     })
    
//   })


// })

router.get('/file/:filename',function(req,res){
          // res.send("hii");

          fs.readdir("./upload", { withFileTypes: true }, function (err, files) {
            
            var dupArr = [];

            files.forEach(function (dirent) {
              dupArr.push({ name: dirent.name, isFile: dirent.isDirectory() });
            })
            // res.render('openedfile', { files: dupArr });

            fs.readFile(`./upload/${req.params.filename}`,"utf-8", function(err,data){
              console.log("hogyaa");
                 res.render('open_file', { files: dupArr, filename: req.params.filename, filedata: data });
           })
          })
          

  


})

  //--------------delete File & Folder -----------------//


// router.get('/deletefolder/:filename', function (req, res) {


//   fs.readdir("./upload", { withFileTypes: true }, function (err, files) {
            
//     var dupArr = [];

//     files.forEach(function (dirent) {
//       dupArr.push({ name: dirent.name, isFile: dirent.isDirectory() });
//     })

//     fs.rmdir(`./upload/${req.params.filename}`, { recursive: true }, function (err, files) {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('Folder deleted successfully.');
//       }
//     });
//   })

  









      



//     }
//   )
router.get('/deletefolder/:filename', function (req, res) {
  fs.rmdir(`./upload/${req.params.filename}`, { recursive: true }, function (err) {
    res.redirect('/');
    
  });
})


router.get('/deletefile/:filename', function (req, res) {
  fs.unlink(`./upload/${req.params.filename}`, function (err) {
    res.redirect('/');
    
  });
});
  
 


 








module.exports = router;


// document.querySelector("#icon")



//-----------------------------------------folder show----------------------------------------------//
// making path





