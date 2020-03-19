const mongoose = require("mongoose");

const natureResourceSchema = new mongoose.Schema({});

const NatureResource = mongoose.model("NatureResource", natureResourceSchema);

export default NatureResource;
