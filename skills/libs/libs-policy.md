---
id: libs-policy
title: Libs: Usage Policy
scope: skills
tags: [#libs, #policy, #vue, #dependencies]
priority: medium
created_at: 2026-01-24
updated_at: 2026-02-01
---

# Libs: Usage Policy

> **Context**: Rules for choosing between external libraries and custom implementations.
> **SSOT**: `docs/doc-lib-vue.md`

## 1. Core Rule
**Check Libs First**: Before writing custom modules, check for existing Vue libraries with extensible APIs.

## 2. Priority Criteria
Prefer a library if:
1.  **Extensible API**: Supports plugins, composables, or config injection.
2.  **CDN Support**: Works via `<script>` tag without build steps (UMD).
3.  **Active**: Maintained community support.

## 3. Exceptions (When to Code)
Write custom modules if:
1.  **Missing**: No suitable library exists.
2.  **Bloat**: Library is too heavy for the feature.
3.  **Business Logic**: Highly specific domain requirements.

## 4. File Map
- `@core/lib-loader.js`: Loading mechanism.
