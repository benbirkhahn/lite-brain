import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import db from "./db.js";

// 1. Initialize the Server
const server = new Server(
    { name: "smart-clipboard", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

// 2. Define the Tools (What the AI is allowed to do)
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [{
        name: "get_recent_context",
        description: "Read the most recently saved text snippets from the smart clipboard.",
        inputSchema: {
            type: "object",
            properties: { limit: { type: "number", description: "How many snippets to retrieve (default 5)" } }
        }
    }]
}));

// 3. Handle the Tool Execution (Actually running the database search)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_recent_context") {
        const limit = request.params.arguments?.limit || 5;
        const stmt = db.prepare("SELECT content, created_at FROM context_snippets ORDER BY created_at DESC LIMIT ?");
        const snippets = stmt.all(limit);

        return {
            content: [{
                type: "text",
                text: snippets.length ? JSON.stringify(snippets, null, 2) : "Clipboard is empty."
            }]
        };
    }
    throw new Error("Tool not found");
});

// 4. Start the Connection
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Smart Clipboard MCP Server running!");
}

main();