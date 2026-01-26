---
title: Multi-Agent Collaboration Protocol
tags: [#process, #agents, #collaboration]
dependencies: [process-skills-lifecycle, process-n8n-mcp-integration]
mcp_resource: true
updated_at: 2026-01-26
---

# Multi-Agent Collaboration Protocol

## Purpose
Обеспечить эффективное разделение труда между ИИ-агентами разных типов для поддержания здоровья системы Skills.

## Agent Roles

### 1. Cursor Agent (Primary / Active)
- **Характер**: Быстрый, контекстно-зависимый, решает текущие задачи.
- **Роль**: Архитектор и "Захватчик" (Capture).
- **Задачи**:
  - Выявляет новые паттерны в процессе кодинга.
  - Определяет, когда навык устарел или требует разделения.
  - Пишет высокоуровневые задания в `BACKLOG.md` (action=create/update/merge).
  - Описывает сложные архитектурные нюансы в поле `context`.

### 2. Continue Agent (Background / Headless)
- **Характер**: Методичный, неспешный, работает в фоне.
- **Роль**: "Писатель" (Drafter) и "Аудитор" (Auditor).
- **Задачи**:
  - Берет задания из `BACKLOG.md`.
  - Генерирует детальный контент по шаблонам.
  - Выполняет рутинные проверки (ссылки, теги, структура).
  - Проводит фоновый аудит кода на соответствие Skills.

## Collaboration Workflow

1. **Discovery (Cursor)**: В ходе работы Cursor понимает: "Это общее правило".
2. **Tasking (Cursor)**: Cursor вызывает `propose_skill` (через MCP), передавая краткую суть и сложный контекст.
3. **Orchestration (n8n)**: n8n видит задачу, запускает фонового агента (Continue/Ollama).
4. **Processing (Continue)**: Фоновый агент превращает "суть" в "ген" (Skill file) в папке `drafts/`.
5. **Human Gate**: Человек проверяет черновик.
6. **Integration**: После одобрения навык становится частью организма.

## Context Passing Rules
Cursor Agent ДОЛЖЕН передавать в поле `context`:
- Специфические технические решения, которые сложно "додумать".
- Ссылки на конкретные файлы кода.
- Примеры ошибок или успешных решений.

## Quality Assurance
- Фоновый агент раз в сутки проверяет все Skills на "протухание" (Staleness).
- Если код в MBB значительно изменился, а Skill — нет, агент создает задачу `action=revalidate`.

## References
- `process-skills-lifecycle.md`
- `process-n8n-mcp-integration.md`
- `BACKLOG.md`
