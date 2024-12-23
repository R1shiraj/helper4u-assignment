// applications.js - Handle application-related operations
import Application from "@/models/Application";
import connectDB from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { jobId, name, contactEmail: contact } = await request.json();
    await connectDB();
    await Application.create({ jobId, name, contact });
    return NextResponse.json({ message: "Application sent" }, { status: 201 });
  }