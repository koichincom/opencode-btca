import { tool } from "@opencode-ai/plugin";
import { $ } from "bun";

async function runBtca(args: string[]): Promise<string> {
    const result = await $`btca ${args}`.quiet().nothrow();
    if (result.exitCode !== 0) {
        const stderr = result.stderr.toString().trim();
        const stdout = result.stdout.toString().trim();
        return `Error (exit ${result.exitCode}): ${stderr || stdout || "Unknown error"}`;
    }
    return result.stdout.toString().trim();
}

export const ask = tool({
    description:
        "BTCA: ask about a configured resource's source code in natural language",
    args: {
        resources: tool.schema
            .array(tool.schema.string())
            .describe("BTCA resource names (configured repos or packages)"),
        question: tool.schema
            .string()
            .describe("Question to answer using the resource source"),
    },
    async execute({ resources, question }) {
        const resourceFlags = resources.flatMap((r) => ["-r", r]);
        return runBtca(["ask", ...resourceFlags, "-q", question]);
    },
});

export const config_model = tool({
    description: "BTCA: set the model provider and model (updates BTCA config)",
    args: {
        provider: tool.schema.string().describe("Model provider id"),
        model: tool.schema.string().describe("Model name"),
    },
    async execute({ provider, model }) {
        // btca config model doesn't exit after success, so timeout is used
        const result =
            await $`btca config model --provider ${provider} --model ${model}`
                .quiet()
                .nothrow()
                .timeout(5000);
        const stdout = result.stdout.toString().trim(); // exit code 124 = timeout (expected), 0 = normal exit
        if (result.exitCode !== 0 && result.exitCode !== 124) {
            const stderr = result.stderr.toString().trim();
            return `Error (exit ${result.exitCode}): ${stderr || stdout || "Unknown error"}`;
        }
        return stdout || `Model updated: ${provider}/${model}`;
    },
});

export const config_resources_list = tool({
    description: "BTCA: list configured resources",
    args: {},
    async execute() {
        return runBtca(["config", "resources", "list"]);
    },
});

export const config_resources_add = tool({
    description: "BTCA: add a resource (updates BTCA config)",
    args: {
        name: tool.schema.string().describe("BTCA resource name"),
        type: tool.schema
            .enum(["git", "local"])
            .describe("Resource type: git or local"),
        url: tool.schema
            .string()
            .optional()
            .describe("Git repository URL (required for git type)"),
        branch: tool.schema
            .string()
            .optional()
            .describe("Git branch (default: main)"),
        path: tool.schema
            .string()
            .optional()
            .describe("Local filesystem path (required for local type)"),
        searchPaths: tool.schema
            .array(tool.schema.string())
            .optional()
            .describe("Subdirectories to focus search on"),
        notes: tool.schema
            .string()
            .optional()
            .describe("Special notes/hints for the AI about this resource"),
    },
    async execute({ name, type, url, branch, path, searchPaths, notes }) {
        const args: string[] = [
            "config",
            "resources",
            "add",
            "-n",
            name,
            "-t",
            type,
        ];

        if (type === "git") {
            if (!url) {
                return "Error: url is required for git type resources";
            }
            args.push("-u", url);
            if (branch) {
                args.push("-b", branch);
            }
        } else if (type === "local") {
            if (!path) {
                return "Error: path is required for local type resources";
            }
            args.push("--path", path);
        }

        if (searchPaths && searchPaths.length > 0) {
            for (const sp of searchPaths) {
                args.push("--search-path", sp);
            }
        }

        if (notes) {
            args.push("--notes", notes);
        }

        return runBtca(args);
    },
});

export const config_resources_remove = tool({
    description: "BTCA: remove a resource (updates BTCA config)",
    args: {
        name: tool.schema
            .string()
            .describe(
                "BTCA resource name, use `config_resources_list` to see names",
            ),
    },
    async execute({ name }) {
        return runBtca(["config", "resources", "remove", "--name", name]);
    },
});

export const clear = tool({
    description: "BTCA: clear all locally cached resources (destructive)",
    args: {},
    async execute() {
        return runBtca(["clear"]);
    },
});
