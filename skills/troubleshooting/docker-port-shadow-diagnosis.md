---
id: docker-port-shadow-diagnosis
title: "Troubleshooting: Rogue Local Process Shadowing Docker Port"
scope: skills
tags: [#troubleshooting, #docker, #ports, #windows, #debugging, #n8n, #continue]
priority: high
created_at: 2026-02-09
updated_at: 2026-02-10
---

# Troubleshooting: Rogue Local Process Shadowing Docker Port

> **Context**: Docker container responds with old/wrong data despite code being correct inside container. `curl` returns stale responses, container logs don't show incoming requests.
> **Root cause**: Another process (often a forgotten local `node` server) listens on the same host port, intercepting requests before Docker's port forwarding.

## 1. Scope / When to Use

- Container code is verified correct (`docker exec grep` confirms updated file, `md5sum` matches host).
- External requests (`curl localhost:PORT`) return wrong/old responses.
- Container logs do NOT show `[POST]`/`[GET]` entries for your requests.
- Direct requests from INSIDE the container (`docker exec node -e "http.request(...)"`) return correct responses.
- `docker-compose up --force-recreate` doesn't help.
- **New**: Models show `NO_KEY` in UI despite `.env` being correct (n8n container using stale env or local proxy masking the real server).

## 2. Diagnosis Steps

### Step 1: Check who listens on the port

```bash
# Windows
netstat -ano | findstr "PORT_NUMBER"

# Linux/Mac
lsof -i :PORT_NUMBER
ss -tlnp | grep PORT_NUMBER
```

**Red flag**: TWO or more PIDs in LISTENING state on the same port.

### Step 2: Identify the rogue process

```powershell
# Windows
Get-Process -Id PID_NUMBER | Select-Object Name,Id,Path
Get-WmiObject Win32_Process -Filter 'ProcessId=PID_NUMBER' | Select-Object CommandLine
```

```bash
# Linux/Mac
ps -fp PID_NUMBER
```

### Step 3: Kill the rogue process

```powershell
# Windows
Stop-Process -Id PID_NUMBER -Force
```

```bash
# Linux/Mac
kill -9 PID_NUMBER
```

### Step 4: Verify only Docker remains

```bash
# Windows
netstat -ano | findstr "PORT_NUMBER"
# Should show only ONE PID (com.docker.backend on Windows)
```

## 3. Key Rules

- **Always check port listeners first** when container returns stale data but file content is correct.
- On Windows, both `com.docker.backend.exe` (Docker Desktop) and a local `node.exe` can bind to `0.0.0.0:PORT` simultaneously -- Windows does NOT always reject the second bind.
- The OS may route incoming connections to the first or most recently bound listener -- behavior is non-deterministic.
- `docker stop/start` and `docker-compose restart` will NOT fix this -- the rogue process is outside Docker.
- **Environment Sync**: If `.env` changed, `docker-compose restart` is NOT enough if the container uses `env_file`. Use `docker-compose up -d --force-recreate`.

## 4. Common Scenarios

| Symptom | Likely Cause |
|---|---|
| `curl` gets response but container logs are empty | Rogue local process intercepting |
| `docker exec` internal test works, external doesn't | Port shadow |
| Code changes "not applied" despite recreate | Wrong server answering |
| Response has fewer fields than expected | Old code version in rogue process |
| **(NO_KEY) labels in UI** | Local server (without .env) shadowing Docker server (with .env) |

## 5. Prevention

- Never run `node server.js` locally AND via Docker on the same port.
- Add port conflict check to startup scripts: `netstat -ano | findstr "3002"`.
- Use distinct ports for local dev (e.g., 3001) vs Docker (e.g., 3002).
- **Auto-start**: Ensure Docker Desktop is in Windows Startup to avoid "daemon not found" errors.
- **Working Directory**: Always run `docker-compose` commands from the project root containing `docker-compose.yml` (e.g., `d:\...\MBB`). Running from `C:\Users\AO` will fail with "no configuration file found".

## 6. Hard Constraints

- Do NOT just keep restarting Docker containers -- check for port shadows first.
- The diagnosis must start with `netstat`/`lsof`, not with file content checks.
- If Docker daemon is unreachable, verify Docker Desktop is running in the Windows System Tray.
- To refresh n8n/Continue with new `.env` keys:
  1. Kill any local `node` processes on port 3002.
  2. Run `docker-compose down && docker-compose up -d` from the project folder.
  3. Verify via `curl http://localhost:3002/api/v2/init`.
