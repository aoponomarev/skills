---
title: Process: Skill Template
tags: [#process, #skills]
dependencies: []
mcp_resource: true
updated_at: 2026-01-24
---

# Process: Skill Template

## Scope
- Единый шаблон структуры skill-файла.
- Обязательные разделы и правила оформления.

## When to Use
- При создании нового навыка.
- При приведении старых навыков к стандарту.

## Key Rules
- **Структура едина**: использовать одинаковые заголовки во всех skill-файлах.
- **SSOT**: не дублировать правила — ссылаться на базовые навыки.
- **Краткость**: 2–4 экрана текста на skill-файл.

## Template
```
# Skill Title

## Scope
- Что покрывает
- Что не покрывает

## When to Use
- Триггеры/сигналы

## Key Rules
- 3–7 правил, коротко и практично
- Дубли не допускаются (SSOT)

## Workflow
1) Шаги
2) Ветки решений
3) Условия остановки

## References
- Пути к коду
- Related skills
- Внешние источники

## Metadata
- tags:
- dependencies:
- updated_at:
- source_refs:
```

## References
- `skills/process/process-skills-granularity.md`
