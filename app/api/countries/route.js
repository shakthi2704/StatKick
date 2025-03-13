// app/api/countries/route.js
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()
const REVALIDATE_TIME = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function GET() {
  console.log("GET function is being executed...")

  try {
    // Try fetching the latest country entry from the database first
    const latestCountry = await prisma.country.findFirst({
      orderBy: { last_updated: "desc" },
    })

    // If there is a recent entry (within the last 7 days), return from DB
    if (
      latestCountry &&
      new Date().getTime() - new Date(latestCountry.last_updated).getTime() <
        REVALIDATE_TIME
    ) {
      console.log("Data fetched from the database!")
      return NextResponse.json({ countries: await prisma.country.findMany() })
    }

    // If no data in DB or it's outdated, fetch from the API
    console.log("Fetching data from the API...")
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/countries",
      headers: {
        "x-rapidapi-key": process.env.NEXT_RAPIDAPI_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    }

    const response = await axios.request(options)
    const countries = response.data.response

    console.log("Fetched countries from the API:", countries)

    // If no countries are found, return an error response
    if (!countries || countries.length === 0) {
      return NextResponse.json(
        { error: "No countries found in the API response" },
        { status: 500 }
      )
    }

    // Store data in DB - Check if the data needs to be refreshed or updated
    console.log("Storing countries in the database...")
    await prisma.country.deleteMany() // Optionally keep this or update based on condition

    // Store the new countries in the database
    await prisma.country.createMany({
      data: countries.map((country) => ({
        name: country.name,
        code: country.code,
        flag: country.flag,
        last_updated: new Date(),
      })),
    })

    return NextResponse.json({ countries })
  } catch (error) {
    console.error("Error fetching countries:", error)
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    )
  }
}
