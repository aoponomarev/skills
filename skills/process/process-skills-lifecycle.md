---
title: Skills Lifecycle Management
tags: [#process, #skills, #automation]
dependencies: [process-skill-template, process-n8n-mcp-integration, process-skills-scope-routing]
mcp_resource: true
updated_at: 2026-01-26
---

# Skills Lifecycle Management

> Skills — это "гены" нашего приложения. Их здоровье определяет качество всей системы.

## Lifecycle Operations

| Action | Описание | Триггер |
|--------|----------|---------|
| **CREATE** | Создание нового Skill | Выявлен новый паттерн/правило |
| **UPDATE** | Обновление существующего | Skill устарел или неполон |
| **MERGE** | Объединение Skills | Дублирование контента |
| **SPLIT** | Разделение Skill | Превышен размер (>150 строк) |
| **DEPRECATE** | Архивация | Skill больше не актуален |
| **REVALIDATE** | Проверка актуальности | Код изменился |

## BACKLOG Protocol

### Формат записи
```
- [action=<action>] [status=pending] title="<Title>" | scope="<Scope>" | 
  skill_id="<existing_id>" | changes="<description>" | 
  tags=[tag1, tag2] | priority="<low|medium|high|critical>" | 
  context="<cursor_context>" | timestamp=<ISO8601>
```

### Примеры

**CREATE:**
```
- [action=create] [status=pending] title="cache-invalidation-rules" | 
  scope="Правила инвалидации кэша при изменении данных" | 
  tags=[cache, core-systems] | priority="high" | 
  context="При работе с fetchPortfolio обнаружена неочевидная логика инвалидации" |
  timestamp=2026-01-26T15:00:00Z
```

**UPDATE:**
```
- [action=update] [status=pending] skill_id="cache-strategy" | 
  changes="Добавить раздел о TTL для разных типов данных" | 
  priority="medium" | timestamp=2026-01-26T15:00:00Z
```

**MERGE:**
```
- [action=merge] [status=pending] source="cache-keys,cache-versioning" | 
  target="cache-management" | priority="low" | timestamp=2026-01-26T15:00:00Z
```

**DEPRECATE:**
```
- [action=deprecate] [status=pending] skill_id="old-api-integration" | 
  reason="API больше не используется, заменен на новую интеграцию" | 
  priority="low" | timestamp=2026-01-26T15:00:00Z
```

## Workflow Stages

### 1. Capture (Cursor Agent)
Cursor Agent работает с кодом и выявляет потребности:
- "Это должен быть Skill" → `action=create`
- "Skill X устарел" → `action=update`
- "Skills A и B дублируются" → `action=merge`

### 2. Queue (BACKLOG.md)
Все предложения попадают в единую очередь с приоритизацией.

### 3. Process (n8n + Background Agent)
n8n маршрутизирует задачу к соответствующему workflow:
- Drafter → генерация черновика
- Updater → патч существующего
- Composer → merge/split
- Archiver → перемещение в archive/

### 4. Review (drafts/)
Черновик ожидает проверки в `drafts/` со статусом:
- `[status=draft]` — ожидает review
- `[status=approved]` — одобрен к публикации
- `[status=rejected]` — отклонен с причиной

### 5. Publish (Human Approval Required)
После одобрения:
1. Файл перемещается в `skills/`
2. Индексы обновляются
3. Git commit + push
4. Уведомление о публикации

## Quality Gates

| Gate | Проверка |
|------|----------|
| **Front-matter** | YAML валиден, все поля заполнены |
| **Size** | < 150 строк (4 экрана) |
| **Links** | Все ссылки резолвятся |
| **Dependencies** | Зависимые Skills существуют |
| **Uniqueness** | Нет дублирования с существующими |

## Metrics

| Метрика | Цель |
|---------|------|
| Coverage | >80% ключевых модулей |
| Freshness | <30 дней для критичных Skills |
| Automation | >50% через автоматизацию |
| Approval Time | <24h |

## References
- `process-skill-template.md`
- `process-n8n-mcp-integration.md`
- `process-skills-scope-routing.md`
- `MBB/SKILLS_MASTER_ROADMAP.md`
