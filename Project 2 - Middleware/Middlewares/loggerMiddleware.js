const fs = require('fs');

function log(req,res,next){
    let today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    let datetime = date+' - '+time;
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${datetime}] ${method}: ${url} ${status}`;
    fs.appendFile("./Static-File/Request-Logs.txt", log + "\n", err => {
        if (err) {
          console.log(err);
        }
      });
    next();
}
module.exports = log;