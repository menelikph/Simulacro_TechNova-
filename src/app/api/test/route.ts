
import dbConnection from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnection();
    return NextResponse.json({ message: "MongoDB connected successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
  }
}
