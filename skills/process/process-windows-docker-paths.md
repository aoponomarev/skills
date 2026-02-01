---
id: process-windows-docker-paths
title: Process: Windows Docker Paths
scope: skills
tags: [#process, #docker, #windows, #paths]
priority: high
created_at: 2026-01-27
updated_at: 2026-02-01
---

# Process: Windows Docker Paths

> **Context**: Fixing path conversion issues in Git Bash/Windows.
> **Problem**: Git Bash converts `/` to `C:/Program Files/Git/...`.

## 1. The Fix
Use **PowerShell** or escape paths for complex Docker commands.

## 2. Patterns
### Git Bash
```bash
# Bad (Converts path)
docker exec container cat /home/node/file.txt

# Good (Escape)
docker exec container cat //home/node/file.txt
# Or
MSYS_NO_PATHCONV=1 docker exec ...
```

### PowerShell (Recommended)
```powershell
docker exec container cat /home/node/file.txt
```

## 3. Common Issues
- **`chmod` fails**: Path not found? Use PowerShell wrapper.
- **`find` fails**: Path conversion messes up arguments.

## 4. Rule
For cross-platform scripts, prefer **PowerShell** or Node.js (`child_process`) over raw Bash scripts on Windows.
