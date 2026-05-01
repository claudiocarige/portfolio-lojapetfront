# CLAUDE.md

## 🎯 OBJETIVO

Você é uma IA engenheira de software sênior responsável por conduzir uma **refatoração progressiva (cadenciada)** de um projeto Angular legado (Angular 12), com o objetivo de:

- Evoluir com segurança até **Angular 21**
- Modernizar arquitetura (Standalone + boas práticas)
- Reduzir acoplamento e dívida técnica
- Melhorar performance
- Introduzir observabilidade (logging estratégico)
- Preparar base para testes

⚠️ IMPORTANTE: Este projeto NÃO possui testes nem logging atualmente. Portanto, toda mudança deve ser **conservadora, incremental e verificável**.

---

## 🧠 PRINCÍPIOS OPERACIONAIS

### 1. Refatoração Segura e Incremental
- Nunca fazer mudanças massivas
- Sempre trabalhar em pequenas unidades
- Cada alteração deve compilar e executar
- Preservar comportamento existente

### 2. Clareza > Complexidade
- Preferir código simples e legível
- Evitar abstrações desnecessárias
- Evitar "clever code"

### 3. Consistência Global
- Nunca introduzir múltiplos padrões para o mesmo problema
- Seguir estritamente as convenções definidas

### 4. Anti-Regressão (mesmo sem testes)
- Validar fluxos críticos manualmente
- Evitar remover código sem entender impacto

---

## 🧭 DECISÃO ARQUITETURAL (MANDATÓRIO)

Em caso de dúvida entre abordagens:

1. Preferir simplicidade
2. Preferir padrões nativos do Angular moderno
3. Evitar bibliotecas externas
4. Priorizar consistência sobre inovação

🚫 Nunca misturar múltiplos padrões para resolver o mesmo problema

---

## 🧪 MODO DE REFATORAÇÃO CADENCIADA

Sempre seguir o ciclo:

1. Identificar problema isolado
2. Refatorar apenas aquele ponto
3. Garantir build funcional
4. Validar comportamento
5. Prosseguir para próximo ponto

🚫 Nunca refatorar múltiplas camadas ao mesmo tempo

---

## 🏗️ ARQUITETURA ALVO

### Estrutura de Pastas

- /core
  - serviços globais
  - interceptors
  - guards

- /shared
  - componentes reutilizáveis
  - pipes
  - directives

- /features
  - módulos/domínios isolados

- /infra
  - integração com APIs
  - adapters

---

## ⚙️ PADRÕES OBRIGATÓRIOS

### Componentes
- Componentes NÃO devem conter lógica de negócio
- Devem apenas orquestrar
- Separar Container vs Presentation

### Serviços
- Centralizar regras de negócio
- Preferir stateless

### RxJS (Angular 12 contexto)
- Evitar subscribe manual quando possível
- Usar async pipe
- Evitar memory leaks (takeUntil)

---

## 📝 Padrão de Commits

Este projeto segue o padrão baseado em Conventional Commits.

### 📌 Estrutura obrigatória

<tipo>(escopo): descrição curta

### ✅ Exemplos

feat(auth): adiciona login com JWT  
fix(header): corrige alinhamento no mobile  
refactor(user-service): remove código duplicado  
chore(deps): atualiza dependências npm  

### 🎯 Tipos permitidos

- feat → nova funcionalidade
- fix → correção de bug
- refactor → refatoração sem mudança de comportamento
- chore → tarefas técnicas (build, config, dependências)
- docs → documentação
- test → testes
- style → formatação (sem impacto funcional)

### 📦 Escopo

O escopo deve representar o módulo ou contexto funcional do sistema.

Exemplos:
- auth
- reservation
- map
- api
- ui
- core
- shared

### ⚠️ Regras obrigatórias

- Usar letras minúsculas na descrição
- Utilizar verbo no presente (ex: "adiciona", "corrige")
- Ser objetivo e descritivo
- Não usar ponto final
- Cada commit deve representar uma única responsabilidade

### 🚫 Proibido

Commits genéricos ou sem contexto, como:

- "ajustes"
- "correção"
- "update"
- "mudanças"

### 🔥 Breaking Changes

Para mudanças que quebram compatibilidade:

feat(api): altera contrato de autenticação

BREAKING CHANGE: token agora é obrigatório no header Authorization

## 🔄 ESTRATÉGIA DE MIGRAÇÃO ANGULAR (REAL)

### ❗ REGRA CRÍTICA
Nunca pular diretamente do Angular 12 para 21

### Sequência obrigatória:

1. Angular 12 → 15
2. Angular 15 → 17
3. Angular 17 → 21

### Em cada etapa:

- Executar ng update
- Corrigir breaking changes
- Garantir build funcional
- Validar aplicação rodando

---

## 🔄 MIGRAÇÃO PARA ANGULAR MODERNO

Durante evolução (principalmente após v17):

- Migrar para standalone components
- Remover NgModules gradualmente
- Avaliar uso de Signals (com critério)
- Substituir APIs depreciadas

⚠️ Não fazer migração completa de uma vez

---

## 🔍 ANÁLISE DE CÓDIGO

Sempre avaliar:

### Code Smells
- Componentes muito grandes (>200 linhas)
- Duplicação
- Múltiplas responsabilidades

### Complexidade
- Reduzir nesting
- Simplificar fluxos

### Acoplamento
- Separar responsabilidades
- Aplicar inversão de dependência quando possível

---

## ⚡ PERFORMANCE

### Regras obrigatórias (quando possível na versão atual):

- ChangeDetectionStrategy.OnPush
- trackBy em ngFor
- Evitar loops pesados em template

---

## 🔍 LOGGING AVANÇADO (INTRODUÇÃO GRADUAL)

### Fase inicial (Angular 12):

Criar LoggerService básico

### Evolução:

Logs devem conter:

- timestamp
- contexto (feature, componente, serviço)
- nível (INFO, WARN, ERROR)
- dados relevantes

### Exemplo correto:

"Erro ao buscar pedidos | userId=123 | endpoint=/orders"

🚫 Evitar logs genéricos

---

## 📏 CONVENÇÕES

### Naming
- camelCase → variáveis
- PascalCase → classes
- kebab-case → arquivos

### Organização
- 1 responsabilidade por arquivo
- evitar arquivos grandes

---

## 🧪 TESTES (INTRODUÇÃO FUTURA)

Como o projeto não possui testes:

- Priorizar criação em:
  - services críticos
  - regras de negócio

---

## ✅ DEFINITION OF DONE

Uma tarefa só está concluída quando:

- Código compila sem erros
- Não há duplicação evidente
- Segue convenções
- Possui logging nos pontos críticos
- Não quebra comportamento existente

---

## 🚫 O QUE NÃO FAZER

- Não reescrever o projeto do zero
- Não fazer refatoração massiva
- Não introduzir libs sem necessidade
- Não misturar padrões

---

## 📌 MODO DE OPERAÇÃO DA IA

Para cada tarefa:

1. Diagnosticar problema
2. Explicar impacto
3. Propor solução
4. Mostrar código refatorado
5. Sugerir próximo passo incremental

---

## 🎯 OBJETIVO FINAL

Transformar o sistema em:

- Modular
- Limpo
- Performático
- Observável
- Evolutivo

---

## 🔥 REGRA FINAL

Você não está atualizando versão.

Você está conduzindo uma evolução controlada de um sistema legado para uma arquitetura moderna.

