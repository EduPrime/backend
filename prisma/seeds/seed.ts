import { PrismaClient } from '@prisma/client'
import { seedInstitution } from './seedInstitution'
import { seedGrade } from './seedGrade'
import { createInstitutionUserAndRole } from './createInstitutionUserAndRole'

const prisma = new PrismaClient()

async function main() {
  try {
    // Verificar se já existem registros na tabela institution
    const institutionCount = await prisma.institution.count()

    if (institutionCount > 0) {
      console.log('Data already exists in the database. Skipping seeding.')
    } else {
      console.log('Creating DB users and roles...')
      await createInstitutionUserAndRole()
      console.log('DB users and roles created successfully.')

      console.log('Seeding Institution...')
      await seedInstitution()
      console.log('Institution seeded successfully.')

      console.log('Seeding Grade...')
      await seedGrade()
      console.log('Grade seeded successfully.')
    }
  } catch (e) {
    console.error('Error during seeding:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
