function time(req,res,next){
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    req.currDT = date+' ~~~~~~~> '+time;
    let responseText = 'You Requested this Page at : '+req.currDT;
    console.log(responseText);
    next();
}
module.exports = time;