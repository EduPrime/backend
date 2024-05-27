## Projeto EduPrime

Este projeto é uma aplicação web para gerenciar informações educacionais, integrando várias tecnologias para criar uma solução robusta e escalável. A stack utilizada inclui PostgreSQL com TimescaleDB, Prisma, PostgREST, Redis, e Authentik para autenticação.

### Stack Tecnológica

- **TimescaleDB**: Uma extensão do PostgreSQL otimizada para séries temporais, usada como banco de dados principal.
- **Prisma**: Um ORM moderno para Node.js e TypeScript, usado para interagir com o banco de dados.
- **PostgREST**: Um servidor que transforma um banco de dados PostgreSQL diretamente em uma API RESTful.
- **Redis**: Um armazenamento de dados em memória, usado como cache e para gerenciar sessões.
- **Authentik**: Um provedor de identidade e autenticação de código aberto, usado para gerenciar usuários e autenticação.

### Configuração Inicial

1. **Clone o repositório**:

   ```sh
   git clone <URL do repositório>
   cd <nome do repositório>
   ```

2. **Crie o arquivo \`.env\`** com as seguintes variáveis de ambiente:

   ```env

   # Banco de Dados

   POSTGRES_DB=apiprime
   POSTGRES_USER=eduprime
   POSTGRES_PASSWORD=edu20242025
   POSTGRES_HOST=database
   POSTGRES_PORT=5432
   POSTGRES_SCHEMA=public

   # PostgREST

   PGRST_DB_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
   PGRST_SERVER_PROXY_URI=http://localhost:3000/
   PGRST_JWT_SECRET=141c2c182d1cc146a966c5fabd959c60dfdfcabd705b5843ccfe88c946e92cae
   PGRST_DB_SCHEMA=public
   PGRST_DB_AGGREGATES_ENABLED=true

   # Prisma

   DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_SCHEMA}

   # Authentik

   AUTHENTIK_HOST=authentik.local
   AUTHENTIK_SECRET_KEY=GsnagbvXIULQ8JRTA1XihLJiEna/PjHhYWXFxUW1DcC2uHbcabLGZ+DebcLnr9s2
   AUTHENTIK_ERROR_REPORTING\_\_ENABLED=true
   ```

3. **Inicie os serviços** usando Docker Compose:

   ```sh
   docker-compose up -d
   ```

4. **Configure o Authentik** acessando a URL:
   ```
   http://<seu IP ou hostname>:9000/if/flow/initial-setup/
   ```
   Siga as instruções para criar um usuário administrador e configurar o Authentik.

### Estrutura do Projeto

- **TimescaleDB**: Utilizado para armazenar dados educacionais, como informações sobre escolas, turmas, professores, alunos, e avaliações.
- **Prisma**: Facilita a interação com o banco de dados TimescaleDB através de modelos e queries escritas em TypeScript.
- **PostgREST**: Expõe a base de dados como uma API RESTful, permitindo operações CRUD em cima dos dados gerenciados pelo Prisma.
- **Redis**: Utilizado para cache e gerenciamento de sessões, melhorando a performance da aplicação.
- **Authentik**: Gerencia a autenticação e autorização de usuários, garantindo que apenas usuários autenticados possam acessar certas partes da aplicação.

### Funcionalidades da API

A API exposta pelo PostgREST permite operações CRUD nas tabelas do banco de dados. Exemplos de endpoints incluem:

- `GET /schools`: Retorna a lista de escolas.
- `POST /schools`: Adiciona uma nova escola.
- `GET /teachers`: Retorna a lista de professores.
- `POST /teachers`: Adiciona um novo professor.
- `GET /students`: Retorna a lista de alunos.
- `POST /students`: Adiciona um novo aluno.

### Autenticação

A autenticação é gerenciada pelo Authentik, que fornece endpoints para login, registro e gerenciamento de sessões de usuário. Após a configuração inicial, o Authentik garante que apenas usuários autenticados possam interagir com a API.

### Comandos Úteis

- **Iniciar a aplicação**:
  ```sh
  docker-compose up -d
  ```
- **Parar a aplicação**:
  ```sh
  docker-compose down
  ```
- **Verificar logs**:
  ```sh
  docker-compose logs -f
  ```

### Contribuição

Para contribuir com o projeto, siga os passos abaixo:

1. Fork o repositório.
2. Crie uma branch para sua feature ou correção de bug.
   ```sh
   git checkout -b minha-feature
   ```
3. Commit suas mudanças.
   ```sh
   git commit -m 'Minha nova feature'
   ```
4. Push para a branch criada.
   ```sh
   git push origin minha-feature
   ```
5. Abra um Pull Request no GitHub.

---

Este README fornece uma visão geral do projeto EduPrime e instruções para configuração e uso. Sinta-se à vontade para adaptar e expandir conforme necessário.
