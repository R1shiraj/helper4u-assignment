// Step 3: API Endpoints (backend/api)
// jobs.js - Handle job-related operations
// import connectDB from '@/backend/utils/db';
// import Job from '@/backend/models/Job';

import Job from "@/models/Job";
import connectDB from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, location, salary, contactEmail } = await request.json();
  await connectDB();
  await Job.create({ title, description, location, salary, contactEmail });
  return NextResponse.json({ message: "Job added" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const jobs = await Job.find();
  return NextResponse.json({ jobs });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Job.findByIdAndDelete(id);
  return NextResponse.json({ message: "Job deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { title, description, location, salary, contactEmail } = await request.json();
  await connectDB();
  await Job.findByIdAndUpdate(id, { title, description, location, salary, contactEmail });
  return NextResponse.json({ message: "Job updated" }, { status: 200 });
}