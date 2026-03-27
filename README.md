# Bank Client Manager

Sistema de gerenciamento de clientes bancários com arquitetura de micro frontends em Angular com Native Federation.

## 📋 Visão Geral

Projeto monorepo que implementa uma aplicação web modular utilizando **Native Federation** com Angular 19. A arquitetura permite desenvolvimento independente de múltiplos módulos, cada um com seu próprio ciclo de vida e deploy.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│         Front-Shell (App Shell)             │
│  (Roteamento Central + Autenticação)        │
└────────────────────┬────────────────────────┘
         │
    ┌────┴─────────────────┐
    │                       │
┌───▼──────────────────┐ ┌─▼─────────────────┐
│ MFE Client Query     │ │ MFE Client Mgmt   │
│ (Listar Clientes)    │ │ (CRUD Clientes)   │
└──────────────────────┘ └───────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
            ┌────────▼────────┐
            │   Mock API      │
            │  (Express.js)   │
            └─────────────────┘
```

## 📁 Projetos

### 1. **Front-Shell** (`/apps/front-shell`)
App Shell - Contenedor central da aplicação.

- **Framework:** Angular 19
- **Responsabilidades:**
  - Roteamento central
  - Autenticação e autorização
  - Layout principal
  - Carregamento dinâmico dos micro frontends
- **Porta:** `4200`
- **Comando:** `npm run start`

### 2. **MFE Client Query** (`/apps/mfe-client-query`)
Micro frontend para consulta e listagem de clientes.

- **Framework:** Angular 19
- **Responsabilidades:**
  - Listar clientes
  - Consultar dados de clientes
  - Paginação
  - Botões de ação
- **Porta:** `4201`
- **Comando:** `npm run start`

### 3. **MFE Client Management** (`/apps/mfe-client-management`)
Micro frontend para gerenciamento completo de clientes.

- **Framework:** Angular 19 + ngx-mask
- **Responsabilidades:**
  - Criar novos clientes
  - Editar dados de clientes
  - Deletar dados de clientes
  - Validações de formulários
  - Mascaras de entrada
- **Porta:** `4202`
- **Comando:** `npm run start`

### 4. **Mock API** (`/apps/mock-api`)
API fake para desenvolvimento local.

- **Framework:** Node.js + Express
- **Responsabilidades:**
  - Endpoints simulados para clientes
  - Dados mock em memória
  - CORS habilitado para desenvolvimento
- **Porta:** `3001`
- **Comando:** `npm run start`

## 🚀 Quick Start

### Pré-requisitos
- Node.js v18+
- npm v9+

### Instalação

```bash
cd apps/front-shell && npm install
cd apps/mfe-client-query && npm install
cd apps/mfe-client-management && npm install
cd apps/mock-api && npm install
```

### Executar em Desenvolvimento

Execute cada uma das aplicações em terminais separados:

```bash
# Terminal 1 - Mock API (porta 3001)
cd apps/mock-api && npm run start

# Terminal 2 - MFE Client Query (porta 4201)
cd apps/mfe-client-query && npm run start

# Terminal 3 - MFE Client Management (porta 4202)
cd apps/mfe-client-management && npm run start

# Terminal 4 - Front-Shell (porta 4200)
cd apps/front-shell && npm run start
```

Acesse a aplicação em: http://localhost:4200

## 📦 Build & Deployment

```bash
# Build de todas as aplicações
cd apps/front-shell && npm run build
cd apps/mfe-client-query && npm run build
cd apps/mfe-client-management && npm run build
cd apps/mock-api && npm run build
```

## 🧪 Testes

```bash
# Em cada aplicação
npm run test

# Com watch mode
npm run watch
```

## 📚 Estrutura de Código

### Front-Shell
```
src/
├── app/
│   ├── core/
│   │   ├── guards/       # Auth guard
│   │   └── services/     # Auth, Micro-frontend services
│   ├── features/
│   │   ├── auth/         # Módulo de autenticação
│   │   └── layout/       # Componentes de layout
│   ├── app.routes.ts     # Rotas centrais
│   └── app.config.ts     # Configuração da app
```

### Micro Frontends (Client Query & Management)
```
src/
├── app/
│   ├── core/
│   │   ├── models/       # Interfaces (client.model.ts)
│   │   └── services/     # Services (client.service.ts)
│   ├── [feature]/        # Páginas do MFE
│   │   └── pages/
│   └── app.routes.ts     # Rotas locais
```

## 🔧 Tecnologias Principais

- **Frontend:** Angular 19, TypeScript, RxJS
- **UI Components:** SCSS Puro
- **Module Federation:** Native Federation + Softarc
- **Backend:** Express.js, Node.js
- **Validação:** ngx-mask
- **Desenvolvimento:** Angular CLI, ng serve

## 🔐 Autenticação

- Sistema de autenticação centralizado no Front-Shell
- Auth Guard protege rotas
- Serviço de autenticação gerencia tokens

## 🌐 Comunicação entre MFEs

Compartilhamento de modelos através de serviços centralizados:
- `AuthService` - Dados de autenticação
- `ClientService` - Dados de clientes
- `MicroFrontendService` - Orquestração entre MFEs

## 📝 Convenções

- Componentes em PascalCase
- Serviços com sufixo `.service.ts`
- Modelos de dados com sufixo `.model.ts`
- Componentes com sufixo `.component.ts`
- HTML com sufixo `.component.html`
- Testes com sufixo `.spec.ts`

## 📄 Licença

ISC

## ✍️ Autores

Desenvolvido como solução de micro frontends em Angular utilizando o Native Fedaration.