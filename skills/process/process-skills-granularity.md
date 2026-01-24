# Process: Skill Granularity

## Title
Atomic and task-focused Skill design.

## Scope
- Rules for sizing and scope of individual Skill files.
- Preventing context overflow for AI agents.

## When to Use
- When creating a new Skill candidate.
- When reviewing or refactoring existing Skills.

## Key Rules
- **Atomic**: One skill = one decision family or task domain.
- **Small**: Keep files between 1 and 4 screens (max 100-150 lines).
- **Task-Focused**: Focus on "how to do" and "what rules to follow", not just general theory.
- **Split on Growth**: If a skill starts covering multiple domains, split it.

## Workflow
1) **Define Scope**: Identify the single primary task the skill assists with.
2) **Check Length**: If the draft exceeds 4 screens, identify sub-domains.
3) **Modularize**: Move sub-domains into separate skill files.
4) **Index**: Use index skills (`index-*.md`) to link related modular skills.

## References
- `skills/index/index-operations.md`
- `skills/process/process-skills-lifecycle.md`

## Metadata
- tags: #process #skills #granularity
- updated_at: 2026-01-24
