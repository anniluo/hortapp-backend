const mongoose = require("mongoose");

const resourceMarkerSchema = new mongoose.Schema({
  id: String,
  latLng: { latitude: String, longitude: String },
  locationName: String,
  date: Date,
  //addedByUser: User,
  comment: String //optional,
  //natureResource: NatureResource,
});

const ResourceMarker = mongoose.model("ResourceMarker", resourceMarkerSchema);

export default ResourceMarker;
