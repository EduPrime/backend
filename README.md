# Projeto EduPrime

Esse é o backend do EduPrime Plattform, o coração de integrações. Sem ele, não haverá luz. Baseando-se em Prisma, cada nova tabela, view ou similar, será um endpoint automaticamente.

## Diagrama ERD

Abaixo está o diagrama ERD via Prisma para o banco de dados:

![EduPrime ERD](./prisma/ERD.svg)

## Scripts Disponíveis

### Formatação de Código

```bash
pnpm run format
```

Executa o Prettier para formatar o código nos diretórios `src` e `test`.

### Docker

#### Iniciar Docker

```bash
pnpm run docker:start
```

Inicia os containers Docker definidos no arquivo `docker-compose.yml` dentro do diretório `Docker`.

#### Parar Docker

```bash
pnpm run docker:stop
```

Para e remove os containers Docker definidos no arquivo `docker-compose.yml` dentro do diretório `Docker`.

### Semente de Dados

```bash
pnpm run seed
```

Executa o script de seed localizado em `prisma/seeds/seed.ts` para popular o banco de dados com dados iniciais.

### Lint

```bash
pnpm run lint
```

Executa o ESLint para encontrar e corrigir problemas no código nos diretórios `src`, `apps`, `libs`, e `test`.

### Token

```bash
pnpm run token
```

Executa o script de token localizado em `token/src/index.ts`.

## Engines

Este projeto requer as seguintes versões de engines:

- `node`: `>=20.x`
- `pnpm`: `>=9`

## TODO LIST

### O que falta fazer?

- [x] Integrar JWT com PostgRest [Instruções](https://www.youtube.com/watch?v=ALeP-LtbLcA)
- [x] Integrar Prisma
- [ ] Criar usuários no banco via Prisma
- [ ] Criar usuários no Zitadel?
- [ ] Criar projeto para o Tenant?

## Manipulando o banco de dados

Para manipular o banco de dados, utilize os seguintes comandos:

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm run seed
```

## Autor

Desenvolvido por [@hermesalvesbr](https://github.com/hermesalvesbr).

## Licença

Este projeto é licenciado sob a Licença MIT.
