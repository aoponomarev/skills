---
id: process-nodejs-v25-api-preview
title: "Node.js v25.6.0 API Preview (Current: v20)"
scope: skills
tags: [#process, #nodejs, #api, #future, #migration]
priority: low
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: nodejs/node/25.6.0
---

# Node.js v25.6.0 API Preview (Current: v20)

> **Context**: Our Docker container uses `node:20-slim` (v20.20.0). Node.js v25.6.0 is the current mainline release. This skill documents useful new APIs for future migration planning.

## 1. Current State

- **In use**: Node.js v20.20.0 (LTS, Docker image `node:20-slim`)
- **Available**: Node.js v25.6.0 (Current)
- **Migration timeline**: When Node 20 LTS reaches EOL (April 2026) or when v24/v26 becomes LTS

## 2. Notable New APIs (v25.6.0)

### `async_hooks.createHook({ trackPromises })` [SEMVER-MINOR]
Track Promise resolution in async hooks. Useful for debugging async flows in our server.js.

### `net.Socket.setTOS()` / `getTOS()` [SEMVER-MINOR]
Type of Service control on sockets. Could be useful for prioritizing API traffic.

### `stream/consumers.bytes()` [SEMVER-MINOR]
Consume a readable stream into a `Uint8Array`. Simplifies binary data handling.

### `test_runner.run({ env })` [SEMVER-MINOR]
Set environment variables for test runner. Useful for isolated testing.

### Performance
- `TextEncoder.encode()` now uses `simdutf` for 2-4x faster UTF-8 encoding

### Security
- OpenSSL updated to 3.5.5
- undici updated to 7.19.2

## 3. Migration Considerations

When migrating from v20 to v24/v26 LTS:
1. Check `package.json` `engines` field
2. Update Dockerfile: `node:20-slim` → `node:24-slim` (or appropriate LTS)
3. Test all `require()` calls — ESM support has evolved significantly
4. Review OpenSSL changes for TLS compatibility
5. Update CI/CD Node version constraints

## 4. Decision

**Current decision: STAY on Node 20 LTS.** Migrate when:
- Node 20 reaches EOL (April 2026)
- A v25+ API is critically needed
- Next LTS (v24 or v26) is declared stable
