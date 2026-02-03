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
    description: "Ask questions about configured resources using source code",
    args: {
        resources: tool.schema
            .array(tool.schema.string())
            .describe("Resource names to search"),
        question: tool.schema.string().describe("Question to answer"),
    },
    async execute({ resources, question }) {
        const resourceFlags = resources.flatMap((r) => ["-r", r]);
        return runBtca(["ask", ...resourceFlags, "-q", question]);
    },
});

export const model = tool({
    description: "Set the AI model provider and model",
    args: {
        provider: tool.schema
            .string()
            .describe(
                "Provider (opencode, openrouter, openai, google, anthropic, github-copilot)",
            ),
        model: tool.schema.string().describe("Model name"),
    },
    async execute({ provider, model: modelName }) {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("TIMEOUT")), 5000),
        );

        try {
            const result = (await Promise.race([
                $`btca connect --provider ${provider} --model ${modelName}`
                    .quiet()
                    .nothrow(),
                timeoutPromise,
            ])) as { exitCode: number; stdout: Uint8Array; stderr: Uint8Array };

            const stdout = result.stdout.toString().trim();
            if (result.exitCode !== 0) {
                const stderr = result.stderr.toString().trim();
                return `Error (exit ${result.exitCode}): ${stderr || stdout || "Unknown error"}`;
            }
            return stdout || `Model updated: ${provider}/${modelName}`;
        } catch (error) {
            if (error instanceof Error && error.message === "TIMEOUT") {
                return `Model updated: ${provider}/${modelName}`;
            }
            throw error;
        }
    },
});

export const list = tool({
    description: "List all configured resources",
    args: {},
    async execute() {
        return runBtca(["resources"]);
    },
});

export const add = tool({
    description: "Add a resource (git repo or local directory)",
    args: {
        name: tool.schema.string().describe("Resource name"),
        type: tool.schema.enum(["git", "local"]).describe("Resource type"),
        url: tool.schema
            .string()
            .optional()
            .describe("Git URL (required for git type)"),
        branch: tool.schema
            .string()
            .optional()
            .describe("Git branch (default: main)"),
        path: tool.schema
            .string()
            .optional()
            .describe("Local path (required for local type)"),
        searchPaths: tool.schema
            .array(tool.schema.string())
            .optional()
            .describe("Subdirectories to focus search"),
        notes: tool.schema
            .string()
            .optional()
            .describe("Notes for the AI about this resource"),
    },
    async execute({ name, type, url, branch, path, searchPaths, notes }) {
        let urlOrPath: string;

        if (type === "git") {
            if (!url) {
                return "Error: url is required for git type resources";
            }
            urlOrPath = url;
        } else if (type === "local") {
            if (!path) {
                return "Error: path is required for local type resources";
            }
            urlOrPath = path;
        } else {
            return "Error: type must be 'git' or 'local'";
        }

        const args: string[] = ["add", urlOrPath, "-n", name, "-t", type];

        if (branch) {
            args.push("-b", branch);
        }

        if (searchPaths && searchPaths.length > 0) {
            for (const sp of searchPaths) {
                args.push("-s", sp);
            }
        }

        if (notes) {
            args.push("--notes", notes);
        }

        return runBtca(args);
    },
});

export const remove = tool({
    description: "Remove a resource",
    args: {
        name: tool.schema
            .string()
            .describe("Resource name (use `list` to see names)"),
    },
    async execute({ name }) {
        return runBtca(["remove", name]);
    },
});

export const clear = tool({
    description: "Clear all cached resources (destructive)",
    args: {},
    async execute() {
        return runBtca(["clear"]);
    },
});
