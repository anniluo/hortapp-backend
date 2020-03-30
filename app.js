const logger = require("./utils/logger");
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

logger.info("libraries imported");

const usersRouter = require("./controllers/users");

logger.info("userRouter imported");

const natureResourcesRouter = require("./controllers/natureResources");
const resourceMarkersRouter = require("./controllers/resourceMarkers");
const loginRouter = require("./controllers/login");
const signupRouter = require("./controllers/signup");

const middleware = require("./utils/middleware");

logger.info("middlewares imported");

const mongoose = require("mongoose");

logger.info("connecting to,", config.MONGODB_URI);

mongoose.set("useFindAndModify", false);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error occured when connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

<<<<<<< HEAD
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/api/resourceMarkers", resourceMarkersRouter);
=======
>>>>>>> middleware
app.use("/api/users", usersRouter);
app.use("/api/resourceMarkers", resourceMarkersRouter);
app.use("/api/natureResources", natureResourcesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
