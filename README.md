# OpenCode Btca

Scripts and configuration for integrating [Better Context (btca)](https://btca.dev) with [OpenCode](https://opencode.ai). Better Context and OpenCode must be installed and configured prior to use. Merge files from this repository into project configurations as needed.

## Contents

- [Contributions](#contributions)
- [Files](#files)

## Contributions

### `.config/opencode/tools/btca.ts`

Allow OpenCode agents to invoke btca commands as standard command-line tools (for example, `ls` or `grep`). The tool supports these btca CLI commands:

- `btca ask` - supports single and multiple sources
- `btca config model` - the CLI currently does not exit automatically, so a timeout is used as a workaround
- `btca config resources list`
- `btca config resources add`
- `btca config resources remove`
- `btca clear`

> Warning: The `btca ask` tool may call itself recursively and cause an infinite loop. Report occurrences at [this issue](https://github.com/koichincom/opencode-btca/issues/1). Prevention measures are in progress.

Reference:

- [OpenCode Custom Tools](https://opencode.ai/docs/custom-tools/)
- [Better Context Commands](https://btca.dev/commands)

### `.config/opencode/opencode.jsonc`

Set permissions for the btca tools. Explicit permissions are recommended for destructive commands such as `btca clear`, although they are not strictly required.

Reference:

- [OpenCode Permissions](https://opencode.ai/docs/permissions/)

## Contributions

- Open issues or pull requests for bug reports, feature requests, or improvements.
- Create branches from `dev` and target `dev` when opening a pull request.
- Consider starring the repository if it is useful!
