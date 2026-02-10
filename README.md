# BMAD Agents for VS Code

Bring your BMAD framework agents directly into GitHub Copilot Chat with intelligent autocomplete.

## Features

Chat with specialized AI agents using `@` mentions in Copilot Chat:

- `@pm` - **John** (Product Manager) - Expert in PRDs, user research, and product strategy
- `@dev` - **Amelia** (Senior Developer) - Full-stack development and code review
- `@qa` - **Quinn** (QA Engineer) - Test automation and quality assurance
- `@sm` - **Bob** (Scrum Master) - Agile ceremonies and story preparation
- `@architect` - **Winston** (System Architect) - Distributed systems and technical design
- `@analyst` - **Mary** (Business Analyst) - Requirements analysis and market research
- `@ux` - **Sally** (UX Designer) - User experience and interface design
- `@writer` - **Paige** (Technical Writer) - Documentation specialist

Each agent loads its configuration from your workspace's `_bmad/_config/agent-manifest.csv` file.

## Requirements

- VS Code 1.90.0 or higher
- A workspace with BMAD agent configuration files in `_bmad/_config/`
- GitHub Copilot subscription

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search for "BMAD Agents"
4. Click Install

### From VSIX file

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions (Cmd+Shift+X)
4. Click `...` menu → "Install from VSIX..."
5. Select the downloaded file
6. Reload VS Code

## Usage

1. Open Copilot Chat
2. Type `@` to see available agents
3. Select an agent (e.g., `@pm`)
4. Ask your question
5. The agent context is loaded and ready for conversation

## Development

### Setup

```bash
npm install
npm run compile
```

### Testing locally

1. Press F5 in VS Code to open Extension Development Host
2. Test the extension in the new window
3. Open Copilot Chat and try `@pm`, `@dev`, etc.

### Package for distribution

```bash
npm install -g @vsce/vsce
npm run package
```

Creates `bmad-agents-0.0.1.vsix`

## Publishing to VS Code Marketplace

### Prerequisites

1. Create a publisher account at [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Create a Personal Access Token (PAT) from [Azure DevOps](https://dev.azure.com):
   - Organization Settings → Personal Access Tokens
   - Scopes: **Marketplace (Manage)**

### Update package.json

Before publishing, update these fields in `package.json`:
- `publisher`: Your publisher ID from the marketplace
- `repository.url`: Your GitHub repository URL
- `version`: Semantic version number

### Publish

```bash
# Login with your publisher account
vsce login YOUR_PUBLISHER_ID

# Publish the extension
vsce publish

# Or publish a specific version
vsce publish minor
vsce publish patch
```

## License

MIT

Extensions > BMAD Agents > Désinstaller
