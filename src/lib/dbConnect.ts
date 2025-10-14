/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Check if the environment variable is defined
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

// Use a global object to cache the connection across Next.js reloads
const cached = global as typeof global & { mongoose: { conn: any | null, promise: any | null } }; //conn is connection, promise is the connection promise

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

/**
 * Establishes connection to MongoDB or reuses cached connection.
 */
async function dbConnect() {
  // 1. Return cached connection if available
  if (cached.mongoose.conn) {
    console.log('DB already connected (cached)');
    return cached.mongoose.conn;
  }

  // 2. If no promise is running, start a new connection
  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false, // Recommended setting for Next.js
    };

    cached.mongoose.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('DB Online (new connection)');
      return mongooseInstance;
    });
  }

  // 3. Wait for the promise to resolve and cache the connection
  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}

export default dbConnect;