const userRouter = require("express").Router();
const User = require("../models/user");

// HTTP GET ALL USERS
userRouter.get("/", (request, response) => {
  User.find({}).then(users => {
    response.json(users.map(user => user.toJSON()));
  });
});

// HTTP GET USER WITH ID
userRouter.get("/:id", (request, response, next) => {
  User.findById(request.params.id)
    .then(user => {
      if (user) {
        response.json(user.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// HTTP POST NEW USER
userRouter.post("/", (request, response, next) => {
  const body = request.body;

  //password -> hash password -> save passwordHashed to database
  const user = new User({
    email: body.email,
    username: body.username,
    passwordHashed: body.passwordHashed
  });

  user
    .save()
    .then(savedUser => {
      response.json(savedUser.toJSON());
    })
    .catch(error => next(error));
});

// HTTP UPDATE USER WITH ID
userRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const user = {
    email: body.email,
    username: body.username,
    passwordHashed: body.passwordHashed
  };

  User.findByIdAndUpdate(request.params.id, user, { new: true })
    .then(updatedUser => {
      response.json(updatedUser.toJSON());
    })
    .catch(error => next(error));
});

// HTTP DELETE USER WITH ID
userRouter.delete("/:id", (request, response, next) => {
  User.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = userRouter;
