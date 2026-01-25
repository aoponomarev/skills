---
title: "Process: Code Header Skill Links"
tags:
  - "#process"
  - "#quality"
  - "#ssot"
dependencies: []
mcp_resource: true
updated_at: 2026-01-25
---

# Process: Code Header Skill Links

## Scope
- File-level header comments in code that describe module purpose or rules.
- How to link those headers to the single source of truth in Skills.

## When to Use
- When a file has a multi-line header comment describing behavior, rules, or architecture.
- When updating a module and the header might become outdated.

## Key Rules
- **Always link**: Add 1–2 `Skill:` links in the header for the closest matching Skills.
- **No duplication**: Do not re-state full rules in the header if they already live in Skills.
- **Keep it short**: Header explains purpose; details live in Skills.
- **Exceptions**: Small local scripts or trivial utilities can skip links.
- **Avoid multi-source drift**: If a rule changes, update the Skill first, then the header link (not the header text).

## Workflow
1) Identify whether the header describes reusable rules or architecture.
2) Link to existing Skills (or create a backlog entry if missing).
3) Keep the header summary minimal and accurate.
4) Update the relevant index file if a new Skill was created.

## References
- `skills/index/index-operations.md`
