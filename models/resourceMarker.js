const mongoose = require("mongoose");
const NatureResourceSchema = require("./natureResource").natureResourceSchema;

const resourceMarkerSchema = new mongoose.Schema({
  latLng: { type: { latitude: String, longitude: String } },
  locationName: String,
  date: { type: Date, default: Date.now },
  addedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: false },
  natureResource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NatureResource"
  }
});

resourceMarkerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const ResourceMarker = mongoose.model("ResourceMarker", resourceMarkerSchema);

module.exports = ResourceMarker;
