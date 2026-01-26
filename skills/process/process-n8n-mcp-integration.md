# Process: n8n & MCP Integration

## Scope
- Division of responsibilities between MCP tools and n8n workflows.
- Integration boundaries (SSOT, file access, approvals).
- Fallback mechanisms when n8n is offline.

## Division of Responsibilities

### 1. MCP Tools (Runtime / Fast)
- **Status**: Read-mostly.
- **Tools**: `list_skills`, `read_skill`, `propose_skill`.
- **Role**: Interface for AI agents (Cursor/Continue) to discover and suggest skills.
- **Writes**: ONLY to `BACKLOG.md` via `propose_skill`.
- **Constraint**: No direct writing to `.md` skill files.

### 2. n8n Workflows (Orchestration / Slow)
- **Status**: Read/Write (Drafts).
- **Workflows**: Watcher, Drafter, Updater, Composer, Archiver, Approval.
- **Role**: Automating the lifecycle from "Suggestion" to "Draft" to "Ready for Review".
- **Writes**: Draft files in specialized folders, updating `BACKLOG.md` statuses.
- **Constraint**: Final "Publish" (commit/push) requires manual approval.

## Integration Workflow

### 1. Suggest (MCP -> Backlog)
Agent calls `propose_skill`. Output format in `BACKLOG.md`:
`- [action=<action>] [status=pending] title="[Title]" | scope="[Scope]" | skill_id="[existing_id]" | changes="[description]" | tags=[tag1, tag2] | source="[Source]" | priority="[low|medium|high]" | context="[cursor_context]" | timestamp=[ISO8601]`

### 2. Watch (n8n Watcher)
n8n monitors `BACKLOG.md` for lines matching `\[status=pending\]`.
It parses fields using regex: `action="(.*?)"`, `title="(.*?)"`, `scope="(.*?)"`, `skill_id="(.*?)"`, `changes="(.*?)"`, `context="(.*?)"`, etc.
It routes by `action`:
- `create` → Drafter
- `update` → Updater
- `merge`/`split` → Composer
- `deprecate` → Archiver
- `move` → Router (relocation between `skills/` and `skills-mbb/`)

### 3. Draft (n8n Drafter)
n8n uses an LLM (Ollama) to expand the `scope` into a full Skill using `process-skill-template.md`.
It saves the result to `../skills-mbb/drafts/domain-topic.md`.

### 4. Move (n8n Router)
For `action=move`, n8n validates target repo using `process-skills-scope-routing.md`, moves the file, updates cross-links, and regenerates indexes in both repos.

### 5. Notify & Approve
n8n sends a link to the draft. User reviews and moves it to the final location.

## Key Rules
- **Manual Gate**: No skill is published without human review.
- **Local Access**: n8n Community runs locally with direct file system access to repositories.
- **SSOT**: `BACKLOG.md` is the source of truth for all pending and promoted suggestions.
- **Draft Location**: All automated drafts go to `skills-mbb/drafts/`.

## Metadata
- tags: #process #n8n #mcp #orchestration
- dependencies: [process-skills-lifecycle, process-skill-template]
- updated_at: 2026-01-26
- mcp_resource: true
