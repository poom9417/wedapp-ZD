# Repository instructions — wedapp-ZD

## Authority and context
Follow the owner's current instructions and existing applicable repository rules. These files are a starter proposal; do not erase established repository policy during import.
Read PROJECT_STATE.md and the active task before changing code. Use PROJECT_BRIEF.md for scope, SYSTEM_ARCHITECTURE.md for design, and docs/decisions for rationale. Code and actual command output establish implementation facts; a plan does not prove completion.
Communicate with the owner in Thai. Use English identifiers and explicit, short technical documentation where useful.

## Scope
Target: Next.js App Router + TypeScript, Appwrite Auth, native PostgreSQL on Appwrite, Prisma, Appwrite Sites, GitHub.
This is an application foundation. Business modules, real user roles and tenant structure are not yet specified.
Inspect existing files before scaffolding. Never reset, clean, overwrite or discard user work. If Git exists, work on a suitable feature branch when safe; do not alter existing remotes. Do not create commits unless asked; report the working diff.
If empty, build in this root. A generator must not overwrite this starter pack; scaffold in a temporary sibling directory if needed, inspect outputs, then merge deliberately.
Do not use a host path that does not actually exist in the execution environment.

## Implementation
- Verify exact compatible package versions first. Pin direct versions and retain the package manager lockfile. Do not mix npm/pnpm/yarn lockfiles.
- Select the Node runtime common to local development, chosen dependencies and Appwrite Sites. Record it in engines and a version file.
- Keep credentials and database access server-only. Appwrite SDK session clients are per request.
- Authenticate and authorize every protected operation at the server/service boundary. UI and route redirects alone are not access control.
- Default deny. Derive identity from a verified session, never from browser-provided role/userId.
- Build a small vertical slice per task. No invented patient, billing, task, finance or other business tables.
- No automatic schema writes, seeding or migrations during request handling or app build.
- Complete local work when cloud credentials are missing; label dependent integration tests blocked or not run.
- No silent fallback from a failed external service to fake authenticated data.
- No secrets, tokens, database URLs with credentials, or real personal records in logs, commits, AI handoffs or screenshots.

## Team work
Codex is the initial code owner. Claude is the initial independent reviewer; ChatGPT maintains requirements and acceptance decisions. Roles can be explicitly reassigned.
No automatic cross-agent access or shared memory is assumed. Pass a sanitized handoff and exact revision/diff.
One writer per task/branch. If parallel editing is explicitly requested, allocate separate worktrees/branches and file ownership; an integration owner merges deliberately.
Do not spawn additional agents unless the owner requests it.

## Verification and handoff
Use scripts established in package.json. At M1 define typecheck, lint, test, build and dev.
Run relevant checks after changes. Report pass, fail, blocked and not-run distinctly; do not add placeholder tests solely to make a check green.
Update PROJECT_STATE.md, TASKS.md and a handoff with scope, files, actual results and next action.
A review must identify the code revision reviewed and limitations; never approve unseen source.
Remote creation, database mutation, push and deploy are outside the initial task. Record any later explicit authorization and do not ask again for the same authorized scope.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
