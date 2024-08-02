import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

export async function createInstitutionUserAndRole() {
  // Comando para criar a role se não existir
  const createRoleCommand = `
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'institution') THEN
            CREATE ROLE institution NOINHERIT LOGIN PASSWORD 'SamplePassword';
        END IF;
    END
    $$;
  `

  // Comandos para conceder permissões à role
  const grantPermissionsCommands = [
    `GRANT CONNECT ON DATABASE ${process.env.POSTGRES_DB} TO institution;`,
    `GRANT USAGE ON SCHEMA public TO institution;`,
    `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO institution;`,
    `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO institution;`,
    `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO institution;`,
    `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO institution;`,
  ]

  // Executar o comando de criação de role
  await prisma.$executeRawUnsafe(createRoleCommand)

  // Executar cada comando de concessão de permissões separadamente
  for (const command of grantPermissionsCommands) {
    await prisma.$executeRawUnsafe(command)
  }

  console.log(
    'Database user and role institution have been created and permissions granted.',
  )
}

createInstitutionUserAndRole()
  .catch((e) => {
    console.error('Error during user and role creation:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
