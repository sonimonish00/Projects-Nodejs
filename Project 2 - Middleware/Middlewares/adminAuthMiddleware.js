function auth(req,res,next){
    if(req.query.admin === 'true'){
        console.log(`Admin Logged in URL : ${req.originalUrl} || Displaying Admin User Page...`);
        req.admin = true;
        next();
    }
    else{
        res.send("You are not Admin, So You can't view this Page. Sorry !!")
    }
}
module.exports = auth;