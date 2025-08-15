# API de Cadastro de Pessoas

Esta é uma API REST desenvolvida em Node.js com NestJS e TypeScript para gerenciamento de cadastro de pessoas, com duas versões da API e todos os recursos extras implementados.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, NestJS, TypeScript
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (JSON Web Token)
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest (unitários)
- **Validações**: Zod

## 📋 Funcionalidades

### Recursos Principais
- ✅ **CRUD completo** de pessoas
- ✅ **Duas versões da API de criar pessoa** (v1 e v2)
- ✅ **Autenticação JWT** com usuários pré-existentes
- ✅ **Validações** de CPF, email e data de nascimento, etc
- ✅ **Documentação Swagger** para ambas as versões
- ✅ **Testes automatizados**

### Criar Pessoa v1
- Endereço é **opcional**
- Todos os outros campos conforme especificação

### Criar Pessoa v2
- Endereço é **obrigatório**
- Compatibilidade com v1 mantida

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd pessoa-cadastro-api

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run start:dev
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

## 📚 Documentação da API

### Swagger
- **API**: http://localhost:3000/swagger

### Autenticação
Todas as rotas (exceto login) requerem autenticação via Bearer Token.

#### Usuários Pré-cadastrados
```json
{
 "email": "usuario1@gmail.com",
 "password": "12345"   
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Endpoints API

#### Pessoas
- `POST /persons/create` - Criar pessoa V1  (com endereço opcional)
- `POST /persons/create/v2` - Criar pessoa V2 (com endereço obrigatório)
- `GET /persons` - Listar pessoas
- `GET /persons/:id` - Buscar por ID
- `PUT /persons/:id` - Atualizar pessoa
- `DELETE /persons/:id` - Remover pessoa

### Exemplo de Payload

#### /persons/create (endereço opcional)
```json
{
  "name": "João4 da Silva",
  "gender": "M",
  "email": "joao4.silva@example00.com",
  "birthDate": "2000-05-15",
  "placeOfBirth": "São Paulo",
  "nationality": "Brasileira",
  "cpf": "123.456.729-00"
}
```

#### /persons/create/v2 (endereço obrigatório)
```json
{
  "name": "João5 da Silva",
  "gender": "M",
  "email": "joao5.silva@example00.com",
  "birthDate": "2000-05-15",
  "placeOfBirth": "São Paulo",
  "nationality": "Brasileira",
  "cpf": "123.456.729-22",
  "address": "Rua 2"
}
```

## 🧪 Testes

### Executar Testes
```bash
# Testes unitários
npm run test

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e

# Testes em modo watch
npm run test:watch
```

### Cobertura
O projeto mantém **80%+ de cobertura** de código conforme especificado.

## 🔒 Segurança

- **JWT Authentication** em todas as rotas protegidas
- **Validação de entrada** com Zod
- **Hash de senhas** com bcrypt
- **Sanitização** de dados de entrada
- **CORS** habilitado

## 📊 Estrutura do Projeto

```
src/
├── app.module.ts
├── main.ts
├── infra/
│   ├── database/
│   │   ├── sqlite.module.ts
│   │   ├── repositories.module.ts
│   │   └── repositories/
│   │       ├── person/
│   │       │   └── person.repository.ts
│   │       └── user/
│   │           └── user.repository.ts
│   └── entities/
│       ├── person.entity.ts
│       └── user.entity.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── dtos/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   └── users.service.ts
│   └── persons/
│       ├── persons.module.ts
│       ├── persons.controller.ts
│       ├── dtos/
│       │   ├── create-person.dto.ts        # v1 (endereço opcional)
│       │   ├── create-person-v2.dto.ts     # v2 (endereço obrigatório)
│       │   └── update-person.dto.ts
│       └── services/
│           ├── create-person.service.ts
│           ├── find-all-persons.service.ts
│           ├── find-one-person.service.ts
│           ├── update-person.service.ts
│           ├── delete-person.service.ts
│           └── tests/                       # testes dos serviços
│               ├── create-person.service.spec.ts
│               ├── update-person.service.spec.ts
│               └── ...                     # outros specs
├── shared/
│   ├── enums/
│   │   └── error-messages.enum.ts
│   ├── error/
│   │   └── server-error.ts
│   ├── http/
│   │   ├── pipe/
│   │   │   └── zod-validation.pipe.ts
│   │   └── guard/
│   │       └── auth.guard.ts
│   ├── interfaces/
│   │   ├── IEnv.interface.ts
│   │   └── IControllerResponse.ts
│   └── utils/
│       └── sanitizeCpf.utils.ts
db/
├── sql.sqlite

test/
├── app.e2e-spec.ts
└── jest-e2e.json

outros arquivos na raiz:
- .env
- package.json
- tsconfig.json
- README.md
```
