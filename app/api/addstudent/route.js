import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req) {
  const data = await req.json();

  const subjectdata = await prisma.subjects.findFirst({
    where: { id: data.sid },
  });

  const eusn = await prisma.students.findFirst({
    where: { usn: data.usn },
  });

  if (subjectdata.seats <= 0) {
    return NextResponse.json({ CODE: 401 });
  }
  if (eusn) {
    return NextResponse.json({ CODE: 400 });
  }
  const result = await prisma.students.create({
    data: {
      branch: data.branch,
      email: data.email,
      faculty: subjectdata.faculty,
      name: data.name,
      phone: data.phone,
      subjectCode: subjectdata.subjectCode,
      subjectName: subjectdata.subjectName,
      usn: data.usn,
    },
  });

  await prisma.subjects.update({
    where: { id: data.sid },
    data: {
      seats: subjectdata.seats - 1,
    },
  });

  return NextResponse.json(result);
}

export async function GET() {
  const data = await prisma.students.findMany();
  return NextResponse.json(data);
}
