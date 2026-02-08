---
id: process-multi-agent-collaboration
title: Process: Multi-Agent Collaboration
scope: skills
tags: [#process, #agents, #collaboration]
priority: high
created_at: 2026-01-26
updated_at: 2026-02-08
---

# Process: Multi-Agent Collaboration

> **Context**: Division of labor between Cursor (Active) and Continue (Background) agents.

## 1. Roles

### Cursor Agent (Architect/Capture)
- **Fast, Context-Aware**.
- **Task**: Writes code, identifies patterns, creates Skill Candidates.
- **Output**: Entries in `events/SKILL_CANDIDATES.json`.

### Continue Agent (Drafter/Auditor)
- **Slow, Methodical**.
- **Task**: Analyzes candidates, drafts Skills, validates links.
- **Output**: `.md` files in `drafts/tasks/`.

## 2. Workflow
1.  **Discovery**: Cursor spots a reusable pattern.
2.  **Capture**: Cursor adds to `events/SKILL_CANDIDATES.json`.
3.  **Draft**: n8n V2 Workflows (`V2_NEWS_Swarm`) picks up candidates and writes Draft.
4.  **Review**: Human approves.
5.  **Publish**: Skill enters system.

## 3. File Map
- `@events/SKILL_CANDIDATES.json`: The Handoff Point.
