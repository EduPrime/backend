import { execSync } from 'node:child_process'
import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function isDatabaseEmpty() {
  try {
    const institutionCount = await prisma.institution.count()
    return institutionCount === 0
  }
  catch (error) {
    console.group('Erro na Verificação do Banco de Dados')
    console.error('Erro ao verificar o banco de dados:', error)
    console.groupEnd()
    return true
  }
}

async function main() {
  console.group('Inicialização do Banco de Dados')

  if (await isDatabaseEmpty()) {
    console.group('Banco de Dados Vazio')
    console.info('Banco de dados está vazio. Executando migrações e seed...')
    console.groupEnd()

    console.group('Executando Migrações')
    try {
      execSync('pnpm prisma migrate dev --name init', { stdio: 'inherit' })
      console.info('Migrações aplicadas com sucesso.')
    }
    catch (migrationError) {
      console.error('Erro ao executar migrações:', migrationError)
    }
    console.groupEnd()

    console.group('Executando Seed')
    try {
      execSync('pnpm run seed', { stdio: 'inherit' })
      console.info('Seed concluído com sucesso.')
    }
    catch (seedError) {
      console.error('Erro ao executar seed:', seedError)
    }
    console.groupEnd()
  }
  else {
    console.info('Banco de dados já contém dados. Nenhuma ação necessária.')
  }

  console.groupEnd()
  await prisma.$disconnect()
}

main().catch((e) => {
  console.group('Erro na Execução do Script')
  console.error(e)
  console.groupEnd()
  prisma.$disconnect()
  process.exit(1)
})
