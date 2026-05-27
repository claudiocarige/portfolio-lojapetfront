# 📊 Análises & Planejamento — Helpdesk Copyimagem

> **Papel**: Arquiteto Java e Angular Sênior  
> **Projeto**: `copyimagem-helpdesk` — Branch `upgrade/angular-18`  
> **Repositório**: `copyimagemhelpdesk/`  
> **Última atualização**: 27 de Maio de 2026

---

## 📑 Índice

1. [Histórico de Sessões](#1-histórico-de-sessões)
2. [Índice de Prioridades de Refatoração](#2-índice-de-prioridades-de-refatoração)
3. [Decisões Arquiteturais Tomadas](#3-decisões-arquiteturais-tomadas)
4. [Pontos em Aberto](#4-pontos-em-aberto)
5. [Análise Detalhada por Sessão](#5-análise-detalhada-por-sessão)

---

## 1. Histórico de Sessões

| # | Data | Tópico Analisado | Status |
|---|------|-----------------|--------|
| 01 | 27/05/2026 | Análise geral de SOLID, Clean Code, Segurança e Performance dos componentes `CreateCliente`, `CreateChamado`, `ClienteService` e `ChamadoService` | ✅ Concluída |

---

## 2. Índice de Prioridades de Refatoração

> Legenda: 🔴 Crítico · 🟡 Importante · 🟢 Melhoria · ⚪ Futuro

| Prioridade | Código | Item | Arquivo Principal | Sprint Sugerida |
|---|---|---|---|---|
| 🔴 Crítico | **R-01** | Integrar `criarCliente()` com HTTP POST na API | `cliente.service.ts` | Sprint 1 |
| 🔴 Crítico | **R-02** | Implementar algoritmo completo de validação de CPF (dígitos verificadores) | `cliente.service.ts` | Sprint 1 |
| 🔴 Crítico | **R-03** | Implementar algoritmo completo de validação de CNPJ (dígitos verificadores) | `cliente.service.ts` | Sprint 1 |
| 🟡 Importante | **R-04** | Extrair validações de CPF/CNPJ para `CustomValidators` (SRP) | `shared/validators/` | Sprint 1 |
| 🟡 Importante | **R-05** | Adicionar `ChangeDetectionStrategy.OnPush` no `CreateClienteComponent` | `create-cliente.component.ts` | Sprint 1 |
| 🟡 Importante | **R-06** | Eliminar dupla inscrição (`subscribe` + `async pipe`) no `CreateChamadoComponent` | `create-chamado.component.ts` | Sprint 1 |
| 🟡 Importante | **R-07** | Padronizar paradigma reativo: converter `async/await` do `ChamadoService` para `Observable` | `chamado.service.ts` | Sprint 2 |
| 🟡 Importante | **R-08** | Adicionar validação de formato de contato (telefone/email) no `CreateClienteComponent` | `create-cliente.component.ts` | Sprint 2 |
| 🟢 Melhoria | **R-09** | Implementar estratégia de invalidação de cache no `getEmpresas()` após cadastro de PJ | `cliente.service.ts` | Sprint 2 |
| 🟢 Melhoria | **R-10** | Remover código morto: método vazio `adjustValidators()` e casts `as any` desnecessários | `create-cliente.component.ts`, `create-chamado.component.ts` | Sprint 2 |
| 🟢 Melhoria | **R-11** | Segregar `ClienteService`: extrair persistência (`StorageService`) e HTTP (`ClienteApiService`) | `core/services/` | Sprint 3 |
| ⚪ Futuro | **R-12** | Migrar estado local para `Signals` do Angular 18+ | Componentes e Serviços | Sprint 4 |
| ⚪ Futuro | **R-13** | Remover `NgFor` / `NgIf` legado (substituir por `@for`, `@if` — Angular 17+ syntax) | Templates HTML | Sprint 4 |
| 🔴 Crítico | **R-14** | Renomear `empresaId` → `clienteId` em toda a cadeia: interface `Chamado`, `ChamadoService`, `CreateChamadoComponent` e template | `chamado.service.ts`, `create-chamado.component.ts` | Sprint 1 |
| ⚪ Futuro | **R-15** | Implementar `AuthInterceptor` + guards de rota (após início do backend) | `core/interceptors/`, `core/guards/` | Pós-backend |

---

## 3. Decisões Arquiteturais Tomadas

### ✅ DAT-01 — Armazenamento híbrido: localStorage + API
**Data**: 27/05/2026  
**Decisão**: Manter `localStorage` como fallback para quando a API não estiver disponível. A fonte de verdade primária é a API (`mockapi.io`).  
**Racional**: Garante resiliência em ambiente sem conectividade e preserva comportamento existente.  
**Impacto**: Requer sincronização bidirecional ao reintegrar o `criarCliente()` com HTTP POST.

---

### ✅ DAT-02 — Standalone Components como padrão
**Data**: 27/05/2026  
**Decisão**: Todos os componentes novos e refatorados devem ser `standalone: true`, sem NgModules.  
**Racional**: Alinhado com a estratégia de upgrade Angular 17→18 e com `claude.md`.  
**Impacto**: Imports declarados diretamente no `@Component`.

---

### ✅ DAT-03 — Padrão reativo com Observables (RxJS)
**Data**: 27/05/2026  
**Decisão**: Não misturar `async/await` com Observables nos serviços. Toda comunicação HTTP deve retornar `Observable<T>`.  
**Racional**: Facilita encadeamento de operadores, tratamento global de erros e uso do `async pipe` nos templates.  
**Exceção temporária**: `ChamadoService.criarChamado()` ainda usa `firstValueFrom` (será refatorado em Sprint 2 — ver **R-07**).

---

## 4. Pontos em Aberto

> Items que precisam de decisão ou investigação antes de serem implementados.

| Código | Questão | Urgência | Responsável |
|--------|---------|----------|------------|
| ~~**Q-01**~~ | ~~O endpoint real da API para clientes é `/clientes` ou outro caminho?~~ | ~~🔴 Alta~~ | ✅ **Resolvido** — Ver DAT-08 |
| ~~**Q-02**~~ | ~~O campo `nomeCliente` é o mesmo para PF e PJ no backend?~~ | ~~🔴 Alta~~ | ✅ **Resolvido** — Ver DAT-04 |
| ~~**Q-03**~~ | ~~Qual estratégia de autenticação será adotada?~~ | ~~🟡 Média~~ | ✅ **Resolvido** — Ver DAT-07 |
| ~~**Q-04**~~ | ~~Redirecionar ou manter na página após criar chamado?~~ | ~~🟡 Média~~ | ✅ **Resolvido** — Ver DAT-05 |
| ~~**Q-05**~~ | ~~Responsabilidade do campo `empresaId` no payload do chamado.~~ | ~~🟡 Média~~ | ✅ **Resolvido** — Ver DAT-06 |

---

### ✅ DAT-04 — Campo `nomeCliente` como padrão universal
**Data**: 27/05/2026  
**Decisão**: O campo `nomeCliente` é o **padrão único** para identificar o nome de qualquer cliente, independentemente do tipo (`PF` ou `PJ`).  
**Racional**: Simplifica o modelo de dados, evita bifurcação de campos semânticos (`nomeCompleto` vs `nomeEmpresa`) e mantém consistência nos contratos de API, templates e serviços.  
**Impacto**:
- O `PLANEJAMENTO.md` original (campos `nomeCompleto` para PF e `nomeEmpresa` para PJ) está **revogado**.
- Os models `ClientePF` e `ClientePJ` mantêm `nomeCliente` herdado de `ClienteBase`.
- Normalização no `getEmpresas()` (`item.nomeEmpresa ?? item.nomeCompleto`) pode ser simplificada para aceitar apenas `nomeCliente`.
- Labels de exibição no template podem usar `nomeCliente` diretamente sem discriminar tipo.

---

### ✅ DAT-08 — Endpoint da API de Clientes: `/clientes`
**Data**: 27/05/2026  
**Decisão**: O endpoint oficial para o recurso de clientes é **`/clientes`**.  
**Racional**: Confirmado pelo time. Já é o path utilizado em `getEmpresas()` e está alinhado com o padrão REST do projeto.  
**Impacto**:
- `ClienteService.criarCliente()` (HTTP POST) deve usar: `${apiBase}/clientes`
- `ClienteService.getEmpresas()` (HTTP GET) já usa: `${apiBase}/clientes` ✅
- `ClienteService.atualizarCliente()` (HTTP PUT/PATCH) deve usar: `${apiBase}/clientes/{id}`
- `ClienteService.deletarCliente()` (HTTP DELETE) deve usar: `${apiBase}/clientes/{id}`
- Nenhuma alteração de path necessária no código existente.

---

### ✅ DAT-07 — Autenticação: diferida para fase de desenvolvimento do backend
**Data**: 27/05/2026  
**Decisão**: A implementação de autenticação e autorização está **diferida**. Será projetada e implementada quando o desenvolvimento do backend tiver início, após a conclusão e validação do frontend.  
**Racional**: Evita over-engineering no frontend sem um contrato de API definido. A estratégia de auth (JWT, API Key, OAuth2, etc.) será definida junto com a arquitetura do backend.  
**Impacto no frontend atual**:
- Nenhum `Authorization` header deve ser adicionado por enquanto.
- Os `HttpInterceptors` de autenticação **não devem ser criados** nesta fase.
- Ao iniciar o backend, será necessário revisitar todos os métodos HTTP dos serviços (`ClienteService`, `ChamadoService`) para adicionar o mecanismo de autenticação.
- Criar item de backlog futuro: **R-15** — Implementar `AuthInterceptor` + guards de rota.

> ⚪ **Adicionado**: Item **R-15** ao Índice de Prioridades como item Futuro.

---

### ✅ DAT-05 — Comportamento pós-criação de Chamado: redirecionar para Home com SnackBar
**Data**: 27/05/2026  
**Decisão**: Após a criação bem-sucedida de um chamado, o sistema deve **redirecionar o usuário para `/home`** exibindo um `MatSnackBar` com a mensagem de confirmação.  
**Racional**: Garante feedback imediato ao usuário e o retorna ao fluxo principal da aplicação.  
**Impacto**:
- O comportamento atual do código (`router.navigate(['/home'])` + `snackBar.open(...)`) já está **correto** e alinhado com esta decisão.
- O `PLANEJAMENTO.md` original previa "manter na página" — esse trecho está **revogado**.
- Nenhuma alteração de código necessária neste ponto. ✅

---

### ✅ DAT-06 — Renomear `empresaId` para `clienteId` em todo o domínio de Chamados
**Data**: 27/05/2026  
**Contexto**: O sistema é um **Helpdesk de suporte a impressoras alugadas**. Os chamados são abertos por *clientes* que possuem problemas com os equipamentos. Não existe o conceito isolado de "empresa" nesse contexto — a entidade correta é o **cliente** (PF ou PJ).

**Decisão**: Renomear o campo `empresaId` para `clienteId` em todos os artefatos do domínio de chamados.  
**Racional**: Alinha o vocabulário do código ao domínio de negócio real. Usar `empresaId` é uma abstração incorreta que gera confusão e desconexão com o modelo `Cliente`.  
**Impacto**:
- `Chamado` interface em `chamado.service.ts`: substituir `empresaId?` por `clienteId: string` (obrigatório).
- `ChamadoService.criarChamado()`: incluir `clienteId` no payload enviado à API.
- `CreateChamadoComponent`: renomear controle do `FormGroup` de `empresaId` para `clienteId`.
- `CreateChamadoComponent`: o seletor de empresa passa a ser um **seletor de cliente** (PF ou PJ).
- Template HTML: atualizar `formControlName`, labels e mensagens de erro.
- Adicionar à lista de refatoração como novo item de alta prioridade → **R-14**.

> ⚠️ **Adicionado**: Item **R-14** ao Índice de Prioridades — ver seção 2.

---

## 5. Análise Detalhada por Sessão

---

### 🗓️ Sessão 01 — 27/05/2026
**Tópico**: Análise geral de lógica de negócio, integração com API, SOLID, Clean Code, Segurança e Performance

---

#### 5.1 Integração com a API Externa (Backend)

Há uma **assimetria grave** na comunicação com o backend configurado em `app.config.ts` (aponta para `mockapi.io`).

##### 🔴 Lacuna no Cadastro de Clientes (→ R-01)
- **Problema**: `criarCliente()` em `cliente.service.ts` é totalmente síncrono e salva apenas no `localStorage`. Não há chamada HTTP POST.
- **Impacto**: Clientes criados nunca são persistidos no backend. Eles existem apenas no navegador local.
- **Inconsistência**: `getEmpresas()` busca via HTTP GET no endpoint `/clientes`, mas o cadastro correspondente não faz o POST equivalente.

##### 🟡 Paradigma Misturado no ChamadoService (→ R-07)
- **Problema**: `criarChamado()` usa `firstValueFrom` convertendo Observable em Promise com `async/await`.
- **Impacto**: Quebra o padrão idiomático do Angular. Dificulta encadeamento de operadores RxJS e tratamento global de erros.

---

#### 5.2 Análise de SOLID e Clean Code

##### ❌ Violação do SRP — ClienteService (→ R-11)
O `ClienteService` acumula **4 responsabilidades distintas**:
1. Regras de negócio e cache em memória (`this.clientes`)
2. Persistência em `localStorage` (`salvarClientes`, `carregarClientes`)
3. Validação de domínio: algoritmos de CPF/CNPJ (`validarCPF`, `validarCNPJ`)
4. Comunicação de infraestrutura: requisições HTTP (`getEmpresas`)

##### ❌ Violação do OCP — método `criarCliente()` (→ R-04)
Condicionais explícitas baseadas no `tipo` do cliente (`if tipo === 'PF'`). Adicionar novos tipos exige modificar o método diretamente.

##### ⚠️ Code Smells (→ R-10)
- **Casts `as any`** em `create-cliente.component.ts` (linhas 85–91): anulam a segurança de tipos do TypeScript.
- **Casts redundantes** em `create-chamado.component.ts` (linha 98): `(cliente as any).contato` — `contato` já existe na interface `ClienteBase`.
- **Código morto**: método `adjustValidators()` vazio; comentário no construtor sem efeito.

---

#### 5.3 Segurança Web e Validação de Dados

##### ⚠️ Validação de CPF/CNPJ Fraca (→ R-02, R-03)
Os métodos `validarCPF()` e `validarCNPJ()` verificam apenas:
- Limpeza de caracteres não numéricos
- Tamanho do campo (11 ou 14 dígitos)

**Não executam** o cálculo dos dígitos verificadores.

> ⚠️ Qualquer sequência numérica com 11 ou 14 dígitos (ex: `12345678901`) é aceita. Isso permite poluição do banco de dados com registros inválidos.

##### ⚠️ Inconsistência nas Validações de Entrada (→ R-08)
- `CreateChamadoComponent`: valida formato do telefone com `Validators.pattern(/^\d{10,11}$/)` ✅
- `CreateClienteComponent`: campo `contato` aceita qualquer string sem validação ❌

---

#### 5.4 Performance e Reatividade Angular

##### 🔴 Ausência de `OnPush` no CreateClienteComponent (→ R-05)
- `CreateChamadoComponent`: usa `ChangeDetectionStrategy.OnPush` ✅
- `CreateClienteComponent`: usa detecção padrão (Default), disparando ciclos em toda a árvore a cada evento global ❌

##### 🔴 Dupla Inscrição (Double Subscription) (→ R-06)

```typescript
// TypeScript — subscribe explícito
this.empresas$.pipe(takeUntil(this.destroy$)).subscribe(arr => this.empresas = arr);
```
```html
<!-- Template — async pipe (segunda inscrição simultânea) -->
<ng-container *ngIf="empresas$ | async as empresas">
```
Duas assinaturas ativas simultâneas no mesmo fluxo. A inscrição TypeScript pode ser eliminada.

##### 🟡 Cache Sem Invalidação (→ R-09)
`getEmpresas()` usa `shareReplay(1)`. Após o cadastro de um novo cliente PJ, o cache não é invalidado, e a lista de empresas disponível no `CreateChamadoComponent` permanece desatualizada.
