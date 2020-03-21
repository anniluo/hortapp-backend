const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // mongoose creates an _id property by default
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHashed: String,
  date: { type: Date, default: Date.now },
  resourceMarkers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ResourceMarker", default: [] }
  ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
