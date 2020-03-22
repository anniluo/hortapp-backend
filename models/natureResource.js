const mongoose = require("mongoose");

const natureResourceSchema = new mongoose.Schema({
  name: { type: { fi: String, en: String } },
  category: {
    type: String,
    enum: ["Berries", "Mushrooms", "Greens", "Fruits"]
  },
  iconUrl: { type: String, default: "" },
  harvestSeason: { type: { start: String, end: String } }
});

natureResourceSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const NatureResource = mongoose.model("NatureResource", natureResourceSchema);

module.exports = { NatureResource, natureResourceSchema };
