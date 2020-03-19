import { Schema, model } from "mongoose";

const natureResourceSchema = new Schema({
  // mongoose creates an _id property by default
  name: { fi: String, en: String, sw: String },
  category: { type: String, enum: ["Berries", "Mushrooms", "Greens"] },
  iconUrl: { type: String, default: "" },
  harvestSeason: { start: String, end: String }
});

const NatureResource = model("NatureResource", natureResourceSchema);

export default NatureResource;
