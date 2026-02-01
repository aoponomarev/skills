---
id: process-skills-lifecycle
title: Process: Skills Lifecycle
scope: skills
tags: [#process, #lifecycle, #automation]
priority: high
created_at: 2026-01-26
updated_at: 2026-02-01
---

# Process: Skills Lifecycle

> **Context**: From Idea to Deprecation.

## 1. States
1.  **Pending**: In `BACKLOG.md`.
2.  **Draft**: In `drafts/` (Review needed).
3.  **Active**: In `skills/` (Published).
4.  **Deprecated**: In `archive/`.

## 2. Actions
- **Create**: New pattern.
- **Update**: Refinement.
- **Merge**: Dedup.
- **Split**: Decompose.
- **Deprecate**: Obsolescence.

## 3. Gates
- **Front-Matter**: Valid YAML.
- **Links**: Valid paths.
- **Uniqueness**: No overlaps.

## 4. File Map
- `@BACKLOG.md`: The Queue.
- `@skills/`: The Library.
