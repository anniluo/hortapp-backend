const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.get("/", (request, response, next) => {
  response.json({ message: "login point" });
});

loginRouter.post("/", async (request, response) => {
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

module.exports = loginRouter;
