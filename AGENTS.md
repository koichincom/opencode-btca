AGENTS

Purpose
- This file gives agentic coding agents (including automated assistants) a concise, actionable guide for building, testing, linting, and editing this repository.
- Follow the repo's existing patterns (TypeScript, Bun usage, named exports) and the Git safety rules in this workspace when making changes.
- Maintain an objective, impersonal voice throughout this document and other agent-written content: avoid using `I` or `we` as the subject.

Repository snapshot
- Primary language: TypeScript (tools live under `.config/opencode/`).
- Key file(s): `.config/opencode/tools/btca.ts` (Bun + OpenCode plugin usage).
- No `package.json`, `tsconfig.json`, or lint/test configs detected in this repository root; always probe for these files before running commands.
- No Cursor rules or Copilot instructions detected in `.cursor/` or `.github/` (check again before making repository-wide changes).

Quick checks (first actions for any agent run)
- Inspect repository for package manager and configs:
  - `ls package.json tsconfig.json .eslintrc* .prettierrc* bun.lockb pnpm-lock.yaml yarn.lock package-lock.json`
- If `package.json` exists, read `scripts` and prefer project scripts over raw commands.
- If tests or CI exist, read their configuration before changing behaviour.

Build / Lint / Test commands
- General pattern: prefer using the repository's package scripts when available (example: `npm run build`). If scripts are missing, use the commands below.

Build / type-check
- If TypeScript is present and there's a `tsconfig.json`:
  - `npx tsc --noEmit` (type-check only)
  - or `pnpm -w tsc --noEmit` / `yarn tsc --noEmit` depending on package manager
- If Bun is primary and dependencies are needed:
  - `bun install` to install deps
- If there is a `build` script: `npm run build` / `pnpm run build` / `yarn build` / `bun run build`

Lint / format
- If ESLint is configured:
  - `npx eslint "**/*.{ts,js,tsx,jsx}" --cache` to lint the repo
  - fix automatically: `npx eslint "**/*.{ts,js}" --fix`
- If Prettier is configured:
  - `npx prettier --check "**/*.{ts,js,json,md}"`
  - fix formatting: `npx prettier --write "**/*.{ts,js,json,md}"`
