---
id: process-paths-management
title: "Управление путями в проекте (ЕЕИИПП)"
description_ru: "Контроль использования относительных путей, переменных и предотвращение хардкода абсолютных путей в проектах."
scope: "Стандарты именования путей, переменные окружения, миграция между машинами."
tags: [#process, #paths, #ssot, #infrastructure, #windows, #portability]
priority: high
created_at: 2026-01-30
updated_at: 2026-01-30
dependencies: ["process-infrastructure-maintenance", "architecture-ssot"]
---

# Управление путями в проекте (ЕЕИИПП)

## Scope
Этот skill определяет правила работы с путями в проекте для обеспечения:
- Переносимости между машинами (Home/Office)
- Единообразия в конфигурационных файлах
- Предотвращения битых ссылок при переименовании папок

## When to Use
- Добавление нового компонента/скрипта с путями к файлам
- Миграция проекта на другую машину
- Переименование папок в иерархии
- Ревью кода на предмет хардкода путей
- Исправление ошибок "путь не найден" после переезда

## Key Rules

### 1. Иерархия путей (STATISTICS_ROOT)

```
${STATISTICS_ROOT}/              # Корень всех проектов
├── MBB/                         # Основной проект
├── skills/                      # Общие навыки
├── skills-mbb/                  # MBB-специфичные навыки
└── libs/                        # Библиотеки
```

**Правило:** Все пути внутри проекта должны быть **относительными** от `STATISTICS_ROOT`.

### 2. SSOT для путей
**Единственный источник правды:** `MBB/INFRASTRUCTURE_CONFIG.yaml` → секция `paths`.

```yaml
paths:
  statistics_root: "D:\\Clouds\\AO\\OneDrive\\Portfolio-CV\\Refactoring\\ToDo\\Statistics"
  mbb: "./MBB"
  skills: "./skills"
  skills_mbb: "./skills-mbb"
  libs: "./libs"
  continue_ssot: "D:\\Clouds\\AO\\OneDrive\\AI\\.continue"
```

### 3. Запрещённые паттерны (Anti-patterns)

❌ **Хардкод абсолютных путей в коде:**
```python
# ❌ НЕПРАВИЛЬНО
path = "D:\\Clouds\\AO\\OneDrive\\Portfolio-CV\\Refactoring\\ToDo\\Statistics\\skills"
```

✅ **Правильно: относительные пути или переменные:**
```python
# ✅ ПРАВИЛЬНО
import os
statistics_root = os.environ.get('STATISTICS_ROOT', os.path.dirname(os.path.dirname(__file__)))
skills_path = os.path.join(statistics_root, 'skills')
```

❌ **Абсолютные пути в документации:**
```markdown
# ❌ НЕПРАВИЛЬНО
Файл находится в `D:\Clouds\AO\OneDrive\Portfolio-CV\Refactoring\ToDo\Statistics\skills\`
```

✅ **Правильно: переменные или относительные ссылки:**
```markdown
# ✅ ПРАВИЛЬНО
Файл находится в `${STATISTICS_ROOT}/skills/` (см. INFRASTRUCTURE_CONFIG.yaml → paths)
```

### 4. Переменные окружения

| Переменная | Назначение | Пример значения |
|------------|------------|-----------------|
| `STATISTICS_ROOT` | Корень всех проектов | `D:\Clouds\AO\OneDrive\Portfolio-CV\Refactoring\ToDo\Statistics` |
| `CONTINUE_HOME` | SSOT конфигурации Continue | `D:\Clouds\AO\OneDrive\AI\.continue` |
| `MBB_ROOT` | Корень проекта MBB | `${STATISTICS_ROOT}/MBB` |

### 5. Миграция при смене пути

**Checklist при переезде проекта:**

1. **Обновить `INFRASTRUCTURE_CONFIG.yaml`:**
   - Изменить `paths.statistics_root` на новый путь
   - Проверить `paths.continue_ssot` (если Continue в другом месте)

2. **Сканировать проект на хардкод:**
   ```bash
   # PowerShell: поиск старого пути
   rg "Portfolio - CV" --type-add 'config:*.{yaml,yml,json,md,py,js}' -t config
   ```

3. **Обновить junction для Continue:**
   ```cmd
   mklink /J "%USERPROFILE%\.continue" "НОВЫЙ_ПУТЬ\.continue"
   ```

4. **Проверить Docker volumes:**
   - `docker-compose.yml` использует относительные пути `./`, `../` — ОК
   - Проверить, что Docker Desktop видит новый путь

## Workflow: Добавление нового пути

1. Определить: путь внутри `STATISTICS_ROOT` или внешний?
2. **Внутренний путь:** использовать относительную ссылку `./` или `../`
3. **Внешний путь:** добавить в `INFRASTRUCTURE_CONFIG.yaml` → `paths`
4. В документации ссылаться на переменную: `${VARIABLE}` или `paths.xxx из INFRASTRUCTURE_CONFIG.yaml`
5. В коде использовать `os.environ` или вычислять относительно `__file__`

## Quality Gate: Проверка путей

**При каждом ревью проверять:**
- [ ] Нет хардкода абсолютных путей в коде
- [ ] Нет абсолютных путей в документации (кроме ссылок на SSOT)
- [ ] Новые внешние пути добавлены в `INFRASTRUCTURE_CONFIG.yaml`
- [ ] Пути в Docker используют относительные `./` или `../`

## Recovery: Битые пути после переезда

1. Найти все упоминания старого пути:
   ```bash
   rg "СТАРЫЙ_ПУТЬ" --no-ignore
   ```

2. Заменить на новый или относительный:
   - В YAML/JSON: обновить значение
   - В MD: использовать `${VARIABLE}`
   - В коде: переписать на относительный от `__file__`

3. Проверить работоспособность:
   - `docker compose up` — контейнеры запускаются
   - Скрипты выполняются без ошибок "path not found"

## References
- `MBB/INFRASTRUCTURE_CONFIG.yaml` — SSOT для путей
- `skills-mbb/skills/process/process-continue-config-ssot.md` — SSOT для Continue
- `skills/skills/process/process-skills-scope-routing.md` — распределение между skills

## Metadata
- tags: #process #paths #ssot #infrastructure #windows #portability
- dependencies: process-infrastructure-maintenance, architecture-ssot
- updated_at: 2026-01-30
