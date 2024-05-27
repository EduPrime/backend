import { PrismaClient, AttendanceStatus, DayOfWeek } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedGrade() {
  // Get some existing data to link
  const students = await prisma.student.findMany()
  const disciplines = await prisma.discipline.findMany()
  const timetables = await prisma.timetable.findMany()
  const schools = await prisma.school.findMany()

  if (
    students.length === 0 ||
    disciplines.length === 0 ||
    timetables.length === 0 ||
    schools.length === 0
  ) {
    console.error(
      'Required data is missing, please ensure the previous seed has run correctly.',
    )
    return
  }

  // Create Attendance records
  const attendanceData = students.map((student) => ({
    date: new Date(),
    studentId: student.id,
    status: AttendanceStatus.PRESENT,
  }))

  await prisma.attendance.createMany({
    data: attendanceData,
  })

  // Create Grade records
  const gradeData = students.map((student) => ({
    value: Math.floor(Math.random() * 100),
    date: new Date(),
    studentId: student.id,
    disciplineId:
      disciplines[Math.floor(Math.random() * disciplines.length)].id,
  }))

  await prisma.grade.createMany({
    data: gradeData,
  })

  // Create TimetableSchool records
  const timetableSchoolData = timetables.flatMap((timetable) =>
    schools.map((school) => ({
      timetableId: timetable.id,
      schoolId: school.id,
    })),
  )

  await prisma.timetableSchool.createMany({
    data: timetableSchoolData,
  })

  console.log('Seeded Attendance, Grade, and TimetableSchool data.')
}
