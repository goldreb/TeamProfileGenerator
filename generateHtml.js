//function to write to html file
const fs = require('fs');

//write html file

function writePage (html) {
    fs.writeFile("./templates/index.html", html, err =>{
        if(err){
            throw err
        }
        console.log("index.html Page generated")
      cssCopy()
    })
}

const cssCopy = () =>{
    fs.copyFile("./templates/style.css", "./templates/style.css", err => {
        if (err){
            throw err
        }
        console.log('style.css file copied')
    });
}

module.exports = writePage, cssCopy