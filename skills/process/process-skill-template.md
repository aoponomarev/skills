---
id: process-skill-template
title: Template: Skill Structure
scope: skills
tags: [#template, #structure, #standard]
priority: high
created_at: 2026-01-24
updated_at: 2026-02-01
---

# Template: Skill Structure

> **Context**: Standard layout for all Skills.

## Structure

```markdown
---
id: skill-id-kebab-case
title: Human Readable Title
scope: skills (or skills-mbb)
tags: [#tag1, #tag2]
priority: medium
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
---

# Human Readable Title

> **Context**: One-line summary.
> **SSOT**: Path to source code/config.

## 1. Scope / When to Use
- Triggers.
- Boundaries.

## 2. Key Rules / Principles
- Rule 1.
- Rule 2.

## 3. Workflow / Architecture
- Step 1.
- Step 2.

## 4. Hard Constraints
- What is forbidden.

## 5. File Map
- `@path/to/file`: Description.
```

## Constraints
- **Granularity**: 1-4 screens max.
- **SSOT**: Link, don't duplicate.
