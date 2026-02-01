---
id: process-multi-agent-collaboration
title: Process: Multi-Agent Collaboration
scope: skills
tags: [#process, #agents, #collaboration]
priority: high
created_at: 2026-01-26
updated_at: 2026-02-01
---

# Process: Multi-Agent Collaboration

> **Context**: Division of labor between Cursor (Active) and Continue (Background) agents.

## 1. Roles

### Cursor Agent (Architect/Capture)
- **Fast, Context-Aware**.
- **Task**: Writes code, identifies patterns, creates `BACKLOG` entries.
- **Output**: `action=create` in `BACKLOG.md`.

### Continue Agent (Drafter/Auditor)
- **Slow, Methodical**.
- **Task**: Reads `BACKLOG`, drafts Skills, validates links.
- **Output**: `.md` files in `drafts/`.

## 2. Workflow
1.  **Discovery**: Cursor spots a reusable pattern.
2.  **Capture**: Cursor adds to `BACKLOG.md`.
3.  **Draft**: Background agent (script/n8n) picks up task and writes Draft.
4.  **Review**: Human approves.
5.  **Publish**: Skill enters system.

## 3. File Map
- `@BACKLOG.md`: The Handoff Point.
