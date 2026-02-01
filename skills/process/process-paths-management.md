---
id: process-paths-management
title: Process: Paths Management (EEIIPP)
scope: skills
tags: [#process, #paths, #ssot, #eeiipp]
priority: high
created_at: 2026-01-30
updated_at: 2026-02-01
---

# Process: Paths Management (EEIIPP)

> **Context**: Portability standards.
> **Rule**: EEIIPP (Unified Source of Truth / Relative Paths).

## 1. Hierarchy
- **Root**: `STATISTICS_ROOT`
- **Projects**: `MBB`, `skills`, `skills-mbb`.

## 2. SSOT
`MBB/INFRASTRUCTURE_CONFIG.yaml` -> `paths` section.

## 3. Rules
1.  **Relative**: Use `./` and `../`. No `D:\Clouds...` in code/config.
2.  **Env Vars**: Use `${STATISTICS_ROOT}` or `os.environ` in scripts.
3.  **Docs**: Reference config, don't hardcode paths.

## 4. Migration Check
When moving machines:
1.  Update `INFRASTRUCTURE_CONFIG.yaml`.
2.  Scan for absolute paths (`rg "OldPath"`).
3.  Update Docker volumes if needed.

## 5. File Map
- `@MBB/INFRASTRUCTURE_CONFIG.yaml`: The Path Registry.
