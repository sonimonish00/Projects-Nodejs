const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("user", userSchema);

async function createUser(){
  const user = new User({
      name : "rahul"
  })
  try {
      await user.save();
  } catch (error) {
      console.log(error.message);
  }
}
createUser();

module.exports = User;