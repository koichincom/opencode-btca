# AGENTS

## Purpose
- This file provides agentic coding agents (including automated assistants) a concise, actionable guide for building, testing, linting, and editing this repository.
- Adhere to the repository's established patterns (TypeScript, Bun, named exports) and the Git safety rules in this workspace.
- Maintain an objective, impersonal voice throughout this document and other agent-written content; avoid using "I" or "we" as the subject.

## Repository Snapshot
- **Primary Language:** TypeScript.
- **Runtime:** Bun.
- **Core Logic:** Located under `.config/opencode/tools/btca.ts` (Bun + OpenCode plugin usage).
- **Key Configurations:** `tsconfig.json` (TypeScript), `.editorconfig`.
- **Note:** No `package.json` currently exists in the root; Bun is used for execution and task management.

## Quick Checks
- Inspect the repository for package manager and configs:
  `ls package.json tsconfig.json .eslintrc* .prettierrc* bun.lockb`
- If `package.json` exists, prefer project scripts over raw commands.
- If tests or CI exist, read their configuration before changing behavior.

## Build / Lint / Test Commands

### Build / Type-Check
- **TypeScript:** `npx tsc --noEmit` (type-check only).
- **Bun Dependencies:** `bun install` (if a `bun.lockb` or `package.json` is added).

### Lint / Format
- Follow `.editorconfig` (2-space indentation).
- If ESLint/Prettier are added:
  - `npx eslint "**/*.{ts,js}" --fix`
  - `npx prettier --write "**/*.{ts,js,json,md}"`
- If configs are missing, run checks conservatively (don't write fixes without user permission).

### Testing
- **Run all tests:** `bun test`.
- **Run a single test file:** `bun test path/to/file.test.ts`.
- **Run tests matching a pattern:** `bun test -t "pattern"`.
- **If no test runner is detected:** Search for test patterns:
  `rg "describe\(|it\(|test\(" --hidden || true`.

## Code Style Guidelines

### General
- Match the repository's existing style: 2-space indentation, semicolons, double quotes for strings.
- Prefer clarity over cleverness; aim for code an unfamiliar reviewer can read in ~30s.

### Imports
- **Order:** built-in (node/bun) -> external packages -> internal modules -> relative imports.
- Use explicit file extensions only when required by the runtime/tooling.
- Use named imports/exports; avoid default exports.

### Types & Interfaces
- Use TypeScript strictness: prefer explicit return types for exported functions.
- Avoid `any`. If used, add a `// TODO` comment with a reason.
- Use `interface` for public shapes, `type` for unions/utility types.

### Naming Conventions
- **Functions/Variables:** camelCase (`runBtca`, `config_resources_add`).
- **Constants:** UPPER_SNAKE or SCREAMING_SNAKE for globals.
- **Types/Interfaces:** PascalCase (`ResourceConfig`).
- **Files:** kebab-case or dot-separated as per `.config/opencode/`.

### Error Handling & Logging
- Centralize command invocation (e.g., `runBtca` helper).
- Capture exit code, stdout, and stderr for all external commands.
- Return clear, user-facing error messages; include machine-parsable details in logs if helpful.
- Do not silently swallow errors. Log details with `console.error` before returning a fallback.
- Redact secrets from logged arguments or error outputs.

## Git Etiquette
- **Target Branch:** Commit directly to `dev` (the main working branch).
- **Commit Messages:** Use conventional commits: `feat(tool): add X`, `fix(tool): handle Y`, `docs(readme): update`.
- **Atomic Commits:** Stage only relevant files; do not mix unrelated changes.

## Design & Architecture
- Keep tools small and single-purpose. Each tool should map closely to one `btca` command.
- Make side effects (I/O, network) explicit and easy to mock.
- Favor pure functions for parsing/formatting logic.

## Operational Guardrails
- **Security:** Never commit credentials, secrets, or API keys.
- **Verification:** Run `npx tsc --noEmit` and `bun test` (if applicable) before pushing.
- **Recursive Safety:** Be aware that `btca ask` may call itself recursively; avoid infinite loops.
- **Documentation:** Update `README.md` or `AGENTS.md` if behavior changes.

## Cursor & Copilot Rules
- No specific `.cursorrules` or `.github/copilot-instructions.md` detected.
- If added, follow them strictly, including any required comment-banners.
