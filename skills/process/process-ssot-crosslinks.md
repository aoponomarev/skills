---
id: process-ssot-crosslinks
title: Process: SSOT & Cross-Links
scope: skills
tags: [#process, #ssot, #links, #structure]
priority: high
created_at: 2026-01-24
updated_at: 2026-02-01
---

# Process: SSOT & Cross-Links

> **Context**: Managing truth across two repositories (`skills`, `skills-mbb`).

## 1. Core Rule
**One Home**: A rule exists in ONE place.
- **General**: `skills/`
- **Project**: `skills-mbb/`

## 2. Linking
If `skills-mbb` needs a general rule:
- **Do NOT Copy**: Link to `../skills/process/rule.md`.
- **Reference**: Use relative paths in `References` section.

## 3. Indexing
Every new skill MUST be listed in the relevant Index:
- `skills/index/index-operations.md`
- `skills-mbb/skills/index/index-mbb.md`

## 4. File Map
- `@skills/`: Global rules.
- `@skills-mbb/`: Project implementation.
