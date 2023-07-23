function host(req,res,next){
    console.log("Current Hostname is : ",req.hostname);
    console.log("HTTP Method is : ",req.method);
    next();
}
module.exports = host;