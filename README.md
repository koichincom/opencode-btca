# OpenCode Btca

Scripts and configurations for [Better Context (as known as btca)](https://btca.dev) integration for [OpenCode](https://opencode.ai). Make sure to install and set up Better Context and OpenCode first and merge the files in this repository to your own configurations as needed.

## Files

### [opencode/tools/btca.ts](.config/opencode/tools/btca.ts)

Let OpenCode agents call btca commands just like any other command line tools (e.g., ls, grep, etc.). Supports the following all the btca CLI commands:

- `btca ask`: single and multiple sources are supported
- `btca config model`: the CLI doesn't exit now, so timeout is used as a workaround
- `btca config resources list`
- `btca config resources add`
- `btca config resources remove`
- `btca clear`

> [!Warning]
> `btca ask` tool might call the tool recursively and cause infinite loops. Please report anything related in [this issue](https://github.com/koichincom/opencode-btca/issues/1). Prevention is being worked on.

Reference:

- [OpenCode Custom Tools](https://opencode.ai/docs/custom-tools/)
- [Better Context Commands](https://btca.dev/commands)

### [opencode/opencode.jsonc](.config/opencode/opencode.jsonc)

Set permissions for the btca tools. This isn't strictly necessary, but it's recommended to require explicit permissions for destructive tools like `btca clear`.

Reference: [OpenCode Permissions](https://opencode.ai/docs/permissions/)
