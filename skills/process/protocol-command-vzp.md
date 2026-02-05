---
id: protocol-command-vzp
title: Protocol: Command ВЗП (Planned Execution)
scope: skills
tags: [#protocol, #command, #planning, #autonomy]
priority: high
created_at: 2026-02-05
updated_at: 2026-02-05
---

# Protocol: Command `ВЗП` (Planned Execution)

> **Command**: `ВЗП` (Выполни Задание Планово).
> **Context**: Default mode for complex coding and infrastructure tasks.

## 1. Core Principles
1.  **Detailed Planning**: Before any action, create a comprehensive and safe execution plan.
2.  **Step-by-Step Verification**: Stop after each step for deep verification via console/terminal.
3.  **Infrastructure Integrity**: Check affected architecture and infrastructure to ensure the application remains functional.
4.  **Autonomous Correction**: If errors or malfunctions occur, independently modify code, infrastructure, or relevant skills to resolve them.
5.  **Minimal Interruption**: Do not involve the user unless absolutely necessary (e.g., missing API keys).

## 2. Execution Workflow
1.  **Plan**: Draft a multi-step plan addressing the user's request.
2.  **Execute**: Perform one step of the plan.
3.  **Verify**:
    - Check logs/terminal output.
    - Verify architecture consistency.
    - Ensure no regressions in related systems.
4.  **Fix**: If verification fails, diagnose and fix immediately.
5.  **Repeat**: Proceed to the next step only after successful verification.

## 3. Resource Management
- **API Keys**: If a key is missing, search the shared storage/vault before asking the user.
- **Skills**: Update or create skills if the task introduces new patterns or changes existing ones.

## 4. Default Mode
This protocol is considered **default** for all tasks involving code changes or infrastructure modifications, even if the user forgets to explicitly use the `ВЗП` prefix.
