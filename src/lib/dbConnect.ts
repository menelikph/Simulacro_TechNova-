import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let isConnected = false; 

const dbConnection = async (): Promise<void> => { 
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = !!db.connections[0].readyState; 

    console.log("Database connected successfully");
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection error");
  }
};

export default dbConnection;
