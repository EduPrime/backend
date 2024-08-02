import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedInstitution() {
  let institution = await prisma.institution.findFirst({
    where: { name: 'Instituição Educacional Alfa' },
  })

  if (!institution) {
    institution = await prisma.institution.create({
      data: {
        name: 'Instituição Educacional Alfa',
        address: 'Rua Principal, 123',
        city: 'Cidade Alfa',
        state: 'Estado Alfa',
        postalCode: '12345-678',
        phone: '(11) 1234-5678',
      },
    })
  }

  let school1 = await prisma.school.findFirst({
    where: { name: 'Escola Fundamental Alfa' },
  })

  if (!school1) {
    school1 = await prisma.school.create({
      data: {
        name: 'Escola Fundamental Alfa',
        address: 'Avenida Secundária, 456',
        city: 'Cidade Alfa',
        state: 'Estado Alfa',
        postalCode: '12345-678',
        phone: '(11) 8765-4321',
        institutionId: institution.id,
        active: true,
        abbreviation: 'EFA',
        longitude: '-46.6333',
        latitude: '-23.5505',
        totalArea: '5000',
        builtArea: '3000',
        availableArea: '2000',
        acronym: 'EFA',
        blockDiaryEntriesForClosedAcademicYears: false,
        operationalStatus: 1,
        administrativeDependency: 3,
        regulation: 1,
        logoUrl: 'https://example.com/logo1.png',
        access: 1,
        managerId: '1d3e4567-e89b-12d3-a456-426614174001',
        managerPosition: 'Principal',
        operationLocation: 'Urban',
        condition: 1,
        sharedSchoolInepCode: 12345678,
        creationDecree: 'Decreto 1234',
        numberOfFloors: 2,
        floorType: 1,
        energyMeter: 1,
        waterConsumed: 10000,
        hasPrincipalOffice: true,
        hasTeachersRoom: true,
        hasSecretaryOffice: true,
        hasComputerLab: true,
        hasScienceLab: true,
        hasAEERoom: false,
        hasCoveredCourt: true,
        hasUncoveredCourt: false,
        hasKitchen: true,
        hasLibrary: true,
        hasReadingRoom: true,
        hasPlayground: true,
        hasNursery: false,
        hasRestroomOutside: false,
        hasRestroomInside: true,
        hasChildRestroom: true,
        hasAccessibleRestroom: true,
        hasShower: false,
        hasCafeteria: true,
        hasPantry: true,
        hasAuditorium: false,
        hasPatio: true,
        hasGreenArea: true,
        hasPERoom: true,
        hasArtsRoom: false,
        hasStudentDormitory: false,
        hasTeacherDormitory: false,
        hasExternalArea: true,
        hasMultipurposeRoom: true,
      },
    })
  }

  let school2 = await prisma.school.findFirst({
    where: { name: 'Colégio Beta' },
  })

  if (!school2) {
    school2 = await prisma.school.create({
      data: {
        name: 'Colégio Beta',
        address: 'Rua Terciária, 789',
        city: 'Cidade Beta',
        state: 'Estado Beta',
        postalCode: '98765-432',
        phone: '(21) 2345-6789',
        institutionId: institution.id,
        active: true,
        abbreviation: 'CB',
        longitude: '-43.2075',
        latitude: '-22.9028',
        totalArea: '7000',
        builtArea: '4500',
        availableArea: '2500',
        acronym: 'CB',
        blockDiaryEntriesForClosedAcademicYears: true,
        operationalStatus: 1,
        administrativeDependency: 3,
        regulation: 1,
        logoUrl: 'https://example.com/logo2.png',
        access: 1,
        managerId: '1d3e4567-e89b-12d3-a456-426614174002',
        managerPosition: 'Principal',
        operationLocation: 'Urban',
        condition: 1,
        sharedSchoolInepCode: 87654321,
        creationDecree: 'Decreto 5678',
        numberOfFloors: 3,
        floorType: 2,
        energyMeter: 2,
        waterConsumed: 15000,
        hasPrincipalOffice: true,
        hasTeachersRoom: true,
        hasSecretaryOffice: true,
        hasComputerLab: true,
        hasScienceLab: true,
        hasAEERoom: true,
        hasCoveredCourt: true,
        hasUncoveredCourt: true,
        hasKitchen: true,
        hasLibrary: true,
        hasReadingRoom: true,
        hasPlayground: true,
        hasNursery: true,
        hasRestroomOutside: true,
        hasRestroomInside: true,
        hasChildRestroom: true,
        hasAccessibleRestroom: true,
        hasShower: true,
        hasCafeteria: true,
        hasPantry: true,
        hasAuditorium: true,
        hasPatio: true,
        hasGreenArea: true,
        hasPERoom: true,
        hasArtsRoom: true,
        hasStudentDormitory: true,
        hasTeacherDormitory: true,
        hasExternalArea: true,
        hasMultipurposeRoom: true,
      },
    })
  }

  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Ensino Fundamental I',
      schoolId: school1.id,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      name: 'Ensino Médio',
      schoolId: school2.id,
    },
  })

  // Create Series
  const series1 = await prisma.series.create({
    data: {
      name: '1º Ano',
      courseId: course1.id,
    },
  })

  const series2 = await prisma.series.create({
    data: {
      name: '2º Ano',
      courseId: course2.id,
    },
  })

  // Create Classrooms
  const classroom1 = await prisma.classroom.create({
    data: {
      name: 'Turma A',
      period: 'MORNING',
      seriesId: series1.id,
    },
  })

  const classroom2 = await prisma.classroom.create({
    data: {
      name: 'Turma B',
      period: 'AFTERNOON',
      seriesId: series1.id,
    },
  })

  const classroom3 = await prisma.classroom.create({
    data: {
      name: 'Turma C',
      period: 'EVENING',
      seriesId: series2.id,
    },
  })

  // Create Students
  await prisma.student.createMany({
    data: [
      {
        name: 'Ana Silva',
        email: 'ana.silva@example.com',
        classroomId: classroom1.id,
      },
      {
        name: 'Bruno Souza',
        email: 'bruno.souza@example.com',
        classroomId: classroom1.id,
      },
      {
        name: 'Carla Mendes',
        email: 'carla.mendes@example.com',
        classroomId: classroom2.id,
      },
      {
        name: 'Daniel Oliveira',
        email: 'daniel.oliveira@example.com',
        classroomId: classroom2.id,
      },
      {
        name: 'Elaine Costa',
        email: 'elaine.costa@example.com',
        classroomId: classroom3.id,
      },
      {
        name: 'Felipe Lima',
        email: 'felipe.lima@example.com',
        classroomId: classroom3.id,
      },
    ],
  })

  // Create Teachers
  const teacher1 = await prisma.teacher.create({
    data: {
      name: 'Prof. João Pereira',
      email: 'joao.pereira@example.com',
      schoolId: school1.id,
    },
  })

  const teacher2 = await prisma.teacher.create({
    data: {
      name: 'Profª. Maria Fernandes',
      email: 'maria.fernandes@example.com',
      schoolId: school1.id,
    },
  })

  const teacher3 = await prisma.teacher.create({
    data: {
      name: 'Prof. Paulo Santos',
      email: 'paulo.santos@example.com',
      schoolId: school2.id,
    },
  })

  const teacher4 = await prisma.teacher.create({
    data: {
      name: 'Profª. Rita Oliveira',
      email: 'rita.oliveira@example.com',
      schoolId: school2.id,
    },
  })

  // Create Disciplines
  const math = await prisma.discipline.create({
    data: {
      name: 'Matemática',
      teacherId: teacher1.id,
    },
  })

  const science = await prisma.discipline.create({
    data: {
      name: 'Ciências',
      teacherId: teacher2.id,
    },
  })

  const history = await prisma.discipline.create({
    data: {
      name: 'História',
      teacherId: teacher3.id,
    },
  })

  const geography = await prisma.discipline.create({
    data: {
      name: 'Geografia',
      teacherId: teacher4.id,
    },
  })

  // Create Timetables
  const timetable1 = await prisma.timetable.create({
    data: {
      name: 'Horário da Turma A',
      classroomId: classroom1.id,
      teachers: {
        connect: [{ id: teacher1.id }, { id: teacher2.id }],
      },
      classSessions: {
        create: [
          {
            dayOfWeek: 'MONDAY',
            startTime: '08:00',
            endTime: '09:00',
            disciplineId: math.id,
          },
          {
            dayOfWeek: 'TUESDAY',
            startTime: '09:00',
            endTime: '10:00',
            disciplineId: science.id,
          },
        ],
      },
    },
  })

  const timetable2 = await prisma.timetable.create({
    data: {
      name: 'Horário da Turma B',
      classroomId: classroom2.id,
      teachers: {
        connect: [{ id: teacher1.id }, { id: teacher2.id }],
      },
      classSessions: {
        create: [
          {
            dayOfWeek: 'WEDNESDAY',
            startTime: '08:00',
            endTime: '09:00',
            disciplineId: math.id,
          },
          {
            dayOfWeek: 'THURSDAY',
            startTime: '09:00',
            endTime: '10:00',
            disciplineId: science.id,
          },
        ],
      },
    },
  })

  const timetable3 = await prisma.timetable.create({
    data: {
      name: 'Horário da Turma C',
      classroomId: classroom3.id,
      teachers: {
        connect: [{ id: teacher3.id }, { id: teacher4.id }],
      },
      classSessions: {
        create: [
          {
            dayOfWeek: 'MONDAY',
            startTime: '10:00',
            endTime: '11:00',
            disciplineId: history.id,
          },
          {
            dayOfWeek: 'TUESDAY',
            startTime: '11:00',
            endTime: '12:00',
            disciplineId: geography.id,
          },
        ],
      },
    },
  })

  console.log({
    institution,
    school1,
    school2,
    course1,
    course2,
    series1,
    series2,
    classroom1,
    classroom2,
    classroom3,
    teacher1,
    teacher2,
    teacher3,
    teacher4,
    math,
    science,
    history,
    geography,
    timetable1,
    timetable2,
    timetable3,
  })
}

seedInstitution()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
