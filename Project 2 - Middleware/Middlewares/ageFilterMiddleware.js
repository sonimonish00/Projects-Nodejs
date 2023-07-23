function age(req,res,next){
    if(!req.query.age){
        res.send("Please Provide age in Query of URL ==> localhost:3000/?age=18 OR /adminpage/?age=18&admin=true");
    }
    else if(req.query.age<18){
        res.send("You are Below 18. You can't view this Page !!");
    }
    else{
        next();
    }
}
module.exports = age;