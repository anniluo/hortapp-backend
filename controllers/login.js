const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userLoginRouter = require("express").Router();
const User = require("../models/user");

userLoginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const correctPassword =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHashed);
  if (!(user && correctPassword)) {
    return response.status(401).json({ error: "invalid username or password" });
  }
  const userForToken = {
    username: user.username,
    id: user._id
  };
  const token = jsonWebToken.sign(userForToken, process.env.SECRET);
  response.status(200).send({ token, username: user.username });
});

module.exports = userLoginRouter;
