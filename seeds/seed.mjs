import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.subjects.createMany({
    data: [
      {
        subjectName: "Introduction to Cyber Security",
        subjectCode: "21CS653",
        faculty: "Dr.Chethan L S",
        branch: "CSE",
        seats: 60,
        code: "CS",
      },
      {
        subjectName: "Introduction to Data Structures",
        subjectCode: "21CS651",
        faculty: "Dr.Arjun U",
        branch: "CSE",
        seats: 60,
        code: "CS",
      },
      {
        subjectName: "Renewable Energy Power Plants",
        subjectCode: "21ME652",
        faculty: "Dr.Preetham B M",
        branch: "ME",
        seats: 60,
        code: "ME",
      },
      {
        subjectName: "Introduction to Data Structures",
        subjectCode: "21CS651",
        faculty: "Dr.Likewin Thomas",
        branch: "AIML",
        seats: 60,
        code: "CS",
      },
      {
        subjectName: "Renewable Energy Resources",
        subjectCode: "21EE652",
        faculty: "Mrs.Neetha H M",
        branch: "EEE",
        seats: 60,
        code: "EE",
      },
      {
        subjectName: "Renewable Energy Resources",
        subjectCode: "21EE653",
        faculty: "Mrs.Shruthi S",
        branch: "EEE",
        seats: 60,
        code: "EE",
      },
      {
        subjectName: "Communication Engineering(CE)",
        subjectCode: "21EC651",
        faculty: "Ms.S R ShreeLakshmi Nayaka",
        branch: "ECE",
        seats: 60,
        code: "EC",
      },
      {
        subjectName: "Basic VLSI Design",
        subjectCode: "21EC654",
        faculty: "Mrs.Chethan B R",
        branch: "ECE",
        seats: 60,
        code: "EC",
      },
      {
        subjectName: "Remote Sensing and GIS",
        subjectCode: "21CV651",
        faculty: "Mrs.Divya H A",
        branch: "CV",
        seats: 60,
        code: "CV",
      },
      {
        subjectName: "Introduction to Data Structures",
        subjectCode: "21CS651",
        faculty: "Mr. Madesh",
        branch: "ISE",
        seats: 60,
        code: "CS",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
