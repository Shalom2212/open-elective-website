import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req, context) {
  const { params } = context;

  let codeid = params.codeid;
  console.log(codeid);
  if (
    codeid == "AI" ||
    codeid == "CS" ||
    codeid == "IS" ||
    codeid == "ai" ||
    codeid == "cs" ||
    codeid == "is"
  ) {
    codeid = "CS";
  }

  const subjects = await prisma.subjects.findMany({
    where: { NOT: { code: codeid } },
  });
  return NextResponse.json(subjects);
}
