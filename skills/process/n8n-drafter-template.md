---
id: n8n-drafter-template
title: Template: n8n Skill Drafter
scope: skills
tags: [#template, #n8n, #automation]
priority: medium
created_at: 2026-01-26
updated_at: 2026-02-01
---

# Template: n8n Skill Drafter

> **Context**: Instruction set for the Automated Drafter Agent.
> **Input**: Brief from `BACKLOG.md`.

## 1. Routing
- **Action=Move**: Do NOT draft. Return routing instructions (Source -> Target).
- **Action=Create**: Draft using `process-skill-template.md`.

## 2. Input Fields
- **Title**: Skill name.
- **Scope**: Description.
- **Context**: Logs/Code snippets.

## 3. Output Requirements
1.  **Front-Matter**: Valid YAML.
2.  **Granularity**: Atomic topic.
3.  **Tone**: Technical.
4.  **No Duplication**: Link to existing skills.

## 4. File Map
- `@process-skill-template.md`: The output format.
