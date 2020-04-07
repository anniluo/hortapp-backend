const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHashed: String,
  date: { type: Date, default: Date.now },
  resourceMarkers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ResourceMarker" },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
