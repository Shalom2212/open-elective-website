import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
  const subjects = await prisma.subjects.findMany();
  return NextResponse.json(subjects);
}
