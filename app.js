const logger = require("./utils/logger");
const config = require("./utils/config");
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const app = express();

const usersRouter = require("./controllers/users");
const natureResourcesRouter = require("./controllers/natureResources");
const resourceMarkersRouter = require("./controllers/resourceMarkers");
const loginRouter = require("./controllers/login");
const signupRouter = require("./controllers/signup");

const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error occured when connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(helmet());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/resourceMarkers", resourceMarkersRouter);
app.use("/api/users", usersRouter);
app.use("/api/resourceMarkers", resourceMarkersRouter);
app.use("/api/natureResources", natureResourcesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
