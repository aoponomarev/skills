---
id: process-agent-commands
title: Process: Agent Commands
scope: skills
tags: [#process, #agent, #commands, #омк]
priority: medium
created_at: 2026-01-25
updated_at: 2026-02-01
---

# Process: Agent Commands

> **Context**: User commands controlling Agent behavior.
> **Triggers**: `ОМК`, `ЕИП`, `АИС`.

## 1. Command Dictionary
- **`ОМК`**: "Answer Maximally Briefly". No fluff.
- **`EI`**: External Integrations check.
- **`ЕИП`**: SSOT verification (Unified Source of Truth).
- **Chain**: `ОМК` + `ЕИП` -> Brief SSOT check.

## 2. Rules
1.  **SSOT**: Final rules live in Skills, not chat.
2.  **Read-Only**: Do not edit Skills without explicit "Update Skill" command.
3.  **Brevity**: In `ОМК` mode, provide ONLY the requested data.

## 3. File Map
- `@process/protocol-command-omk.md`: `ОМК` Protocol.