- If configs are missing, run checks conservatively (don't write fixes without user permission).

Test (project-level)
- Common commands (try in this order):
  1. `bun test` (if `bun` is used and tests exist)
  2. `npm test` / `pnpm test` / `yarn test`
  3. `npx jest` / `npx vitest` depending on framework
- If there is no test framework configured: add tests via a recommended runner (Vitest/Jest) and include setup instructions in PR.

Run a single test (most useful variants)
- Jest style tests (or test scripts that forward arguments to Jest):
  - `npm test -- -t "pattern"`  # match test name with regex or string
  - `npx jest tests/file.test.ts` # run a single file
- Vitest:
  - `npx vitest run -t "pattern"`
  - `npx vitest tests/file.test.ts` or `npx vitest run tests/file.test.ts`
- Bun test runner:
  - `bun test -t "pattern"` or `bun test tests/file.test.ts`
- Single-file run (if the file is executable or pure JS/TS with Bun):
  - `bun ./path/to/test-file.ts` (Bun can run TypeScript directly)
  - `node -r ts-node/register ./path/to/test-file.ts` (if ts-node installed)

If you cannot detect a test runner, run:
- `rg "describe\(|it\(|test\(" --hidden || true` to look for tests (ripgrep assumed available). Fall back to a quick grep if not present.

Code style guidelines (apply consistently)
- General
  - Match the repository's existing style where possible. Current file `.config/opencode/tools/btca.ts` uses: 2-space indentation, semicolons, double quotes for strings, named exports.
  - Prefer clarity over cleverness; aim for code an unfamiliar reviewer can read in ~30s.

- Imports
  - Order: built-in (node/bun) -> external packages -> internal modules -> relative imports. Separate groups with a single blank line.
  - Use explicit file extension only when required by the runtime/tooling (Bun can import TypeScript directly).
  - Use named imports/exports; avoid default exports for modules that provide multiple utilities.

- Formatting
  - Use Prettier (if present) or follow these rules: 2 spaces, semicolons required, maximum line length 100–120 chars.
  - Keep lines short; break long chains across multiple lines with hanging indentation.

- Types & interfaces
  - Use TypeScript strictness where possible: prefer explicit return types for exported functions (`Promise<string>`, etc.).
  - Avoid `any`. If `any` is used, add a short `// TODO` comment and a reason.
  - Use `type` or `interface` for complex structured data; prefer `interface` for public shapes, `type` for unions/utility types.
  - Keep runtime validation for external input (command-line args, network responses) even if types exist.

- Naming
  - Functions and variables: camelCase (`runBtca`, `config_resources_add`).
  - Constants: UPPER_SNAKE (`DEFAULT_TIMEOUT_MS`) or SCREAMING_SNAKE if truly constant and global.
  - Types & interfaces: PascalCase (`BtcaArgs`, `ResourceConfig`).
  - Files: kebab-case or the existing dot-separated path in `.config/opencode/` (do not change existing file names).

- Exports
  - Prefer named exports for tools and helpers; avoid introducing default exports.
  - Keep each tool's exported object isolated and well-documented with a description string.

Error handling and logging
- Centralize external command invocation in a single helper (the repository already uses `runBtca`).
- For external commands, always capture: exit code, stdout, stderr, and the arguments used.
- Return clear, user-facing error messages for agent consumers; include a machine-parsable error for logs if helpful.
  - Example: `throw new Error(JSON.stringify({ exitCode, args, stderr }))` for internal logs; return plain text to agents.
- Do not silently swallow errors. If a helper must recover, log details with `console.error` before returning a fallback.
- Avoid leaking secrets in logs or error outputs. Redact or omit credentials from logged arguments.

Design & architecture expectations for agents
- Keep tools small and single-purpose. Each exported tool should map closely to one btca command.
- Make side effects explicit (I/O, file writes, network calls) and easy to mock in tests by passing wrappers or dependency objects.
- Favor pure functions for parsing/formatting logic; isolate I/O to a small surface area.

Testing guidance for contributors and agents
- Where possible, write unit tests for parsing logic and command argument builders.
- Mock external command execution (`Bun.$`, `child_process.exec`) when testing tools that call out to `btca`.
- For integration tests that call `btca`, run them separately and gate them behind an environment flag (e.g. `INTEGRATION=1 bun test`).

Git / commit etiquette for agents
- Do not commit unrelated changes. If other unstaged changes exist in the tree, either:
  - Ask the human operator for clarification, or
  - Stage only the files you changed and include a focused commit message.
- Commit message style (conventional): `feat(tool): add X`, `fix(tool): handle Y`, `docs(readme): update`.
- Create branches from `dev` and open PRs targeting `dev` (this repo uses `dev` as its working branch).

Cursor / Copilot rules
- No Cursor rules were found in `.cursor/rules/` or `.cursorrules` in the repository root when this file was generated.
- No GitHub Copilot instructions were found in `.github/copilot-instructions.md` when this file was generated.
- If such rules are added later, follow them strictly: re-check these locations before major refactors and include any required comment-banners or commit message prefixes.

Operational guardrails for agentic edits
- Never add credentials or secrets to the repo.
- Run tests and linters locally before creating a PR; if tests fail, include failing logs in the PR description.
- If a change affects behavior of exported tools, add or update tests and update `README.md` or `AGENTS.md` accordingly.
- When in doubt about making a breaking change, open an issue first describing the problem and proposed solution.

If you want: next steps
1) I can commit `AGENTS.md` for you (suggested commit message: `chore(docs): add AGENTS.md for automated contributors`).
2) I can add a minimal `package.json` and `tsconfig.json` scaffolding and CI suggestions to make testing and linting reproducible.
3) I can run a quick automated lint/check pass in this repo to surface problems (requires choosing which tools to install).

File created: `AGENTS.md`
