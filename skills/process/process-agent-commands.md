---
title: "Process: Agent Commands"
tags:
  - "#process"
  - "#agent"
dependencies: []
mcp_resource: true
updated_at: 2026-01-25
---

# Process: Agent Commands

## Scope
- Команды пользователя, влияющие на режим ответа и анализ.

## When to Use
- При получении команд ОМК, EI, ЕИП или их цепочек.

## Key Rules
- **ОМК**: отвечать максимально кратко, по сути.
- **EI**: анализ интеграций, без реализации.
- **ЕИП**: проверка единого источника правды и исключение дублей.
- **Цепочки**: применять все команды одновременно.
- **Single authoritative channel**: финальные правила — в Skills/Backlog, не в разрозненных заметках.
- **Read‑mostly MCP**: не редактировать Skills напрямую без явного запроса пользователя.

## Workflow
1) Распознать команду(ы) в запросе.
2) Применить соответствующие акценты.
3) Сохранить краткость и техностиль.

## References
- `skills/skills/process/process-ssot-crosslinks.md`
