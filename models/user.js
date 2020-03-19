import { Schema, model } from "mongoose";
import ResourceMarker from "./resourceMarker";

const userSchema = new Schema({
  // mongoose creates an _id property by default
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  addedResourceMarkers: [ResourceMarker]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const User = model("User", userSchema);

export default User;
