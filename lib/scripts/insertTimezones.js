import { connectDB } from "@/lib/mongodb"
import { Timezone } from "@/models/Timezone"

const timezones = [
  { zone: "Baker Island Time", abbreviation: "BIT", offset: "UTC−12:00" },
  { zone: "Samoa Standard Time", abbreviation: "SST", offset: "UTC−11:00" },
  {
    zone: "Hawaii-Aleutian Standard Time",
    abbreviation: "HST",
    offset: "UTC−10:00",
  },
  { zone: "Alaska Standard Time", abbreviation: "AKST", offset: "UTC−9:00" },
  { zone: "Pacific Standard Time", abbreviation: "PST", offset: "UTC−8:00" },
  { zone: "Mountain Standard Time", abbreviation: "MST", offset: "UTC−7:00" },
  { zone: "Central Standard Time", abbreviation: "CST", offset: "UTC−6:00" },
  { zone: "Eastern Standard Time", abbreviation: "EST", offset: "UTC−5:00" },
  { zone: "Atlantic Standard Time", abbreviation: "AST", offset: "UTC−4:00" },
  { zone: "Brasília Time", abbreviation: "BRT", offset: "UTC−3:00" },
  { zone: "Fernando de Noronha Time", abbreviation: "FNT", offset: "UTC−2:00" },
  { zone: "Cape Verde Time", abbreviation: "CVT", offset: "UTC−1:00" },
  {
    zone: "Greenwich Mean Time / Western European Time",
    abbreviation: "GMT / WET",
    offset: "UTC±0:00",
  },
  { zone: "Central European Time", abbreviation: "CET", offset: "UTC+1:00" },
  { zone: "Eastern European Time", abbreviation: "EET", offset: "UTC+2:00" },
  {
    zone: "Moscow Standard Time / East Africa Time",
    abbreviation: "MSK / EAT",
    offset: "UTC+3:00",
  },
  { zone: "Gulf Standard Time", abbreviation: "GST", offset: "UTC+4:00" },
  { zone: "Pakistan Standard Time", abbreviation: "PKT", offset: "UTC+5:00" },
  { zone: "Bangladesh Standard Time", abbreviation: "BST", offset: "UTC+6:00" },
  { zone: "Indochina Time", abbreviation: "ICT", offset: "UTC+7:00" },
  { zone: "China Standard Time", abbreviation: "CST", offset: "UTC+8:00" },
  { zone: "Japan Standard Time", abbreviation: "JST", offset: "UTC+9:00" },
  {
    zone: "Australian Eastern Standard Time",
    abbreviation: "AEST",
    offset: "UTC+10:00",
  },
  { zone: "Solomon Islands Time", abbreviation: "SBT", offset: "UTC+11:00" },
  {
    zone: "New Zealand Standard Time",
    abbreviation: "NZST",
    offset: "UTC+12:00",
  },
]

async function insertTimezones() {
  await connectDB()
  await Timezone.insertMany(timezones)
  console.log("✅ Timezones added successfully!")
  process.exit()
}

insertTimezones()
