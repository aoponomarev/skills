---
id: process-n8n-workflow-hygiene
title: "n8n Workflow Hygiene: dedup, publish, rollout"
scope: skills
tags: [#process, #n8n, #workflows, #dedup, #publish, #operations]
priority: critical
created_at: 2026-02-10
updated_at: 2026-02-10
---

# n8n Workflow Hygiene: dedup, publish, rollout

> **Context**: In this project, repeated `import:workflow --overwrite` can create duplicate workflows with the same name but different IDs. This can silently route traffic through outdated logic.

## 1) Published vs Not Published (what it means)

- `Published` in n8n UI means workflow is active in production (webhooks/schedules can run).
- Without `Published`, workflow exists as draft/unpublished and does not serve production triggers.
- For this project, only production-facing V2 workflows should be published:
  - `V2_DASHBOARD_API`
  - `V2_SOURCES_MANAGER`
  - `V2_NEWS_Swarm`

## 2) Dedup Rule

For each workflow name:
1. Keep exactly one record.
2. Prefer currently active one, or latest verified one by `updatedAt`.
3. Remove all others.

Hard constraint: keep `DUPNAMES = 0`.

## 3) Safe Rollout Protocol

1. Export backup:
   - `n8n export:workflow --all --output=/tmp/workflows_backup.json`
2. Verify duplicates by name.
3. Remove duplicates (API or DB-maintenance procedure).
4. Restart n8n.
5. Verify:
   - all production workflows published
   - duplicates count is zero
   - smoke tests pass (`/webhook/v2/check-updates`, `/webhook/v2/tasks`, dashboard APIs)

## 4) Import Pitfall

- `import:workflow --overwrite` may append a new workflow instead of replacing existing one by name.
- Always check post-import inventory and active IDs.

## 5) Operational Checklist (every workflow change)

- [ ] backup exported
- [ ] duplicate scan completed
- [ ] active IDs validated
- [ ] required workflows published
- [ ] old duplicates removed
- [ ] smoke tests passed
