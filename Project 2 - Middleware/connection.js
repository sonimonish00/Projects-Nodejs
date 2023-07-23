const mongoose = require("mongoose");

// const localdbUrl = 'mongodb://localhost:27017/DBName'; ==> will require mongod --dbpath ./data/db from Home Location (Also requires Compass)
const atlasDbUrl = "mongodb+srv://monishsoni:Rapid456789@node-mongo-cluster.5fwe6ra.mongodb.net/Ex2-Middleware?retryWrites=true&w=majority";
const connectDB = async (cb) => {
  await mongoose
    .connect(atlasDbUrl)
    .then(() => {
      cb();
      console.log("Connected to Database");
    })
    .catch((err) => console.error("Could not Connect to Database", err));
};

module.exports = connectDB;
