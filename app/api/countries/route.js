import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()

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
      let countryCode = country.code ?? null
      let countryName = country.name

      if (!countryName) {
        console.warn(`⚠️ Skipping invalid country: ${JSON.stringify(country)}`)
        failedCount++
        continue
      }

      try {
        await prisma.country.upsert({
          where: { name: countryName },
          update: {
            code: countryCode, // ✅ Now, it's safe to be null
            flag: country.flag,
            lastUpdated: new Date(),
          },
          create: {
            name: countryName,
            code: countryCode,
            flag: country.flag,
            lastUpdated: new Date(),
          },
        })
        console.log(`✅ Inserted: ${countryName} (${countryCode})`)
        insertedCount++
      } catch (err) {
        console.error(
          `❌ Failed to insert country: ${countryName} (${countryCode}) - ${err.message}`
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
