---
id: process-coin-set-merge-consistency
title: Process: Coin Set Merge Consistency
scope: skills
tags: [#process, #coin-sets, #merge, #reactivity, #ui-consistency]
priority: high
created_at: 2026-02-12
updated_at: 2026-02-12
---

# Process: Coin Set Merge Consistency

> **Context**: "Loaded N coins" toast can diverge from table counter after merge if active IDs are updated incorrectly.

## 1. Trigger
Use when debugging or changing:
- Add/merge flow for multiple coin sets.
- Counter mismatch (`toast != table count`).
- Suspected Vue reactivity issues after merge.

## 2. Canonical Rule
After merge:
1. Treat `coins[]` as source of truth for loaded entities.
2. Rebuild `activeCoinSetIds` from `coins.map(c => c.id)` (set-union).
3. Never overwrite active IDs by "last loaded set IDs" only.

## 3. Data Loading Rule
- Prefer full coin payload already attached to incoming set objects.
- Fetch by IDs only for truly missing coin IDs.
- Preserve deterministic order for user-facing lists.

## 4. Regression Checklist
- After first load: `coins == activeCoinSetIds == totalCoinsCount`.
- After second merge: all counters reflect union count.
- No unresolved IDs on happy path.

## 5. Hotspot Anchors in Code
Add skill links near:
- Merge branch that updates `activeCoinSetIds`.
- Dedup/union logic.
- Branches that show success message with counts.
