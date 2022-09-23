const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000 
const connectDB = require('./connection')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// default path to redirect to index.html
app.use('/', express.static(path.join(__dirname,'View')));
// app.set('views','./View');

// Router Paths - API
const userRouter = require('./Controller/userController');
app.get('/users', userRouter)
app.post('/users', userRouter)
app.put('/users/:id', userRouter)
app.delete('/users/:id', userRouter)

// Connecting to DB
connectDB(()=>{
    app.listen(port,()=>{
        console.log(`Server Started on port ${port}`);
    })
});