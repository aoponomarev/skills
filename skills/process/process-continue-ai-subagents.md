---
id: process-continue-ai-subagents
title: "Continue AI v1.2.15: Subagents and Agent Skills"
scope: skills
tags: [#process, #continue-ai, #subagents, #agent-skills, #mcp, #config]
priority: high
created_at: 2026-02-10
updated_at: 2026-02-10
source_release: continuedev/continue/1.2.15-vscode
---

# Continue AI v1.2.15: Subagents and Agent Skills

> **Context**: Continue AI v1.2.15-vscode introduces subagent support and agent skills — two key features for multi-agent orchestration.

## 1. Subagents

### What Is It
Subagents allow a primary agent to **delegate tasks** to specialized sub-agents. This enables hierarchical agent workflows within Continue CLI.

### How It Works
- Primary agent identifies a subtask
- Delegates to a subagent with specific capabilities
- Subagent executes and returns result to primary
- Primary integrates result into its workflow

### Impact on Our Project
- Continue CLI in Docker (`ghcr.io/aoponomarev/mbb-continue-cli:latest`) already includes v1.2.15
- MCP servers (`skills-mcp`, `agents-mcp`) can be leveraged by subagents
- **Action**: Monitor usage patterns; consider defining explicit subagent roles in config

## 2. Agent Skills

### What Is It
Agent Skills is a system for defining reusable capabilities that agents can invoke. Similar to our existing `skills/` directory but integrated into Continue's agent runtime.

### Impact on Our Project
- Our MCP-based skills (`skills-mcp/server.js`) already provide skill-like functionality
- Continue's native skills complement our MCP approach
- **Action**: Evaluate whether to migrate some MCP skills to native Continue skills for better integration

## 3. `.md` File Filtering in Agent Configs

### What Changed
Continue v1.2.15 **filters out `.md` files** when loading agent configurations. Only `.yaml`, `.yml`, `.json` configs are loaded.

### Impact on Our Project
- If any agent configs were stored as `.md` files, they will now be ignored
- Our config is `.continue/config.yaml` — **not affected**
- **Action**: Ensure no agent configs use `.md` extension

## 4. Model Update Applied

### Change Made
Replaced deprecated `google/gemini-2.0-flash-exp` with `google/gemini-2.5-flash` in `.continue/config.yaml`.

**Reason**: `gemini-2.0-flash-exp` returns HTTP 404 on OpenRouter (endpoint removed). `gemini-2.5-flash` is the current production model.

## 5. Other Notable Changes

- MCP/Bash tools allowed by default in headless mode
- Fixed duplicate tool messages
- Updated `/info` command with usage statistics
- Dependency: `undici` updated to 7.18.2
