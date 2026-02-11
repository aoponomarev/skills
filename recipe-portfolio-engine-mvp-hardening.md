# Recipe: Portfolio Engine MVP Hardening

## When to use

Use this recipe when portfolio allocation/rebalance must stay stable under strict invariants:

- `sum(weights) === 100`
- `minWeight === 1`
- disabled rebalance asset must remain in composition and stay `1%`
- lock/unlock and repeated recalculation must not drift

## Core pattern

1. Keep domain logic in pure engine functions (`allocateWeights`, `normalizeWeights`, `setRebalanceEnabled`).
2. Treat disabled assets as immutable during normalization:
   - immediately force `weight = minWeight`
   - exclude them from mutable redistribution pool
3. Validate full contract after each mutating operation.
4. Keep UI as adapter:
   - build canonical draft
   - call engine
   - call validator
   - project result back to UI fields

## Reliability checks

- Add a standalone runtime smoke script (`node core/domain/portfolio-engine-smoke.js`) covering:
  - mixed sides
  - all AGR = 0
  - repeated lock/unlock cycles
  - disable -> 1% and no deletion
- Add UI smoke (`file://`) covering create -> view -> rebalance -> save.

## Online persistence pattern

- Cloudflare as primary online path (best effort).
- Local persistence always succeeds first (no UX block).
- PostgreSQL treated as optional secondary sync:
  - gated by feature flag + UI toggle
  - skip with explicit reason if `missing baseUrl/CORS`

## Anti-debt checklist

- Never leave unclassified sync errors in silent catch blocks.
- Emit one user-visible skip message for infra issues.
- Re-run domain + UI smoke after every meaningful change to allocation/rebalance flow.
