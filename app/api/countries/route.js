import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Fetching fresh country data from API
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

    if (!countries || countries.length === 0) {
      return NextResponse.json(
        { error: "No countries found in API response" },
        { status: 500 }
      )
    }

    // Deleting all old country records
    await prisma.country.deleteMany()

    let insertedCount = 0
    let failedCount = 0

    // Inserting new country data
    for (const country of countries) {
      let countryCode = country.code ?? "WORLD" // 👈 Fallback to "WORLD"
      let countryName = country.name

      if (!countryName) {
        failedCount++
        continue
      }

      try {
        await prisma.country.upsert({
          where: { name: countryName },
          update: {
            code: countryCode, // Safe to be "WORLD"
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
        insertedCount++
      } catch (err) {
        console.error(
          `❌ Failed to insert country: ${countryName} (${countryCode}) - ${err.message}`
        )
        failedCount++
      }
    }

    const finalCount = await prisma.country.count()

    // Returning the inserted and failed count along with the final country count
    return NextResponse.json({
      insertedCount,
      failedCount,
      finalCount,
      countries,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch countries", details: error.message },
      { status: 500 }
    )
  }
}
