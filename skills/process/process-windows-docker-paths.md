---
id: process-windows-docker-paths
title: Process: Windows Docker Paths
scope: skills
tags: [#process, #docker, #windows, #paths, #troubleshooting]
priority: high
created_at: 2026-01-27
updated_at: 2026-02-10
---

# Process: Windows Docker Paths

> **Context**: Fixing path conversion issues in Git Bash/Windows and managing Docker lifecycle.
> **Problem**: Git Bash converts `/` to `C:/Program Files/Git/...`. Docker daemon may be unreachable if not in autostart.

## 1. The Fix
Use **PowerShell** or escape paths for complex Docker commands. Ensure Docker Desktop is running in the system tray.

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

## 3. Docker Lifecycle & Environment
### Daemon Connectivity
- If `failed to connect to the docker API` occurs:
  1. Check if Docker Desktop is running (Windows System Tray).
  2. Ensure Docker Desktop is in **Windows Startup**.
  3. Verify `docker context ls` shows `default` as active.

### Working Directory
- **Crucial**: Always run `docker-compose` commands from the project root (e.g., `d:\...\MBB`). Running from `C:\Users\AO` will result in `no configuration file provided: not found`.

### Environment Updates
- Changing `.env` requires a full container recreate to propagate keys to n8n/Continue:
  ```bash
  docker-compose down && docker-compose up -d --force-recreate
  ```

## 4. Common Issues
- **`chmod` fails**: Path not found? Use PowerShell wrapper.
- **`find` fails**: Path conversion messes up arguments.
- **Empty images list**: Occurs when terminal context is wrong or Docker Desktop just started. Wait 30s and retry from project root.

## 5. Rule
For cross-platform scripts, prefer **PowerShell** or Node.js (`child_process`) over raw Bash scripts on Windows. Always verify project root before executing `docker-compose`.
