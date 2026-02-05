<div align="center">
  <h1>OpenCode Btca</h1>
  <p>
    Allow <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer">OpenCode</a>
    to directly get information from the tool's source code by integrating
    <a href="https://btca.dev" target="_blank" rel="noopener noreferrer">Better Context</a> CLI
  </p>
</div>

## Contents

- [Files](#files)
- [Contributions](#contributions)

## Files

> [!NOTE]
> Combine the files with your existing configuration. You don't need to use all the files.

### [`.config/opencode/tools/btca.ts`](.config/opencode/tools/btca.ts)

Allow OpenCode agents to invoke btca commands as standard command-line tools (for example, `ls` or `grep`). The tool supports these btca CLI commands:

- `btca ask`: supports single and multiple sources
- `btca connect`: the CLI does not exit automatically, so a timeout is used as a workaround
- `btca resources`
- `btca add`
- `btca remove`
- `btca clear`

Reference:

- [OpenCode Custom Tools](https://opencode.ai/docs/custom-tools/)
- [Better Context Commands](https://btca.dev/commands)

### [`.config/opencode/opencode.jsonc`](.config/opencode/opencode.jsonc)

Set permissions for the btca tools. Explicit permissions are recommended for destructive commands such as `btca clear`, although they are not strictly required.

Reference:

- [OpenCode Permissions](https://opencode.ai/docs/permissions/)

## Contributions

- Open issues or pull requests for bug reports, feature requests, or improvements.
- Create branches from `dev` and target `dev` when opening a pull request.
- Consider starring the repository if it is useful!
