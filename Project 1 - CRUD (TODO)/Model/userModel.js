const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstN: {
    type: String,
    required: true,
  },
  lastN: {
    type: String,
    required: true,
  },
});

// 'User' Table will be created in Ex1CRUD DB, which will be returned as object to mutate on.
const User = mongoose.model("User", userSchema);

let personStaticArr = [
  { firstN: "Monish", lastN: "Soni" },
  { firstN: "Sarthak", lastN: "Modi" },
  { firstN: "Nayan", lastN: "Mali" },
  { firstN: "Mansi", lastN: "Kotkar" },
  { firstN: "Parth", lastN: "Bagariya" },
  { firstN: "Yash", lastN: "Mehta" },
  { firstN: "Mukesh", lastN: "Suthar" },
  { firstN: "Rikesh", lastN: "Suthar" },
  { firstN: "Vandan", lastN: "Shah" },
  { firstN: "Deep", lastN: "Patel" }
];

User.collection.insertMany(personStaticArr,(err)=>{
  if(err){
    console.log(err.message)
  }
  else{
    console.log("10 Users Saved into Database !!!");
  }
})

module.exports = User;