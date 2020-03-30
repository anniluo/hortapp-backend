const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const usersRouter = require("./controllers/users");
const natureResourcesRouter = require("./controllers/natureResources");
const resourceMarkersRouter = require("./controllers/resourceMarkers");
const loginRouter = require("./controllers/login");
const signupRouter = require("./controllers/signup");

const mongoose = require("mongoose");

console.log("connecting to,", config.MONGODB_URI);

mongoose.set("useFindAndModify", false);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error occured when connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/api/resourceMarkers", resourceMarkersRouter);
app.use("/api/users", usersRouter);
app.use("/api/natureResources", natureResourcesRouter);

module.exports = app;
