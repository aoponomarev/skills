---
id: process-skills-language-policy
title: Process: Skills Language Policy
scope: skills
tags: [#process, #skills, #i18n, #language]
priority: high
created_at: 2026-02-01
updated_at: 2026-02-01
---

# Process: Skills Language Policy

> **Context**: Rules for language separation between Draft and Active skills within the WorkFlow UI (WF_UI).

## 1. Core Principle
The system maintains a strict language boundary based on the skill's lifecycle state:
- **Drafts** are for human brainstorming and refinement (Russian).
- **Active Skills** are for AI Agent execution (English).

## 2. Language Mapping

### Russian (RU)
- **Location**: `skills-mbb/drafts/`
- **Purpose**: Initial capture, user ideas, and raw brainstorming.
- **Rule**: All automated drafts generated from `USER_IDEAS` or `BACKLOG` (action=create) MUST be in Russian to facilitate user review.

### English (EN)
- **Location**: `skills/skills/` and `skills-mbb/skills/`
- **Purpose**: Production-ready instructions for AI Agents.
- **Rule**: All skills in the active directories MUST be in English using the "Telegraphic Technical" style.

## 3. The Translation Trigger
A skill is translated from Russian to English **ONLY AFTER** it has been approved by the user.

**Workflow**:
1.  **Draft**: Created in Russian in `drafts/`.
2.  **Review**: User edits and approves the Russian content.
3.  **Promotion**: Agent translates the approved content to English.
4.  **Publish**: The English version is moved to the active `skills/` folder.

## 4. Hard Constraints
1.  **No English Drafts**: Automated drafting tools MUST NOT produce English content for the `drafts/` folder unless explicitly requested for a specific technical reason.
2.  **No Russian in Production**: Active skills folders MUST NOT contain Russian text (except for specific semantic anchors like `` `ОМК` ``).

## 5. File Map
- `@skills-mbb/drafts/`: Russian workspace.
- `@skills/skills/`: English production (Global).
- `@skills-mbb/skills/`: English production (Project).
