---
id: process-code-header-skill-links
title: Process: Code Header Links
scope: skills
tags: [#process, #code, #links, #quality]
priority: medium
created_at: 2026-01-25
updated_at: 2026-02-01
---

# Process: Code Header Links

> **Context**: Linking code files to their governing Skills.

## 1. Rule
**Header Link**: Every significant file MUST have a header linking to its Skill SSOT.

## 2. Format
```javascript
/**
 * Core Data Logic
 * @see skills/architecture/A_CORE_DATA_LOGIC.md
 */
```

## 3. Workflow
1.  **Identify**: Does this file implement a documented pattern?
2.  **Link**: Add `@see` link to header.
3.  **Update**: If Skill moves, update link.

## 4. Constraints
- **Summary Only**: Header explains *what*; Skill explains *why* and *how*.
- **No Duplication**: Don't copy rules into comments.
