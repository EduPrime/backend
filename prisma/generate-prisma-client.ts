import { spawnSync } from 'node:child_process'
import process from 'node:process'

console.group('Prisma Client Generation')
const generateProcess = spawnSync('pnpm', ['prisma', 'generate'], { stdio: 'inherit' })

if (generateProcess.error) {
  console.error('Erro ao gerar Prisma Client:', generateProcess.error)
  process.exit(1)
}
else {
  console.info('Prisma Client gerado com sucesso.')
}
console.groupEnd()
