# OpenCode Btca

Scripts and configurations for [Btca](https://btca.dev) integration for [OpenCode](https://opencode.ai). Make sure to install both OpenCode and Btca first, and merge with your existing configurations.

## [opencode/tools/btca.ts](.config/opencode/tools/btca.ts)

Let OpenCode agents call btca commands just like any other command line tools (e.g., ls, grep, etc.). Supports the following all the btca CLI commands:

- `btca ask`
- `btca config model`
- `btca config resources list`
- `btca config resources add`
- `btca config resources remove`
- `btca clear`

> [!WARNING]
> `btca ask` with multi-sources should be supported by this script, but currently has some issues, and probably on the btca side. Please use single source for now.

Reference: [OpenCode Custom Tools](https://opencode.ai/docs/custom-tools/)

## [opencode/opencode.jsonc](.config/opencode/opencode.jsonc)

Set permissions for the btca tools. This isn't strictly necessary, but it's for requiring explicit permissions for destructive tools like `btca clear`.

Reference: [OpenCode Permissions](https://opencode.ai/docs/permissions/)
