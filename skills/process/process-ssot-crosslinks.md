---
title: "Process: SSOT and Cross-Links"
tags:
  - "#process"
  - "#ssot"
dependencies: []
mcp_resource: true
updated_at: 2026-01-24
---

# Process: SSOT and Cross-Links

## Scope
- Rules for single source of truth (SSOT) across `skills/` and `skills-mbb/`.
- Cross-link conventions to avoid duplication and broken navigation.

## When to Use
- When creating or updating any skill file.
- When deciding whether a rule is general or MBB-specific.

## Key Rules
- **SSOT first**: General rules go only to `skills/`. Project-specific rules go only to `skills-mbb/`.
- **No duplication**: If a rule already exists in `skills/`, reference it from `skills-mbb/`.
- **Explicit links**: Use relative links to the source skill in the references section.
- **Index alignment**: Ensure every new skill is listed in the relevant `index-*.md`.

## Workflow
1) Classify the rule as general or MBB-specific.
2) Create/modify the skill in the correct repo.
3) Add cross-links to related skills (no copy-paste).
4) Update the relevant index file.

## References
- `skills/index/index-operations.md`
- `skills-mbb/skills/index/index-mbb.md`
