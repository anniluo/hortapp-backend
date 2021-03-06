const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const user = await User.findOne({ username: body.username });
    const correctPassword =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHashed);

    if (!(user && correctPassword)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jsonWebToken.sign(userForToken, process.env.TOKEN);
    response.status(200).send({ token, username: user.username, id: user._id });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
