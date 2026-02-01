---
id: process-doc-style
title: Process: Documentation Style
scope: skills
tags: [#process, #documentation, #style, #cyrillic]
priority: medium
created_at: 2026-01-25
updated_at: 2026-02-01
---

# Process: Documentation Style

> **Context**: "Telegraphic Technical" standard for Skills.

## 1. Style Guide
- **Tone**: Dry, precise, imperative. No slang.
- **Structure**:
  1.  **Context**: What is this?
  2.  **Rules**: What to do/not do.
  3.  **Workflow**: Steps.
  4.  **File Map**: Where to look.

## 2. Formatting
- **Lists**: Use numbered lists for sequences, bullets for sets.
- **Links**: Relative paths `../folder/file.md`.
- **Argumentation**: Critical rules need a *why* (one sentence).
- **Commands**: Always wrap commands and special terms in backticks: `` `npm install` ``.

## 3. Special Terminology (Cyrillic Anchors)
Core protocol commands MUST use Cyrillic abbreviations to serve as distinct semantic anchors, even within English documentation.
**ALWAYS** wrap them in backticks to prevent Markdown rendering issues.

- **Correct**: `` `ЕИП` ``, `` `ОМК` ``, `` `АИС` ``
- **Incorrect**: `ЕИП`, `_ОМК_`, `EEIIPP`

## 4. Constraints
- **Docs Freeze**: No new files in `docs/` (old folder). Use `skills/`.
- **English**: All new content in English (except the anchors above).

## 5. File Map
- `@skills/process/process-doc-levels.md`: Hierarchy.
