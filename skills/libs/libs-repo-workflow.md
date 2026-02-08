---
id: libs-repo-workflow
title: Libs: Repo Workflow
scope: skills
tags: [#libs, #workflow, #git, #cdn]
priority: medium
created_at: 2026-01-24
updated_at: 2026-02-08
---

# Libs: Repo Workflow

> **Context**: Managing the `libs` repository and dependency updates.
> **Trigger**: New library needed or version update.

## 1. Triggers
- Adding a new lib to `LIB_SOURCES`.
- Version bump.
- Discrepancy between config and files.

## 2. Automation Logic
1.  **Check**: Is file in `libs/<name>/<version>/`?
2.  **Fetch**: If missing, download UMD from CDN (jsdelivr/cdnjs).
3.  **Update**: Modify `core/lib-loader.js`.
4.  **Notify**: Ask user to commit changes to `libs`.

## 3. Constraints
- **Explicit Commit**: Automation prepares files; User commits.
- **UMD Only**: Must support browser loading.

## 4. File Map
- `@libs/`: The repository.
