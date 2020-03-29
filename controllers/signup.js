const bcrypt = require("bcrypt");
const signupRouter = require("express").Router();
const User = require("../models/user");

signupRouter.get("/", async (request, response) => {
  response.status(200).send("login");
});

signupRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    username: body.username,
    passwordHashed: passwordHashed,
    date: new Date()
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
});

module.exports = signupRouter;
