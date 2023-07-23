const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    
    // minlength, maxlength, joi validation etc. pending (see video)
  },
  email : {
    type: String,
    required: true,
    // unique : true
  },
  password :{
    type: String,
    required: true,
  }
});

const User = mongoose.model("user", userSchema);

async function createUser(){
  const user = new User({
      username : "hardik",
      email : "hardikpatel@gmail.com",
      password : "12345"
  })
  try {
      await user.save();
  } catch (error) {
      console.log(error.message);
  }
}
createUser();

module.exports = User;