require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let TOKEN = process.env.TOKEN;

if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  PORT = process.env.DEV_PORT;
}

module.exports = {
  PORT,
  MONGODB_URI,
  TOKEN,
};
