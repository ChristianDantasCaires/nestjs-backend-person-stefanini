# API Cadastro de Pessoas

API backend construída com NestJS para cadastro e gerenciamento de pessoas, com autenticação JWT e persistência em SQLite.

Principais arquivos

- Configuração da aplicação: [`AppModule`](src/app.module.ts) ([arquivo](src/app.module.ts))
- Inicialização e Swagger: [`main.ts`](src/main.ts) ([arquivo](src/main.ts))
- Banco de dados (TypeORM + SQLite): [`SqliteModule`](src/infra/database/sqlite.module.ts) ([arquivo](src/infra/database/sqlite.module.ts))
- Entidades: [`Person`](src/infra/entities/person.entity.ts) ([arquivo](src/infra/entities/person.entity.ts)), [`User`](src/infra/entities/user.entity.ts) ([arquivo](src/infra/entities/user.entity.ts))
- Repositórios: [`PersonRepository`](src/infra/database/repositories/person/person.repository.ts) ([arquivo](src/infra/database/repositories/person/person.repository.ts)), [`UserRepository`](src/infra/database/repositories/user/user.repository.ts) ([arquivo](src/infra/database/repositories/user/user.repository.ts))
- Módulos principais: [`PersonsModule`](src/modules/persons/persons.module.ts) ([arquivo](src/modules/persons/persons.module.ts)), [`AuthModule`](src/modules/auth/auth.module.ts) ([arquivo](src/modules/auth/auth.module.ts)), [`UsersModule`](src/modules/users/users.module.ts) ([arquivo](src/modules/users/users.module.ts))

Endpoints principais (controladores)

- Autenticação: [`AuthController`](src/modules/auth/auth.controller.ts) — POST /auth/login ([arquivo](src/modules/auth/auth.controller.ts))
  - DTOs: [`signInSchema` / `ISignInDTO`](src/modules/auth/dtos/auth.dto.ts) ([arquivo](src/modules/auth/dtos/auth.dto.ts))
- Usuários (registro): [`UsersController`](src/modules/users/users.controller.ts) — POST /users/create ([arquivo](src/modules/users/users.controller.ts))
- Pessoas (CRUD): [`PersonsController`](src/modules/persons/persons.controller.ts) — rotas em /persons ([arquivo](src/modules/persons/persons.controller.ts))
  - DTOs: [`createPersonSchema` / `ICreatePersonDTO`](src/modules/persons/dtos/create-person.dto.ts) ([arquivo](src/modules/persons/dtos/create-person.dto.ts)), [`updatePersonSchema` / `IUpdatePersonDTO`](src/modules/persons/dtos/update-person.dto.ts) ([arquivo](src/modules/persons/dtos/update-person.dto.ts)), [`createPersonV2Schema`](src/modules/persons/dtos/create-person-v2.dto.ts) ([arquivo](src/modules/persons/dtos/create-person-v2.dto.ts))

Validações e segurança

- Validação com Zod via [`ZodValidationPipe`](src/shared/http/pipe/zod-validation.pipe.ts) ([arquivo](src/shared/http/pipe/zod-validation.pipe.ts))
- Guard JWT custom: [`AuthGuard`](src/shared/http/guard/auth.guard.ts) ([arquivo](src/shared/http/guard/auth.guard.ts))
- Mensagens de erro: [`ErrorMessages`](src/shared/enums/error-messages.enum.ts) ([arquivo](src/shared/enums/error-messages.enum.ts))
- Erro HTTP padrão: [`ServerError`](src/shared/error/server-error.ts) ([arquivo](src/shared/error/server-error.ts))

Utilitários

- Sanitização de CPF: [`sanitizeCpf`](src/shared/utils/sanitizeCpf.utils.ts) ([arquivo](src/shared/utils/sanitizeCpf.utils.ts))
- Interface de env: [`EnvConfig`](src/shared/interfaces/IEnv.interface.ts) ([arquivo](src/shared/interfaces/IEnv.interface.ts))

Testes

- Unit tests com Jest: [test/unit e src/modules/persons/services/tests](src/modules/persons/services/tests) ([pasta](src/modules/persons/services/tests))
- E2E: [test/app.e2e-spec.ts](test/app.e2e-spec.ts) ([arquivo](test/app.e2e-spec.ts)), config: [test/jest-e2e.json](test/jest-e2e.json) ([arquivo](test/jest-e2e.json))

Pré-requisitos

- Node.js >= 18
- npm
- (opcional) SQLite (arquivo já incluso em db/sql.sqlite)

Instalação e execução

1. Instalar dependências

```sh
npm install
```
