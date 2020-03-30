const bcrypt = require("bcrypt");
const signupRouter = require("express").Router();
const User = require("../models/user");

signupRouter.get("/", (request, response, next) => {
  response.json({ message: "signup point" });
});

signupRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    username: body.username,
    passwordHashed: passwordHashed,
    date: Date.now(),
    resourceMarkers: []
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = signupRouter;
