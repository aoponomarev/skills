---
id: docker-v29-overlay-regression
title: "Docker v29.0-v29.2.0 Encrypted Overlay Network Regression"
scope: skills
tags: [#troubleshooting, #docker, #networking, #overlay, #regression]
priority: high
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: moby/29.2.1
---

# Docker v29.0-v29.2.0 Encrypted Overlay Network Regression

> **Context**: Docker Engine versions 29.0.0 through 29.2.0 have a critical regression where encrypted overlay networks fail to pass traffic to containers on older engine nodes.

## 1. Affected Versions

- Docker 29.0.0, 29.0.1, 29.1.0, 29.2.0
- Also backported fixes: 28.2.2, 25.0.14, 25.0.13

## 2. Symptoms

- Containers on overlay networks cannot communicate
- Traffic drops between nodes with different Docker Engine versions
- No error messages — just silent packet loss

## 3. Fix

Upgrade Docker Desktop to **v29.2.1** or later.

### Current Project State
- **Host Docker**: v29.2.0 (AFFECTED)
- **Recommendation**: Update Docker Desktop to v29.2.1+

### How to Update
1. Open Docker Desktop
2. Check for updates (Settings → General → Check for updates)
3. Or download from https://docs.docker.com/desktop/release-notes/

## 4. Other Fixes in v29.2.1

- `docker system df` no longer fails when run concurrently with `docker system prune`
- Fixed daemon panic after failed initialization
- Fixed duplicate container exit events (repeated cleanup/state transitions)
- Fixed potential panic on `docker network prune`

## 5. Project Impact

Our project uses two containers (`n8n-mbb`, `continue-cli`) on the default bridge network, NOT overlay. However:
- If project scales to Docker Swarm or multi-node setup, this is critical
- The daemon panic fix is relevant for all setups
- The `docker system prune` fix prevents data cleanup issues
