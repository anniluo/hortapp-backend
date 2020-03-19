import { Schema, model } from "mongoose";

const natureResourceSchema = new Schema({
  // mongoose creates an _id property by default
  name: { fi: String, en: String, sw: String },
  category: { type: String, enum: ["Berries", "Mushrooms", "Greens"] },
  iconUrl: { type: String, default: "" },
  harvestSeason: { start: String, end: String }
});

natureResourceSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const NatureResource = model("NatureResource", natureResourceSchema);

export default NatureResource;
