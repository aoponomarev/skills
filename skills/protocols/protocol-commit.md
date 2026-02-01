---
id: protocol-commit
title: Protocol: Git Commit
scope: skills
tags: [#protocol, #git, #commit, #workflow]
priority: high
created_at: 2026-01-24
updated_at: 2026-02-01
---

# Protocol: Git Commit

> **Context**: Standard procedure for saving changes.
> **Source**: `.cursorrules`

## 1. Workflow
1.  **Status**: Run `git status`. Check staging area.
2.  **Scope**: Separate infrastructure/config changes from logic/features.
3.  **Message**: Concise, imperative (e.g., "Add user auth", not "Added...").
4.  **Action**: `git add <files>` -> `git commit -m "..."`.
5.  **Verify**: Run `git status` again.

## 2. Hard Constraints
1.  **Explicit Command**: Commit ONLY when explicitly asked ("commit", "save").
2.  **Atomic**: Do not mix massive refactors with tiny fixes.
3.  **Safety**: No destructive commands (`reset --hard`, `push -f`) without confirmation.

## 3. File Map
- `@.cursorrules`: Trigger definitions.
