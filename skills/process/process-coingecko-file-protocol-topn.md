---
id: process-coingecko-file-protocol-topn
title: Process: CoinGecko Top-N on file://
scope: skills
tags: [#process, #coingecko, #file-protocol, #429, #fallback]
priority: high
created_at: 2026-02-12
updated_at: 2026-02-12
---

# Process: CoinGecko Top-N on file://

> **Context**: Large top-list loads on `file://` often hit `429` and CORS/proxy side effects.

## 1. Trigger
Use when implementing or debugging:
- Top-N load (`100..250`) from CoinGecko.
- Progressive loading UX in modal/table flows.
- Repeated `429` with "Rate limit exceeded".

## 2. Recovery Runbook
1. **Chunk first**: split heavy loads into pages (safe baseline: `50`).
2. **Progress events**: emit `start -> chunk-start -> chunk-success -> done`.
3. **Retry policy**:
   - Honor `Retry-After` header first.
   - If absent, use bounded exponential backoff.
4. **Fallback chain**:
   - Primary: live API through proxy.
   - Secondary: local infra cache (if available).
   - Last resort: stale browser cache (stale-while-revalidate).
5. **Status propagation**:
   - Preserve `error.status` at provider level.
   - Record real status (`429`, `500`, ...) in manager/registry.

## 3. Hard Constraints
- Do not hard-delete cache before refresh attempts.
- UI must explain waiting/retry states to user.
- Avoid duplicate coin IDs when concatenating chunks.

## 4. Hotspot Anchors in Code
Add skill links not only in file header, but in high-regression branches:
- `if (response.status === 429) ...`
- Retry/backoff branch.
- Fallback-to-cache branch.
