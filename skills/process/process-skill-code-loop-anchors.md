---
id: process-skill-code-loop-anchors
title: Process: Skill-to-Code Loop Anchors
scope: skills
tags: [#process, #meta-skill, #cross-links, #comments, #regression]
priority: high
created_at: 2026-02-12
updated_at: 2026-02-12
---

# Process: Skill-to-Code Loop Anchors

> **Context**: New/updated skills lose practical value if code hotspots do not point back to those skills.
> **Goal**: Break cyclic re-discovery of solved problems.

## 1. Trigger
Run this protocol whenever:
- A new skill is created.
- An existing skill is substantially updated.
- A bug-fix introduces a reusable pattern.

## 2. Placement Principle
Do not limit links to obvious file headers.
Anchor links in branches that most often restart debugging loops:
- `retry/backoff` blocks
- `fallback` branches
- merge/dedup logic
- cache invalidation guards
- error classification/status propagation

## 3. Workflow
1. **Extract pattern** from changed skill(s): what failure/recovery rule was stabilized.
2. **Find hotspots** in code where that rule is executed or can regress.
3. **Add targeted comments** with skill path + one-line reason.
4. **Avoid noise**:
   - one anchor per risk cluster is enough;
   - skip trivial lines with no decision logic.
5. **Verify coherence**:
   - update skill index;
   - ensure paths are valid.

## 4. Comment Format
Use short guard comments:
```js
// Skill anchor: prevents 429 retry regressions.
// See skills/.../process-*.md
```

## 5. Acceptance Check
- Each new/updated skill has at least one non-header code anchor in a real hotspot.
- Anchors explain "why this branch exists", not generic "see docs".
- No broad comment spam across low-risk code.
