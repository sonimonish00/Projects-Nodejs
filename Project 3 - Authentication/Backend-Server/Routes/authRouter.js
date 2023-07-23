const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require('../Controller/authController');

// Default Route for '/' is login page for entry
router.get('/', (req,res)=>{
    // res.render (view engine) OR res.send (plain html) OR res.sendFile (html file)
    // This is not a correct way to do, but nothing else comes off my mind. 
    // Also there is a bug like back and forth click could easily send back to login page even after login
    // May be this bug will fix in future or not dont know.
    
    // res.sendFile(path.join(__dirname, "/../../Frontend-Client/login.html"));
    if(req.session.viewCount){
        req.session.viewCount++;
    }else{
        req.session.viewCount = 1;
    }
    res.send(`<h1>You have visited this Page ${req.session.viewCount} times.</h1>`)
})
router.post('/', authController.user_login)
router.get('/signup', authController.user_signup)
router.get('/dashboard', authController.user_dashboard)

// Routes
// will be accessed as /signup/signup
// router.get('/signup',(req,res)=>{
//     // res.sendFile(path.join(__dirname, "/../View/signup.html"));
//     res.redirect('/users');
// })

// below one is acting like a controller as it is sending html response ??
// /dashboard/xyz
// router.get('/dashboard',(req,res)=>{
//     res.send("This is a Dashboard Home Page (After Login)");
// })


module.exports = router;