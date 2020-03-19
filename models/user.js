import { Schema, model } from "mongoose";
import ResourceMarker from "./resourceMarker";

const userSchema = new Schema({
  // mongoose creates an _id property by default
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: Date,
  addedResourceMarkers: {type: ResourceMarker, []}
});

const User = model("User", userSchema);

export default User;
