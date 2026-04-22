# 🧠 lite-brain

A lightweight, local-first **Model Context Protocol (MCP) Server** designed for high-performance persistence of context snippets, clipboard history, and technical notes.

[![MCP](https://img.shields.io/badge/MCP-Server-blue.svg)](https://modelcontextprotocol.io)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Local-First](https://img.shields.io/badge/Data-Local--First-green.svg)](#)

## 🚀 Overview

`lite-brain` is a minimalist backend for your AI agent's memory. It allows you to store and retrieve technical context snippets across different sessions with sub-millisecond latency using `better-sqlite3`. It is designed to be the "fast-access" storage for modern agentic workflows.

## ✨ Features

- **Blazing Fast**: Uses synchronous SQLite (`better-sqlite3`) for near-instant read/writes.
- **MCP Native**: Fully compatible with the Model Context Protocol for seamless integration with Claude Desktop and other MCP clients.
- **Context Persistence**: Dedicated schema for `context_snippets` with automatic local timestamps.
- **Minimal Footprint**: Low memory overhead and zero external database dependencies.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Database**: SQLite (via `better-sqlite3`)
- **Protocol**: @modelcontextprotocol/sdk

## 📦 Installation

We've made setup extremely easy. You just need to have **Node.js** installed.

### Automatic Setup (Recommended)
Simply run this command in your terminal inside the project folder:
```bash
node setup.js
```
This script will automatically detect your operating system and configure **Claude Desktop** to use `lite-brain`. 

### Manual Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lite-brain.git
   cd lite-brain
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Claude Desktop**:
   Add the following to your `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "lite-brain": {
         "command": "node",
         "args": ["/absolute/path/to/lite-brain/mcp-server.js"]
       }
     }
   }
   ```

## 📋 usage

Once configured, your AI agent can use the following tools:

- `store_snippet`: Save a piece of technical context.
- `get_latest_snippet`: Retrieve the most recent saved item.
- `search_snippets`: Query the history for specific keywords.

## 📄 License

This project is licensed under the **ISC License**.
