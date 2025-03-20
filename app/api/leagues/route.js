import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()
const REVALIDATE_TIME = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function GET() {
  console.log("✅ API Route /api/leagues is being hit!")

  try {
    console.log("GET function is being executed...")

    console.log("🔍 Preparing to fetch data from API...")
    console.log(
      "🔑 API Key Loaded:",
      process.env.NEXT_RAPIDAPI_KEY ? "Yes" : "No"
    )

    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/leagues",
      {
        headers: {
          "x-rapidapi-key": process.env.NEXT_RAPIDAPI_KEY,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    )

    console.log("🌍 API Response Status:", response.status)
    const leagues = response.data.response

    if (!leagues || leagues.length === 0) {
      console.log("❌ No leagues found in API response.")
      return NextResponse.json(
        { error: "No leagues found in API response" },
        { status: 500 }
      )
    }

    console.log(`✅ Fetched ${leagues.length} leagues from API.`)

    let insertedCount = 0
    let failedCount = 0

    for (const league of leagues) {
      try {
        console.log(`🛠️ Upserting league: ${league.league.name}`)

        const countryName = league.country?.name ?? "WORLD"
        const countryCode = league.country?.code ?? null
        const countryFlag = league.country?.flag ?? null

        const country = await prisma.country.upsert({
          where: { name: countryName },
          update: {},
          create: {
            name: countryName,
            code: countryCode,
            flag: countryFlag,
          },
        })

        await prisma.league.upsert({
          where: { leagueId: league.league.id },
          update: {
            name: league.league.name,
            countryId: country.id,
            type: league.league.type ?? "Unknown",
            logo: league.league.logo ?? null,
            lastUpdated: new Date(),
          },
          create: {
            leagueId: league.league.id,
            name: league.league.name,
            countryId: country.id,
            type: league.league.type ?? "Unknown",
            logo: league.league.logo ?? null,
            lastUpdated: new Date(),
          },
        })

        insertedCount++
      } catch (err) {
        console.error(
          `❌ Failed to insert/update league: ${league.league.name} - ${err.message}`
        )
        failedCount++
      }
    }

    console.log(
      `✅ Leagues updated successfully! Inserted: ${insertedCount}, Failed: ${failedCount}`
    )

    return NextResponse.json({ insertedCount, failedCount, leagues })
  } catch (error) {
    console.error("❌ Error fetching leagues:", error)
    return NextResponse.json(
      { error: "Failed to fetch leagues", details: error.message },
      { status: 500 }
    )
  }
}
