import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

interface AgentConfig {
  name: string;
  displayName: string;
  title: string;
  icon: string;
  role: string;
  path: string;
}

export function activate(context: vscode.ExtensionContext) {
  console.log("BMAD Agents extension activated");

  const agents = loadAgents();

  for (const agent of agents) {
    registerAgent(context, agent);
  }
}

function loadAgents(): AgentConfig[] {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return [];

  const manifestPath = path.join(
    workspaceFolder.uri.fsPath,
    "_bmad",
    "_config",
    "agent-manifest.csv",
  );

  if (!fs.existsSync(manifestPath)) return [];

  const content = fs.readFileSync(manifestPath, "utf-8");
  const lines = content.split("\n").slice(1); // Skip header

  return lines
    .filter((line) => line.trim())
    .map((line) => {
      const parts = parseCsvLine(line);
      return {
        name: parts[0],
        displayName: parts[1],
        title: parts[2],
        icon: parts[3],
        role: parts[4],
        path: parts[9],
      };
    });
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

function registerAgent(context: vscode.ExtensionContext, agent: AgentConfig) {
  const handler: vscode.ChatRequestHandler = async (
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
  ) => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      stream.markdown("❌ No workspace folder open");
      return;
    }

    const agentPath = path.join(workspaceFolder.uri.fsPath, agent.path);

    let agentContent = "";
    if (fs.existsSync(agentPath)) {
      agentContent = fs.readFileSync(agentPath, "utf-8");
    }

    stream.markdown(
      `${agent.icon} **${agent.displayName}** - ${agent.title}\n\n`,
    );
    stream.markdown(`> *${agent.role}*\n\n`);
    stream.markdown("---\n\n");
    stream.markdown(`**Your request**: ${request.prompt}\n\n`);
    stream.markdown(
      "💡 *Use regular Copilot Chat with this agent's context to continue*\n\n",
    );

    if (agentContent) {
      stream.markdown(
        "📄 **Agent config loaded from**: `" + agent.path + "`\n",
      );
    }

    return;
  };

  const participant = vscode.chat.createChatParticipant(
    `bmad.${agent.name}`,
    handler,
  );

  participant.iconPath = new vscode.ThemeIcon("robot");

  context.subscriptions.push(participant);
}

export function deactivate() {}
