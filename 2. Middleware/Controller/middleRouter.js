const middlewareModel = require("../Model/middleModel");
const express = require("express");
const router = express.Router();
const path = require("path");

// custom middleware #8 : last middleware to send a file to user, ending the req res cycle.
router.get("/adminPage", function (request, response) {
  // Here we attached to request object directly.
  console.log(`User is Admin : ${request.admin}`)
  let options = {root: path.join(__dirname, "/../Static-File")};
  let fileName = "Hello.txt";
  response.sendFile(fileName, options, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("File sent to browser :", fileName);
    }
  });
});

module.exports = router;
