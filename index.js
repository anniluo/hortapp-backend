const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
