---
id: libs-zod-v4-migration-plan
title: "Zod v3 → v4 Migration Plan"
scope: skills
tags: [#libs, #zod, #migration, #validation, #mcp]
priority: medium
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: zod/4.3.6
---

# Zod v3 → v4 Migration Plan

> **Context**: Project uses Zod v3.24.1 (installed: 3.25.76) in MCP servers (`skills-mcp`, `agents-mcp`). Zod v4.3.6 is available with breaking changes.

## 1. Current Usage

- `mcp/agents-mcp/package.json`: `"zod": "^3.24.1"`
- `mcp/skills-mcp/package.json`: `"zod": "^3.24.1"`
- Used for: input validation in MCP server tools

## 2. Zod v4 Key Changes

### Breaking
- New import path: `import { z } from "zod/v4"` (or `"zod"` if fully migrated)
- `z.object().strict()` default behavior changes
- `.transform()` pipeline changes
- Error formatting API changes

### Improvements (v4.3.6)
- Better tree-shaking (avoid re-exported star modules)
- Generalized numeric key handling
- Non-null assertion removal (cleaner internals)

## 3. Migration Checklist

When ready to migrate:
1. Update `package.json` to `"zod": "^4.0.0"`
2. Change imports to `from "zod/v4"` or use compatibility layer
3. Review all `z.object()` schemas for strict mode behavior
4. Test all MCP tool input validations
5. Run MCP servers and verify tool calls work

## 4. Decision

**Current decision: WAIT.** Zod v3 is stable and functional. Migrate when:
- A v4-only feature is needed
- v3 reaches EOL
- Major dependency requires v4
