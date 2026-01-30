---
title: "Process: Windows + Docker Path Handling"
tags: [#process, #docker, #windows, #troubleshooting]
dependencies: []
mcp_resource: true
updated_at: 2026-01-27
---

# Process: Windows + Docker Path Handling

## Scope
- Особенности работы с Docker на Windows через различные shell.
- Преобразование путей в Git Bash.
- Корректное использование docker exec и docker cp.

## When to Use
- При ошибках вида "No such file or directory" с путями типа `C:/Program Files/Git/...`
- При работе с Docker из Git Bash на Windows.
- При написании кросс-платформенных скриптов автоматизации.

## Key Rules

### 1. Git Bash преобразует Unix-пути
Git Bash автоматически конвертирует пути, начинающиеся с `/`, в Windows-пути:

```bash
# ЧТО ВЫ ВВОДИТЕ:
docker exec container cat /home/node/file.txt

# ЧТО GIT BASH ПЕРЕДАЕТ В DOCKER:
docker exec container cat C:/Program Files/Git/home/node/file.txt
```

### 2. Решения

#### Вариант A: Использовать PowerShell
```bash
powershell -Command "docker exec container cat /home/node/file.txt"
```

#### Вариант B: Двойной слэш
```bash
docker exec container cat //home/node/file.txt
```

#### Вариант C: Переменная MSYS_NO_PATHCONV
```bash
MSYS_NO_PATHCONV=1 docker exec container cat /home/node/file.txt
```

#### Вариант D: Использовать cmd
```bash
cmd //c "docker exec container cat /home/node/file.txt"
```

### 3. Команды с && в PowerShell
PowerShell не поддерживает `&&` для цепочки команд:

```powershell
# НЕПРАВИЛЬНО:
docker stop container && docker start container

# ПРАВИЛЬНО (PowerShell 7+):
docker stop container; if ($?) { docker start container }

# ИЛИ отдельные вызовы
```

### 4. Пробелы в путях
```bash
# НЕПРАВИЛЬНО (Cursor Shell может не понять):
cd "d:\Clouds\AO\OneDrive\Portfolio-CV\..."

# ПРАВИЛЬНО: Использовать working_directory параметр
# или относительные пути без пробелов
```

## Примеры типичных проблем

### Проблема: chmod не работает
```bash
# Git Bash:
docker exec n8n chmod 666 /home/node/.n8n/database.sqlite
# Ошибка: chmod: C:/Program Files/Git/home/node/.n8n/database.sqlite: No such file

# Решение через PowerShell:
powershell -Command "docker exec n8n chmod 666 /home/node/.n8n/database.sqlite"
```

### Проблема: docker cp с абсолютным путем
```bash
# Из Git Bash (может сломаться):
docker cp n8n:/home/node/.n8n/file.txt ./local-file.txt

# Безопаснее через PowerShell для сложных путей
```

### Проблема: find в Docker
```bash
# Git Bash преобразует -name patterns:
docker exec container find /home -name "*.txt"
# Может сломаться!

# Через PowerShell:
powershell -Command "docker exec container find /home -name '*.txt'"
```

## Рекомендуемый подход

1. **Для простых команд** без путей — Git Bash работает нормально
2. **Для команд с путями внутри контейнера** — использовать PowerShell wrapper
3. **Для скриптов автоматизации** — всегда через PowerShell для кросс-платформенности

## References
- [MSYS Path Conversion](https://www.msys2.org/docs/filesystem-paths/)
- [Docker on Windows](https://docs.docker.com/desktop/windows/)

## Metadata
- tags: #process #docker #windows #troubleshooting #git-bash
- dependencies: []
- updated_at: 2026-01-27
- source_refs: []
