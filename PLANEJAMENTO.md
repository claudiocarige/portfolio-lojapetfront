# 📋 PLANEJAMENTO - Sistema de Helpdesk + Gestão de Clientes

**Data**: 24 de Maio de 2026  
**Status**: 🔵 Em Planejamento  
**Versão**: 1.0

---

## 🎯 OBJETIVO GERAL

Evoluir o sistema de helpdesk existente adicionando:
1. **Gestão de Clientes** (Pessoa Física e Jurídica)
2. **Refatoração do Componente CreateChamado** com Reactive Forms
3. **Upgrade Angular** (17 → 21)

---

## 📑 ÍNDICE
1. [Funcionalidades](#funcionalidades)
2. [Arquitetura](#arquitetura)
3. [Modelos de Dados](#modelos-de-dados)
4. [Componentes a Criar](#componentes-a-criar)
5. [Serviços a Criar](#serviços-a-criar)
6. [Fluxo de Navegação](#fluxo-de-navegação)
7. [Checklist de Implementação](#checklist-de-implementação)
8. [Cronograma](#cronograma)

---

## 🚀 FUNCIONALIDADES

### FASE 1: Gestão de Clientes

#### 1.1 - Criar Novo Cliente

**Requisitos Funcionais:**
- [ ] Usuário clica em botão "Criar Novo Cliente" na home principal
- [ ] Sistema redireciona para página `/criar-cliente`
- [ ] Formulário Reactive Forms com validação
- [ ] Suporte a **Pessoa Física** e **Pessoa Jurídica**

**Campos do Formulário:**
```
Tipo de Cliente (Radio Button)
├── Pessoa Física
│   ├── Nome Completo (obrigatório)
│   ├── CPF (obrigatório, máscara, validação)
│   ├── Endereço (obrigatório)
│   ├── Contato (obrigatório, email/telefone)
│   └── Nome do Responsável (obrigatório)
│
└── Pessoa Jurídica
    ├── Nome da Empresa (obrigatório)
    ├── CNPJ (obrigatório, máscara, validação)
    ├── Endereço (obrigatório)
    ├── Contato (obrigatório, email/telefone)
    └── Nome do Responsável (obrigatório)
```

**Validações:**
- CPF válido (algoritmo de validação)
- CNPJ válido (algoritmo de validação)
- Email válido (padrão Angular)
- Telefone válido (padrão brasileiro)
- Todos campos obrigatórios preenchidos

**Comportamento Pós-Criação:**
- [ ] Exibir popup/toast de sucesso: "Cliente criado com sucesso!"
- [ ] Aguardar 2-3 segundos
- [ ] Redirecionar para Home Principal (`/home`)
- [ ] Limpar formulário

#### 1.2 - Visualizar Clientes

**Requisitos:**
- [ ] Listar todos os clientes criados
- [ ] Exibir tipo do cliente (PF ou PJ)
- [ ] Buscar/filtrar por nome
- [ ] Editar cliente (futuro)
- [ ] Deletar cliente (futuro)

---

## 🏗️ ARQUITETURA

### Estrutura de Pastas Alvo

```
src/app/
├── core/
│   ├── services/
│   │   ├── logger.service.ts ✅ (existente)
│   │   ├── chamado.service.ts ✅ (existente)
│   │   ├── cliente.service.ts 🆕
│   │   └── empresa.service.ts 🆕
│   │
│   └── models/
│       ├── chamado.model.ts 🆕
│       └── cliente.model.ts 🆕
│
├── features/
│   ├── home/
│   │   └── homeprincipal/ ✅ (existente)
│   │
│   ├── create-chamado/
│   │   └── create-chamado/ 🆕 (refatorado)
│   │
│   └── create-cliente/ 🆕
│       ├── create-cliente.component.ts
│       ├── create-cliente.component.html
│       ├── create-cliente.component.scss
│       └── create-cliente.component.spec.ts
│
├── shared/
│   ├── pipes/
│   │   ├── cpf.pipe.ts 🆕
│   │   └── cnpj.pipe.ts 🆕
│   │
│   └── directives/
│       ├── cpf-mask.directive.ts 🆕
│       └── cnpj-mask.directive.ts 🆕
│
└── infra/
    └── api/ (futuro)
```

---

## 📦 MODELOS DE DADOS

### Cliente (Base)

```typescript
// src/app/core/models/cliente.model.ts

export interface ClienteBase {
  id: string;
  tipo: 'PF' | 'PJ';
  endereco: string;
  contato: string;
  nomeResponsavel: string;
  dataCriacao: Date;
  ativo: boolean;
}

export interface ClientePF extends ClienteBase {
  tipo: 'PF';
  nomeCompleto: string;
  cpf: string;
}

export interface ClientePJ extends ClienteBase {
  tipo: 'PJ';
  nomeEmpresa: string;
  cnpj: string;
}

export type Cliente = ClientePF | ClientePJ;
```

### Empresa

```typescript
// src/app/core/models/empresa.model.ts

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  contato: string;
  endereco: string;
  ativo: boolean;
}
```

---

## 🔧 COMPONENTES A CRIAR

### 1. CreateClienteComponent

**Localização**: `src/app/features/create-cliente/create-cliente/`

**Responsabilidades:**
- Renderizar formulário Reactive Forms
- Alternar entre PF/PJ dinamicamente
- Validar campos em tempo real
- Exibir erros de validação
- Submeter dados ao serviço
- Exibir toast de sucesso
- Redirecionar após sucesso

**Estrutura:**
```
create-cliente/
├── create-cliente.component.ts
├── create-cliente.component.html
├── create-cliente.component.scss
└── create-cliente.component.spec.ts
```

**Arquitetura Interna:**
```typescript
export class CreateClienteComponent implements OnInit {
  form: FormGroup;
  tipoCliente = signal<'PF' | 'PJ'>('PJ');
  submitting = signal(false);
  
  // Métodos
  ngOnInit(): void { /* inicializar form */ }
  
  alterarTipo(tipo: 'PF' | 'PJ'): void { /* atualizar form dinamicamente */ }
  
  obterCamposAtivos(): FormControl[] { /* retornar campos visíveis */ }
  
  submit(): void { /* validar e enviar */ }
  
  exibirSucesso(): void { /* toast/popup */ }
  
  redirecionarHome(): void { /* router.navigate */ }
}
```

---

## 💾 SERVIÇOS A CRIAR

### 1. ClienteService

**Localização**: `src/app/core/services/cliente.service.ts`

**Responsabilidades:**
- Gerenciar CRUD de clientes
- Persistir em localStorage (ou API futura)
- Validar regras de negócio
- Log de operações

**Métodos Públicos:**
```typescript
criarCliente(cliente: Cliente): Observable<Cliente>
obterClientes(): Cliente[]
obterClientePorId(id: string): Cliente | undefined
atualizarCliente(id: string, cliente: Cliente): Observable<Cliente>
deletarCliente(id: string): Observable<void>
filtrarClientes(termo: string): Cliente[]
```

**Testes Esperados**: 10+ testes

### 2. EmpresaService

**Localização**: `src/app/core/services/empresa.service.ts`

**Responsabilidades:**
- Gerenciar lista de empresas (dropdown)
- Buscar empresas no banco de dados (simulado/API)
- Cache de empresas

**Métodos Públicos:**
```typescript
obterEmpresas(): Observable<Empresa[]>
obterEmpresaPorId(id: string): Observable<Empresa | undefined>
filtrarEmpresas(termo: string): Observable<Empresa[]>
```

**Testes Esperados**: 5+ testes

---

## 🔄 FLUXO DE NAVEGAÇÃO

### Fluxo 1: Criar Novo Cliente

```
HOME (homeprincipal.component)
    ↓
[Clique em "Criar Novo Cliente"]
    ↓
CRIAR_CLIENTE (create-cliente.component)
    ├─ Preencher formulário
    └─ Validar campos
        ↓
    [Clique em "Criar"]
        ↓
    ClienteService.criarCliente()
        ↓
    [Sucesso?]
    ├─ SIM: Exibir Toast + Redirecionar Home
    └─ NÃO: Exibir erro
```

### Fluxo 2: Criar Novo Chamado (Refatorado)

```
HOME (homeprincipal.component)
    ↓
[Clique em "Criar Novo Chamado"]
    ↓
CREATE_CHAMADO (create-chamado.component - REFATORADO)
    ├─ Seletor de empresa (buscar de EmpresaService)
    ├─ Campo descrição do chamado
    └─ Campo nome do solicitante
        ↓
    [Clique em "Criar"]
        ↓
    ChamadoService.criarChamado()
        ↓
    [Sucesso?]
    ├─ SIM: Exibir Toast + Limpar + Manter na página
    └─ NÃO: Exibir erro
```

---

## 📋 ROTAS

**Atualizações Necessárias** em `app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeprincipalComponent },
  { path: 'criar-chamado', component: CreateChamadoComponent },
  { path: 'criar-cliente', component: CreateClienteComponent },
  { path: '**', redirectTo: 'home' }
];
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### FASE 1.1: Infraestrutura
- [ ] Criar modelos de dados (Cliente, Empresa)
- [ ] Criar ClienteService com testes
- [ ] Criar EmpresaService com testes
- [ ] Criar pipes (cpf, cnpj)
- [ ] Criar directives (máscaras)
- [ ] Atualizar rotas em `app.routes.ts`

**Tempo estimado**: 3-4 horas

### FASE 1.2: Componente CreateCliente
- [ ] Criar component CreateClienteComponent
- [ ] Implementar form group (PF/PJ dinâmico)
- [ ] Implementar validações customizadas
- [ ] Renderizar template com alternância de campos
- [ ] Implementar submit com toast
- [ ] Implementar redirect
- [ ] Escrever 15+ testes

**Tempo estimado**: 4-5 horas

### FASE 1.3: Integração Home
- [ ] Adicionar botão "Criar Novo Cliente" em HomeprincipalComponent
- [ ] Adicionar navegação para `/criar-cliente`
- [ ] Testar fluxo completo
- [ ] Validar build e testes (45+ esperados)

**Tempo estimado**: 1-2 horas

### FASE 2: Refatoração CreateChamado
- [ ] Refatorar para usar Reactive Forms
- [ ] Adicionar seletor de empresa
- [ ] Adicionar campos obrigatórios
- [ ] Implementar submit com validação
- [ ] Reescrever testes

**Tempo estimado**: 3-4 horas

### FASE 3: Angular Upgrade (Diferido)
- [ ] Angular 19 → 20
- [ ] Angular 20 → 21
- [ ] Corrigir breaking changes
- [ ] Validar testes

**Tempo estimado**: 2-3 horas

---

## 🧪 TESTES ESPERADOS

### Por Componente/Serviço:

```
ClienteService
├── criar cliente PF válido ✓
├── criar cliente PJ válido ✓
├── validar CPF (inválido) ✓
├── validar CNPJ (inválido) ✓
├── obter clientes (lista) ✓
└── filtrar por nome ✓
Total: 6+ testes

EmpresaService
├── obter todas as empresas ✓
├── filtrar por termo ✓
└── validar cache ✓
Total: 3+ testes

CreateClienteComponent
├── inicializar form vazio ✓
├── alternar tipo (PF ↔ PJ) ✓
├── validar CPF format ✓
├── validar CNPJ format ✓
├── exibir erros de validação ✓
├── submit com sucesso ✓
├── submit com erro ✓
└── redirecionar após sucesso ✓
Total: 8+ testes

CreateChamadoComponent (Refatorado)
├── carregar empresas ✓
├── selecionar empresa ✓
├── validar descrição ✓
├── submit com sucesso ✓
└── redirecionar ou limpar form ✓
Total: 5+ testes

TOTAL ESPERADO: 50+ testes
```

---

## 📊 CRONOGRAMA

| Fase | Tarefa | Duração | Status |
|------|--------|---------|--------|
| 1.1 | Infraestrutura (Modelos, Services) | 3-4h | ⏳ Não iniciado |
| 1.2 | Componente CreateCliente | 4-5h | ⏳ Não iniciado |
| 1.3 | Integração Home | 1-2h | ⏳ Não iniciado |
| 2 | Refatoração CreateChamado | 3-4h | ⏳ Não iniciado |
| 3 | Angular Upgrade (19→20→21) | 2-3h | ⏳ Não iniciado |
| **TOTAL** | - | **13-18h** | - |

---

## 📝 OBSERVAÇÕES IMPORTANTES

### Princípios a Seguir (per `claude.md`)
1. ✅ Refatoração incremental e segura
2. ✅ Cada mudança deve compilar e executar
3. ✅ Testes para cada feature
4. ✅ Logs estratégicos (LoggerService)
5. ✅ Commits com Conventional Commits
6. ✅ Validação build após cada fase

### Decisões Arquiteturais
- **Armazenamento**: localStorage (simples) → API futura
- **Validação**: Angular Validators + Custom Validators
- **Notificações**: Toast/Snackbar (implementar com Material)
- **Masks**: Directives para CPF/CNPJ
- **Estado**: Signals + Services (Angular 18+)

### Próximas Etapas Futuras (pós-planejamento)
- [ ] Edição de clientes
- [ ] Deleção com confirmação
- [ ] Listagem com paginação
- [ ] Filtros avançados
- [ ] Integração com API real
- [ ] Autenticação e autorização
- [ ] Relatórios

---

## 🎯 PRÓXIMO PASSO

**Iniciar FASE 1.1** - Criar infraestrutura:
1. Criar modelos de dados
2. Implementar ClienteService
3. Escrever testes
4. Build validado

**Aviso**: Pausar upgrade Angular até conclusão das funcionalidades.

---

**Documento criado em**: 24 de Maio, 2026  
**Última atualização**: 24 de Maio, 2026  
**Responsável**: GitHub Copilot (Angular Expert)
