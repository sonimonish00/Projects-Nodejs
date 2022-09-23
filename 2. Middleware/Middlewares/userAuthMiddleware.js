const user = require("../Model/middleModel");

// Here attaching value to res.locals.username
async function userAuth(req,res,next){
    const dbUser = await user.findOne({name: 'rahul'}).exec();
    const currUser = req.params.username;
    if(dbUser.name == currUser){
        console.log("Valid User : Rahul");
        res.locals.username = currUser;
        next();
    }
    else{
        console.log(`Invalid User : ${currUser}`);
        return res.send(`${currUser} is Invalid User to access this Page !!`);
    }
}
module.exports = userAuth;