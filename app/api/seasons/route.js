import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()
const REVALIDATE_TIME = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function GET() {
  console.log("GET function is being executed...")

  try {
    // Try fetching the latest season entry from the database first
    const latestSeason = await prisma.season.findFirst({
      orderBy: { last_updated: "desc" },
    })

    // If there is a recent entry (within the last 7 days), return from DB
    if (
      latestSeason &&
      new Date().getTime() - new Date(latestSeason.last_updated).getTime() <
        REVALIDATE_TIME
    ) {
      console.log("Data fetched from the database!")
      return NextResponse.json({ seasons: await prisma.season.findMany() })
    }

    // If no data in DB or it's outdated, fetch from the API
    console.log("Fetching data from the API...")
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/leagues/seasons",
      headers: {
        "x-rapidapi-key": process.env.NEXT_RAPIDAPI_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    }

    const response = await axios.request(options)
    const seasons = response.data.response

    console.log("Fetched seasons from the API:", seasons)

    // If no seasons are found, return an error response
    if (!seasons || seasons.length === 0) {
      return NextResponse.json(
        { error: "No seasons found in the API response" },
        { status: 500 }
      )
    }

    // Store data in DB - Refresh all records
    console.log("Storing seasons in the database...")
    await prisma.season.deleteMany() // ✅ Keep only one deleteMany()

    // Store the new seasons in the database
    await prisma.season.createMany({
      data: seasons.map((season) => ({
        year: season,
        last_updated: new Date(),
      })),
    })

    console.log("Seasons stored successfully in the database!")

    // Return the updated data
    return NextResponse.json({ seasons })
  } catch (error) {
    console.error("Error fetching seasons:", error)
    return NextResponse.json(
      { error: "Failed to fetch seasons" },
      { status: 500 }
    )
  }
}
