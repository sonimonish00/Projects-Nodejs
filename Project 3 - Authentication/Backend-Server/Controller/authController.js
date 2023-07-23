// Controller - CRUD Operations get/post/put/delete
// functions that separate out the code to route requests from the code that actually processes requests.
// Controller are functions, which are called by routes (Which only handles direction of url route to appropiate handler func call)

const express = require("express");
const authUser = require('../Model/authModel');

// router.get("/users", async (request, response) => {
//     const users = await authUser.find({});
//     try {
//       response.send(users);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

const user_login = (req, res) => {
    // Use either res.render, res.json, res.redirect - see how it will work 
    // I think below approach is better
    // router.post("/login", (req, res) => {
    //     const user = User.findOne({username: req.body.username});
    //     if (user) {
    //       res.status(400).json({
    //       message: "this user is already registered",
    //       data: {}
    //       });
    //     };
    //     res.status(200).json({
    //       message: "login successful",
    //       data: user
    //     })
    //   });

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);

    console.log(req.body);
    const userback = {email : req.body.email, password : req.body.password}
    console.log(userback)
    if(req.body.email == "monish@gmail.com" && req.body.password == "123"){
        res.status(200).json({
            message: "login successful",
            data: userback
        })
        // Below code will not work as the above code json has already ended req res cycle 
        // Alternate is to render JSON into HTML - see the action.js post api call 

        // res.redirect('/dashboard')
    }
    else{
        res.redirect('/')
    }
    // Steps to be performed, verfiy the credentials with DB, 
    // Success Redirect to dashboard homepage
    // failure redirect to login homepage again ('/')
};

const user_signup = (req, res) => {
    res.send('This is a signup Page');
};

const user_dashboard = (req, res) => {
    res.send('This is a dashboard Page');
};

module.exports = {user_login, user_signup, user_dashboard};
