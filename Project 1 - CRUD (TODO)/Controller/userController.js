const userModel = require("../Model/userModel");
const express = require("express");
const router = express.Router();

// CREATE/INSERT (post) : Add button API Call
router.post("/users", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// OTHER WAY IS exports.get = async func(req,res)=>{} OR Simply export all this methods as module.exports = {get,post,etc..}
// READ (get) : Render Data Button API Call (Fetch/get all data)
// This Router should be called when User clicks render Data (Fetching all document/records from DB) & display in browser
router.get("/users", async (request, response) => {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE API CALL
router.put("/users/:id", async (request, response) => {
  const _id = request.params.id;
  const updatedUser = await userModel.updateOne(
    { _id: _id },
    {
      $set: request.body,
    }
  );
  response.send(updatedUser);
});

// DELETE API CALL
router.delete("/users/:id", async (request, response) => {
  const _id = request.params.id;
  const deletedUser = await userModel.deleteOne({ _id: _id });
  response.send(deletedUser);
});

module.exports = router;
