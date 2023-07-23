const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000 
const connectDB = require('./Server-Atlas')
const mongoose = require('mongoose');
const user = require('./Model/authModel');
const cors = require('cors');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
// app.use(express.static("."));
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(cors({origin: 'null'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : "mongodb+srv://monishsoni:Rapid456789@node-mongo-cluster.5fwe6ra.mongodb.net/session-test?retryWrites=true&w=majority",
        collection : "sessions"
    }),
    cookie: { maxAge : 1000*60*60*24 }
  }))

// Default Route - Login Page 
// .render() method works with templating engine - pug, handlebar, ejs etc..
// .sendFile() works with static files
// app.use - works with middleware
// express.static - a middleware to serve static file in public/view folder 
// we generally use res.redirect, res.json, and rarely res.send

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, "../Frontend-Client/login.html"));
// });
// app.use('/', express.static(path.join(__dirname,'/View/login.html')));


// Router
const authRouter = require('./Routes/authRouter');
app.use('/', authRouter);


// Route - Signup Page - which method to use ???
// app.get('/signup', authRouter)

// // Route - Dashboard Page (Home Page)
// app.get('/dashboard', authRouter)

// Controller
// const authController = require('./Controller/authController');
// app.get('/userupdate', authController.user_update);

// Connecting to DB
connectDB(()=>{
    app.listen(port,()=>{
        console.log(`Server Started on port ${port}`);
    })
});