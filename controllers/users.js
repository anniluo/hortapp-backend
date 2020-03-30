//const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

// HTTP GET ALL USERS
userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("resourceMarkers", {
      natureResource: 1,
      latLng: 1,
      locationName: 1,
      date: 1
    });
    response.json(users.map(user => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

// HTTP GET USER WITH ID
userRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    user ? response.json(user.toJSON()) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

// HTTP UPDATE USER WITH ID
userRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const user = {
    email: body.email,
    username: body.username
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
      new: true
    });
    updatedUser
      ? response.json(updatedUser.toJSON())
      : console.log("Failed to update user");
  } catch (error) {
    next(error);
  }
});

// HTTP DELETE USER WITH ID
userRouter.delete("/:id", async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
