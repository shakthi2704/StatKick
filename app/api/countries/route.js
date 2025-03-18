import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()
const REVALIDATE_TIME = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function GET() {
  console.log("🟢 GET function is being executed...")

  try {
    console.log("🌍 Fetching fresh country data from API...")
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/countries",
      {
        headers: {
          "x-rapidapi-key": process.env.NEXT_RAPIDAPI_KEY,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    )

    const countries = response.data.response
    console.log(`🚀 API returned ${countries.length} countries`)

    if (!countries || countries.length === 0) {
      console.error("❌ No countries found in API response")
      return NextResponse.json(
        { error: "No countries found in API response" },
        { status: 500 }
      )
    }

    console.log("🗑️ Deleting all old country records...")
    await prisma.country.deleteMany()

    let insertedCount = 0
    let failedCount = 0

    console.log("💾 Inserting new country data...")
    for (const country of countries) {
      let countryCode = country.code || "WORLD" // Assign "WORLD" if null

      if (!country.name) {
        console.warn(`⚠️ Skipping invalid country: ${JSON.stringify(country)}`)
        failedCount++
        continue
      }

      try {
        await prisma.country.upsert({
          where: { code: countryCode },
          update: {
            name: country.name,
            flag: country.flag,
            lastUpdated: new Date(),
          },
          create: {
            name: country.name,
            code: countryCode,
            flag: country.flag,
            lastUpdated: new Date(),
          },
        })
        console.log(`✅ Inserted: ${country.name} (${countryCode})`)
        insertedCount++
      } catch (err) {
        console.error(
          `❌ Failed to insert country: ${country.name} (${countryCode}) - ${err.message}`
        )
        failedCount++
      }
    }

    const finalCount = await prisma.country.count()
    console.log(
      `📊 Inserted: ${insertedCount}, ❌ Failed: ${failedCount} countries`
    )
    console.log(`📌 Final count in DB: ${finalCount} countries`)

    return NextResponse.json({ countries })
  } catch (error) {
    console.error("❌ Error fetching countries:", error)
    return NextResponse.json(
      { error: "Failed to fetch countries", details: error.message },
      { status: 500 }
    )
  }
}
