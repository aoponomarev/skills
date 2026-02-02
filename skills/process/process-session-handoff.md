---
id: process-session-handoff
title: Process: Session Handoff & Auto-Backup
scope: skills
tags: [#process, #session, #backup, #sync, #handoff]
priority: high
created_at: 2026-02-01
updated_at: 2026-02-02
---

# Process: Session Handoff & Auto-Backup

> **Context**: Protocol for ensuring all local changes (settings, secrets, logs) are synced to OneDrive before closing the session.
> **Master Skill**: See `skills-mbb/process/process-settings-sync` for unified sync protocol (Cursor + Continue + Project).

## 1. Triggers
This protocol is activated by semantic triggers such as:
- "Закрываем рабочий день" (Closing the workday)
- "Копируй настройки в облако" (Copy settings to cloud)
- Any mention of `docs/project-evolution.txt` or session reporting.
- Completion of a major task sequence.

## 2. Handoff Ritual (The Steps)

### Step 1: Sync ALL Settings to Cloud
Check for local modifications in:
- Cursor: `settings.json`, `keybindings.json`
- Continue: `config.yaml`, `.continuerc.json`, `.continueignore`
- Project: `.cursorrules`
- Secrets: `.env`

**Action**: Run unified sync:
```powershell
powershell .\scripts\sync-cursor-settings.ps1 backup
```
If `.env` was modified, the Hard Link to `AI/_VAULT/envs/mbb.env` will auto-sync.

### Step 2: Update Project Evolution
Ensure `docs/project-evolution.txt` is updated with the latest technical milestones achieved during the session.

### Step 3: Session Report
Generate a `logs/session-report.md` summarizing:
- Tasks completed.
- Pending issues (moved to `logs/issues-backlog.md`).
- Instructions for the next agent (`logs/handoff-note.md`).

### Step 4: Final Git Sync
Perform a final `git status` check. If there are uncommitted documentation or skill changes, ask the user to "commit and push".

## 3. Hard Constraints
1.  **No Data Loss**: Never terminate a session if the local `.env` contains new keys that haven't been synced to the cloud backup.
2.  **Verifiable Sync**: The agent must explicitly state: "✅ Cloud SSOT updated" after a successful backup.

## 4. File Map
- `@scripts/sync-cursor-settings.ps1`: The sync engine.
- `@docs/project-evolution.txt`: The milestone log.
- `@logs/`: Session context storage.
