---
title: Skills Scope Routing (skills vs skills-mbb)
tags: [#process, #skills, #ssot]
dependencies: [process-skills-lifecycle, process-ssot-crosslinks]
mcp_resource: true
updated_at: 2026-01-26
---

# Skills Scope Routing (skills vs skills-mbb)

## Purpose
Гарантировать корректное распределение навыков между:
- `skills/` (общие, межпроектные правила)
- `skills-mbb/` (проектные правила MBB)

## Scope Rules (Decision Gate)
Создавая или обновляя Skill, всегда отвечай на вопросы:
1. **Универсальность**: применимо ли правило к любому проекту? → `skills/`
2. **MBB-специфичность**: содержит ли правило конкретные пути, данные, инфраструктуру MBB? → `skills-mbb/`
3. **Интеграции MBB**: любые MBB-интеграции (Cloudflare/Yandex/n8n) → `skills-mbb/`
4. **Процессы и шаблоны**: общие процессы и шаблоны → `skills/`

## Placement Rules

### Goes to `skills/` (Global)
- Форматы документации
- Навыки безопасности (например, Secrets Hygiene)
- Процессы: lifecycle, шаблоны, SSOT
- Общие архитектурные принципы

### Goes to `skills-mbb/` (Project)
- Интеграции MBB (n8n, Cloudflare, Yandex)
- Архитектура и workflow, привязанные к MBB
- Конфигурации и пути конкретного проекта

## Relocation Protocol
Если навык оказался в неправильном репозитории:
1. **Mark**: добавить запись в `skills-mbb/BACKLOG.md`:
   `- [action=move] [status=pending] skill_id="..." | from="skills" | to="skills-mbb" | reason="..."`
2. **Move**: переместить файл и обновить кросс-ссылки.
3. **Index**: перегенерировать индексы в обоих репозиториях.
4. **Backlog cleanup**: пометить как `promoted`.

## Quality Gate
Перед публикацией:
- Проверить, что файл лежит в правильном репозитории.
- Проверить, что references указывают на правильный SSOT.

## References
- `process-skills-lifecycle.md`
- `process-ssot-crosslinks.md`
- `skills-mbb/BACKLOG.md`
