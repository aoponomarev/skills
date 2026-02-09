---
id: docker-code-not-updating
title: "Troubleshooting: Docker Container Ignoring Code Changes"
scope: skills
tags: [#troubleshooting, #docker, #bind-mount, #windows, #node]
priority: high
created_at: 2026-02-09
updated_at: 2026-02-09
---

# Troubleshooting: Docker Container Ignoring Code Changes

> **Context**: You edit `server.js` (or any file), but the Docker container keeps serving old behavior. Bind mount shows updated file, but running process uses cached version.

## 1. Scope / When to Use

- Code file on host was modified.
- `docker exec cat /path/to/file` shows updated content.
- But the running application still behaves per the OLD code.
- Restarting the container doesn't help.

## 2. Diagnosis Checklist (in order)

### A. Rule out port shadow (most common)

```bash
netstat -ano | findstr "YOUR_PORT"
```
If TWO PIDs are listening -- see skill `docker-port-shadow-diagnosis`.

### B. Check if `docker restart` actually re-runs CMD

`docker stop/start` kills and resumes the SAME container. On some Docker versions, if PID 1 is `sh -c "... && node server.js"`, the shell may be resumed but the child `node` process restarted. However:

- `docker-compose restart` = stop + start (same container, CMD re-executed)
- `docker-compose up -d --force-recreate` = destroy + create new container (guaranteed fresh)
- `docker stop X && docker start X` = stop + start (CMD re-executed, but same container state)

**Always prefer `docker-compose up -d --force-recreate SERVICE`** when code changed.

### C. Verify bind mount is active

```bash
docker inspect CONTAINER --format '{{json .Mounts}}' | python -m json.tool
```

Check that the `Source` points to your actual host directory and `Type` is `bind`.

### D. Check if the application caches modules

Node.js `require()` caches modules on first load. If `server.js` requires a module that was loaded before the file changed, Node won't re-read it. This is only relevant when using `nodemon` or hot-reload, NOT on full process restart.

### E. Windows + OneDrive edge case

On Windows, if files are in an OneDrive-synced folder, Docker bind mounts may experience delays. OneDrive can lock files or present stale content via its virtual filesystem. Verify with:

```bash
docker exec CONTAINER md5sum /path/to/file
md5sum /host/path/to/file
```

If hashes differ, OneDrive sync is lagging. Wait or force sync.

## 3. Key Rules

1. **Always start with port shadow check** -- it's the most common cause (see section 2A).
2. Use `--force-recreate` for code changes, not `restart`.
3. Verify the bind mount source with `docker inspect`, not assumptions.
4. For critical debug: add `console.log` with unique marker INSIDE the function you're testing, then check container logs for that marker.
5. Test from INSIDE the container first: `docker exec CONTAINER node -e "http.request(...)"` -- if this works correctly but external doesn't, it's a port/network issue, not a code issue.

## 4. Quick Debug Template

```bash
# 1. Port shadow?
netstat -ano | findstr "3002"

# 2. Force recreate
docker-compose up -d --force-recreate SERVICE_NAME

# 3. Wait for startup
sleep 15

# 4. Test internally
docker exec CONTAINER sh -c "node -e \"fetch('http://localhost:3000/endpoint').then(r=>r.text()).then(console.log)\""

# 5. Test externally
curl -s http://localhost:3002/endpoint

# 6. Compare results -- if different, it's a port shadow
```

## 5. Hard Constraints

- NEVER spend more than 5 minutes on "file is correct but behavior is wrong" without running `netstat`/`lsof`.
- NEVER assume `docker restart` is equivalent to `docker-compose up --force-recreate`.
