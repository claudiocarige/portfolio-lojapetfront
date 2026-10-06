# Instruções do Agente - Helpdesk Impressoras

## 🔴 Regras de Ouro Operacionais (Stricto Sensu)
Estas regras são IMPERATIVAS e devem ser seguidas em todo turno:
1. **Autorização Obrigatória:** A IA NUNCA deve executar nenhuma tarefa de escrita ou modificação sem listar o que pretende fazer e solicitar autorização explícita para prosseguir.
2. **Planejamento Atômico:** Toda tarefa deve ser precedida de um plano detalhado dividido em pequenas subtarefas sequenciais.
3. **Controle de Terminal:** A IA deve SEMPRE solicitar autorização específica antes de rodar qualquer comando no terminal (`shell_exec`, `run_command` ou similares).
4. **Revisão Pré-Voo:** Antes de iniciar qualquer subtarefa, a IA deve revisar brevemente o plano para garantir que ele ainda faz sentido com o estado atual do repositório.

## Protocolo de Inicialização (Boot SDD)
Ao iniciar qualquer tarefa ou subtarefa, o agente DEVE:
1. Listar o diretório `/sdd/` para identificar Specs e Skills relevantes.
2. Ler obrigatoriamente os arquivos de Spec impactados antes de propor qualquer mudança.
3. Manter a conformidade com as Skills durante toda a codificação.

## Arquitetura SDD
Este projeto segue rigorosamente o modelo de Desenvolvimento Baseado em Especificações (SDD). Antes de qualquer edição significativa no código:
1. Leia `/sdd/specs/helpdesk-core-design.md` para entender a estrutura de camadas.
2. Siga os padrões de código em `/sdd/skills/frontend-angular-skill.md`.
3. Siga o protocolo de execução em `/sdd/skills/agent-workflow-skill.md`.
4. Consulte `/sdd/specs/entity-contracts.md` para definições de tipos.

## Diretrizes Críticas
- **Angular 21 + Java 21:** Use as linguagens em suas versões mais recentes.
- **Zoneless & Signals:** O frontend não usa Zone.js. Toda reatividade deve ser via Signals.
- **Virtual Threads:** O backend Java deve ser otimizado para threads virtuais do Project Loom.
- **Anti-God-Object:** Se um serviço ultrapassar 200 linhas, ele deve ser auditado para separação de responsabilidades (Facade/API/Store).

## Fluxo de Trabalho de Feature
Sempre que uma nova feature for solicitada:
1. Proponha a alteração no Spec correspondente em `/sdd/specs/`.
2. Implemente seguindo as Skills.
3. Valide contra os Smells documentados.
