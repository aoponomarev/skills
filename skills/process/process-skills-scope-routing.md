---
id: process-skills-scope-routing
title: Process: Scope Routing
scope: skills
tags: [#process, #routing, #scope]
priority: high
created_at: 2026-01-26
updated_at: 2026-02-01
---

# Process: Scope Routing

> **Context**: Deciding where a skill belongs (`skills` vs `skills-mbb`).

## 1. Decision Matrix

### Go to `skills/` (Global)
- Universal standards (Git, Security).
- Process definitions (Lifecycle, Documentation).
- General Architecture patterns.

### Go to `skills-mbb/` (Project)
- Specific Integrations (n8n, Cloudflare).
- Project Configs/Paths.
- MBB Business Logic.

## 2. Relocation
If placed wrong:
1.  **Mark**: `action=move` in Backlog.
2.  **Move**: Physical file move.
3.  **Link**: Update cross-refs.

## 3. File Map
- `@skills/`: Global Repo.
- `@skills-mbb/`: Project Repo.
