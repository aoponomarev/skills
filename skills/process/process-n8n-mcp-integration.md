---
id: process-n8n-mcp-integration
title: Process: n8n & MCP Integration
scope: skills
tags: [#process, #n8n, #mcp, #orchestration]
priority: high
created_at: 2026-01-26
updated_at: 2026-02-08
---

# Process: n8n & MCP Integration

> **Context**: Orchestrating Knowledge Management via Tools.

## 1. Responsibilities

### MCP Tools (Fast/Read)
- **Tools**: `list_skills`, `read_skill`, `propose_skill`.
- **Role**: Discovery for Agents.
- **Write**: ONLY to `events/SKILL_CANDIDATES.json`.

### n8n Workflows (Slow/Write)
- **Role**: Lifecycle Automation (Drafting, Archiving).
- **Write**: Creates files in `drafts/tasks/`, updates Status.

## 2. Integration Flow
1.  **Suggest**: Agent calls `propose_skill` -> Entry in `events/SKILL_CANDIDATES.json`.
2.  **Watch**: n8n detects `pending` entry.
3.  **Draft**: n8n (via LLM) writes Draft to `drafts/tasks/`.
4.  **Notify**: Human gets alert to review.

## 3. Hard Constraints
- **Human Gate**: No auto-publish. Review required.
- **SSOT**: `events/SKILL_CANDIDATES.json` is the source of truth for pending work.

## 4. File Map
- `@mcp/`: Tool definitions.
- `@events/SKILL_CANDIDATES.json`: Queue.
