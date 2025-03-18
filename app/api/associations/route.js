import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const associations = await prisma.football_associations.findMany()
    return NextResponse.json(associations, { status: 200 })
  } catch (error) {
    console.error("Error fetching associations:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
