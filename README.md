# OpenCode Btca

Scripts and configuration for integrating Better Context (also known as btca) with OpenCode. Install and configure Better Context and OpenCode first, then merge the files in this repository into your own configuration as needed.

## Files

### `.config/opencode/tools/btca.ts`

Allow OpenCode agents to call btca commands like standard command-line tools (for example, `ls` or `grep`). The tool supports the following btca CLI commands:

- `btca ask` — supports single and multiple sources
- `btca config model` — the CLI currently doesn't exit automatically, so a timeout is used as a workaround
- `btca config resources list`
- `btca config resources add`
- `btca config resources remove`
- `btca clear`

> Warning: The `btca ask` tool may call itself recursively and cause an infinite loop. If you encounter this, please report it in [this issue](https://github.com/koichincom/opencode-btca/issues/1). We are working on prevention measures.

Reference:

- [OpenCode Custom Tools](https://opencode.ai/docs/custom-tools/)
- [Better Context Commands](https://btca.dev/commands)

### `.config/opencode/opencode.jsonc`

Set permissions for the btca tools. This isn't strictly required, but we recommend requiring explicit permissions for destructive commands such as `btca clear`.

Reference:

- [OpenCode Permissions](https://opencode.ai/docs/permissions/)

## Contributions

- Please open issues or pull requests for bug reports, feature requests, or improvements.
- Create your branch from `dev` and target `dev` when opening a pull request.
- If you find this project helpful, please consider starring the repository.
