---
id: process-n8n-security-oauth-protocols
title: "n8n 2.6.4: OAuth Protocol Security and Webhook Conflict Awareness"
scope: skills
tags: [#process, #n8n, #security, #oauth, #webhooks]
priority: medium
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: n8n-io/n8n/2.6.4
---

# n8n 2.6.4: OAuth Protocol Security and Webhook Conflict Awareness

> **Context**: n8n 2.6.4 introduces a security restriction on OAuth fields and refines webhook conflict detection.

## 1. OAuth Protocol Restriction (Security)

### What Changed
n8n now **disallows unsupported protocols** in OAuth credential fields. This prevents SSRF-style attacks where malicious URLs with non-HTTP protocols (e.g., `file://`, `ftp://`, `gopher://`) could be injected.

### Impact on Our Project
- **Current state**: No OAuth credentials configured in our n8n instance.
- **Action**: None needed now. When adding OAuth integrations in the future, use only `https://` URLs.

### Rule
When configuring OAuth in n8n:
- ONLY use `https://` protocol for token/auth URLs
- NEVER use `http://` in production OAuth flows
- n8n will now reject non-HTTP protocols automatically

## 2. Webhook Conflict Checks Refined

### What Changed
n8n now excludes **waiting webhooks** from conflict analysis. Previously, a webhook in "waiting" state (e.g., waiting for callback) could falsely trigger conflict warnings when activating a new workflow with the same path.

### Impact on Our Project
- We have multiple `V2_NEWS_Swarm` workflows (some inactive) with the same webhook path
- This fix reduces false positive conflict warnings
- **No action needed** — beneficial change

## 3. Kafka Trigger Node Refactoring

### What Changed
Major refactoring and bug fixes in the Kafka Trigger node.

### Impact on Our Project
- We don't use Kafka. **No action needed.**
