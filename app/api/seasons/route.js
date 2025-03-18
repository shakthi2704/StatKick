import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()
const REVALIDATE_TIME = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function GET() {
  console.log("GET function is being executed...")

  try {
    // Fetch the latest season entry
    const latestSeason = await prisma.season.findFirst({
      orderBy: { lastUpdated: "desc" }, // ✅ Use camelCase, not snake_case
    })

    if (
      latestSeason &&
      new Date().getTime() - new Date(latestSeason.lastUpdated).getTime() <
        REVALIDATE_TIME
    ) {
      console.log("Data fetched from the database!")
      return NextResponse.json({ seasons: await prisma.season.findMany() })
    }

    // Fetch from API
    console.log("Fetching data from API...")
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/leagues/seasons",
      {
        headers: {
          "x-rapidapi-key": process.env.NEXT_RAPIDAPI_KEY,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    )

    const seasons = response.data.response

    if (!seasons || seasons.length === 0) {
      return NextResponse.json(
        { error: "No seasons found in API response" },
        { status: 500 }
      )
    }

    console.log(`Fetched ${seasons.length} seasons from API.`)

    // **Upsert data instead of deleting everything**
    for (const season of seasons) {
      await prisma.season.upsert({
        where: { year: season }, // ✅ Check if season exists
        update: { lastUpdated: new Date() }, // ✅ Update timestamp
        create: { year: season, lastUpdated: new Date() }, // ✅ Insert if missing
      })
    }

    console.log("Seasons updated successfully!")

    return NextResponse.json({ seasons })
  } catch (error) {
    console.error("Error fetching seasons:", error)
    return NextResponse.json(
      { error: "Failed to fetch seasons" },
      { status: 500 }
    )
  }
}
