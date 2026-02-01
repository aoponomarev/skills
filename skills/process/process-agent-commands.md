---
id: process-agent-commands
title: Process: Agent Commands
scope: skills
tags: [#process, #agent, #commands, #omk]
priority: medium
created_at: 2026-01-25
updated_at: 2026-02-01
---

# Process: Agent Commands

> **Context**: User commands controlling Agent behavior.
> **Triggers**: `omk`, `eeiipp`, `aaiss`.

## 1. Command Dictionary
- **OMK** (ооммкк): "Answer Maximally Briefly". No fluff.
- **EI** (ei): External Integrations check.
- **EEIIPP** (ееиипп): SSOT verification.
- **Chain**: `omk eeiipp` -> Brief SSOT check.

## 2. Rules
1.  **SSOT**: Final rules live in Skills, not chat.
2.  **Read-Only**: Do not edit Skills without explicit "Update Skill" command.
3.  **Brevity**: In OMK mode, provide ONLY the requested data.

## 3. File Map
- `@process/protocol-command-omk.md`: OMK Protocol.
