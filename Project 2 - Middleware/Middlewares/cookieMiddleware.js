function cookie (req,res,next){
    let username = "Rapid456789";
    res.cookie('randomUser', username, {maxAge: 10800});
    console.log("Cookie Set in Client-Side Browser !!");
    next();
}
module.exports = cookie;