import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Timezone } from "@/models/Timezone"

export async function GET() {
  try {
    await connectDB()
    const timezones = await Timezone.find()
    return NextResponse.json(timezones)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch timezones" },
      { status: 500 }
    )
  }
}
