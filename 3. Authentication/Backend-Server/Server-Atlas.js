const mongoose = require("mongoose");

const atlasDbUrl = "mongodb+srv://monishsoni:Rapid456789@node-mongo-cluster.5fwe6ra.mongodb.net/monish-laptop?retryWrites=true&w=majority";

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
