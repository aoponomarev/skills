---
id: process-doc-levels
title: Process: Documentation Levels
scope: skills
tags: [#process, #documentation, #hierarchy]
priority: medium
created_at: 2026-01-24
updated_at: 2026-02-08
---

# Process: Documentation Levels

> **Context**: Hierarchy of knowledge sources.

## Level 1: `.cursorrules` (Root)
Agent protocols, Git workflow, critical routing.

## Level 2: `skills/` & `docs/` (Architecture)
- **Skills**: Granular "How-To" and constraints.
- **Docs**: High-level "A_" architecture specs.

## Level 3: File Headers (Context)
- Purpose of the file.
- Links to L2 Skills.

## Level 4: Inline Comments (Details)
- Implementation nuances.
- Algorithm explanations.
- Edge cases.

## Rule
**No Overlap**: L4 should not repeat L2 rules. L3 links to L2.
