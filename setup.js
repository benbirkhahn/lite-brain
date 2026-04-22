import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setup() {
  console.log("🚀 Starting lite-brain automatic setup...");

  const configPath = os.platform() === 'win32'
    ? path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json')
    : path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');

  const absolutePath = path.join(__dirname, 'mcp-server.js');

  try {
    let config = { mcpServers: {} };

    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } else {
      const configDir = path.dirname(configPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
    }

    config.mcpServers = config.mcpServers || {};
    config.mcpServers['lite-brain'] = {
      command: 'node',
      args: [absolutePath]
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log("\n✅ Setup Complete!");
    console.log(`📍 Config updated at: ${configPath}`);
    console.log("👉 Now, please RESTART your Claude Desktop app.");
    console.log("🧠 lite-brain will be available in your next chat session.");

  } catch (error) {
    console.error("\n❌ Setup failed:", error.message);
    console.log("Please make sure you have Claude Desktop installed and try again.");
  }
}

setup();
