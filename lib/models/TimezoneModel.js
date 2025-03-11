import mongoose from "mongoose"

const TimezoneSchema = new mongoose.Schema({
  zone: { type: String, required: true },
  abbreviation: { type: String, required: true },
  offset: { type: String, required: true },
})

export const Timezone =
  mongoose.models.Timezone || mongoose.model("Timezone", TimezoneSchema)
