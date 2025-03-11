import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    console.log("MongoDB connected successfully!")

    return NextResponse.json({
      message: "MongoDB connected successfully!",
    })
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    )
  }
}
