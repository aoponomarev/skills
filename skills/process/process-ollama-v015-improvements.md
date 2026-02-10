---
id: process-ollama-v015-improvements
title: "Ollama v0.15.6: Auto-download and Context Fixes"
scope: skills
tags: [#process, #ollama, #local-llm, #model-management]
priority: low
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: ollama/ollama/0.15.6
---

# Ollama v0.15.6: Auto-download and Context Fixes

> **Context**: Ollama v0.15.6 is running on the host (confirmed via API at localhost:11434). This version includes useful UX improvements.

## 1. Key Changes

### Auto-download Missing Models
`ollama launch` now **automatically downloads** models that are not locally available, instead of returning an error.

**Impact**: When agents or scripts reference a model not yet pulled, Ollama will now handle it gracefully. This improves reliability of automated workflows.

### Context Limit Fixes
Fixed context limits when running `ollama launch droid` and fixed context compaction bug when providing images to Claude models.

**Impact**: More stable operation when using vision models or large context windows.

## 2. Project Configuration

```yaml
# docker-compose.yml
environment:
  OLLAMA_BASE_URL: http://host.docker.internal:11434
```

Both `n8n-mbb` and `continue-cli` containers access Ollama via `host.docker.internal`.

## 3. Current State

- **Version**: 0.15.6 (current, verified)
- **Access**: Via `host.docker.internal:11434` from Docker containers
- **Models**: Available for local inference when Ollama is running
