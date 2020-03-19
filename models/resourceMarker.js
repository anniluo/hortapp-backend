import { Schema, model } from "mongoose";
import NatureResource from "./natureResource";

const resourceMarkerSchema = new Schema({
  // mongoose creates an _id property by default
  latLng: { type: { latitude: String, longitude: String }, required: true },
  locationName: String,
  date: { type: Date, default: Date.now },
  addedByUser: String, //reference to user
  comment: { type: String, required: false }, //optional
  natureResource: [NatureResource]
});

resourceMarkerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const ResourceMarker = model("ResourceMarker", resourceMarkerSchema);

export default ResourceMarker;
