const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const usersRouter = require("./controllers/users");
const natureResourcesRouter = require("./controllers/natureResources");
const resourceMarkersRouter = require("./controllers/resourceMarkers");

const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

console.log("connecting to,", config.MONGODB_URI);

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

app.use("/api/resourceMarkers", resourceMarkersRouter);
app.use("/api/users", usersRouter);
app.use("/api/natureResources", natureResourcesRouter);

module.exports = app;
