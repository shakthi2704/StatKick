import mongoose from "mongoose"

const TimezoneSchema = new mongoose.Schema({
  zone: { type: String, required: true }, // e.g., Asia/Colombo
  abbreviation: { type: String, required: true }, // e.g., IST
  offset: { type: String, required: true }, // e.g., UTC+5:30
})

export const Timezone =
  mongoose.models.Timezone || mongoose.model("Timezone", TimezoneSchema)
