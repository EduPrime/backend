-- CreateEnum
CREATE TYPE "Period" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateTable
CREATE TABLE "Institution" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "phone" TEXT,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "phone" TEXT,
    "institutionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "abbreviation" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "totalArea" TEXT,
    "builtArea" TEXT,
    "availableArea" TEXT,
    "acronym" TEXT,
    "blockDiaryEntriesForClosedAcademicYears" BOOLEAN,
    "operationalStatus" INTEGER,
    "administrativeDependency" INTEGER,
    "regulation" INTEGER,
    "logoUrl" TEXT,
    "access" INTEGER,
    "managerId" UUID,
    "managerPosition" TEXT,
    "operationLocation" TEXT,
    "condition" INTEGER,
    "sharedSchoolInepCode" INTEGER,
    "creationDecree" TEXT,
    "numberOfFloors" INTEGER,
    "floorType" INTEGER,
    "energyMeter" INTEGER,
    "waterConsumed" INTEGER,
    "hasPrincipalOffice" BOOLEAN,
    "hasTeachersRoom" BOOLEAN,
    "hasSecretaryOffice" BOOLEAN,
    "hasComputerLab" BOOLEAN,
    "hasScienceLab" BOOLEAN,
    "hasAEERoom" BOOLEAN,
    "hasCoveredCourt" BOOLEAN,
    "hasUncoveredCourt" BOOLEAN,
    "hasKitchen" BOOLEAN,
    "hasLibrary" BOOLEAN,
    "hasReadingRoom" BOOLEAN,
    "hasPlayground" BOOLEAN,
    "hasNursery" BOOLEAN,
    "hasRestroomOutside" BOOLEAN,
    "hasRestroomInside" BOOLEAN,
    "hasChildRestroom" BOOLEAN,
    "hasAccessibleRestroom" BOOLEAN,
    "hasShower" BOOLEAN,
    "hasCafeteria" BOOLEAN,
    "hasPantry" BOOLEAN,
    "hasAuditorium" BOOLEAN,
    "hasPatio" BOOLEAN,
    "hasGreenArea" BOOLEAN,
    "hasPERoom" BOOLEAN,
    "hasArtsRoom" BOOLEAN,
    "hasStudentDormitory" BOOLEAN,
    "hasTeacherDormitory" BOOLEAN,
    "hasExternalArea" BOOLEAN,
    "hasMultipurposeRoom" BOOLEAN,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" UUID NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" UUID NOT NULL,
    "timetableId" UUID,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "period" "Period" NOT NULL DEFAULT 'MORNING',
    "seriesId" UUID NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "classroomId" UUID NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "schoolId" UUID NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "teacherId" UUID NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timetable" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "classroomId" UUID NOT NULL,
    "disciplineId" UUID,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSession" (
    "id" UUID NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "disciplineId" UUID NOT NULL,
    "timetableId" UUID NOT NULL,

    CONSTRAINT "ClassSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" UUID NOT NULL,
    "status" "AttendanceStatus" NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" UUID NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableSchool" (
    "timetableId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,

    CONSTRAINT "TimetableSchool_pkey" PRIMARY KEY ("timetableId","schoolId")
);

-- CreateTable
CREATE TABLE "_TeacherToTimetable" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherToTimetable_AB_unique" ON "_TeacherToTimetable"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherToTimetable_B_index" ON "_TeacherToTimetable"("B");

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableSchool" ADD CONSTRAINT "TimetableSchool_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableSchool" ADD CONSTRAINT "TimetableSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToTimetable" ADD CONSTRAINT "_TeacherToTimetable_A_fkey" FOREIGN KEY ("A") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToTimetable" ADD CONSTRAINT "_TeacherToTimetable_B_fkey" FOREIGN KEY ("B") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
