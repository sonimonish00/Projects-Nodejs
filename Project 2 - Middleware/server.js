const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000 
const connectDB = require('./connection')
const mongoose = require('mongoose');

// Importing middlewares
const currentTime = require('./Middlewares/timeMiddleware');
const setCookie = require('./Middlewares/cookieMiddleware');
const ageValidation = require('./Middlewares/ageFilterMiddleware');
const host = require('./Middlewares/hostMiddleware');
const logger = require('./Middlewares/loggerMiddleware');

// built-in middleware
app.use(express.json());

// Custom Middleware #1 : Logging Current time into console (Could help in tracking user activity)
app.use(currentTime);
// Custom Middleware #2 : Setting Cookie into Browser (Use document.cookie to view in browser console)
app.use(setCookie);
// Custom Middleware #3 : Age validation Checking to enter Home Page & Other Routes /userpage or /adminpage
app.use(ageValidation);
// Custom Middleware #4 : Displaying hostname & Method used to call this Page
app.use(host);
// Custom Middleware #5 : Logging details in txt file 
app.use(logger);

// Last inbuilt middleware call 
app.use('/', express.static(path.join(__dirname,'View')));

// Router level Custom Middleware #6 #7 #8 - userAuthMiddleware, adminAuthMiddleware, lastMiddlewareRouter
const lastMiddlewareRouter = require('./Controller/middleRouter');

const userAuthMiddleware = require('./Middlewares/userAuthMiddleware');
// localhost:3000/userPage/rahul (Anyone other than rahul can't access)
app.get('/userPage/:username', userAuthMiddleware, (req,res)=>{
    res.send(`You have Succesfully accessed User Page : ${res.locals.username}`);
})

const adminAuthMiddleware = require('./Middlewares/adminAuthMiddleware');
// localhost:3000/adminPage?admin=true
app.get('/adminPage', adminAuthMiddleware, lastMiddlewareRouter)

// Connecting to DB
connectDB(()=>{
    app.listen(port,()=>{
        console.log(`Server Started on port ${port}`);
    })
});