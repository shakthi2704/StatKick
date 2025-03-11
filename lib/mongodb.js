import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI // Store this in .env.local

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  // Check if there is already a connection
  if (cached.conn) {
    return cached.conn
  }

  // If there is no cached connection, create one
  if (!cached.promise) {
    // Add dbName: "football" to specify the database explicitly
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "football" }) // Add dbName: "football"
      .then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
