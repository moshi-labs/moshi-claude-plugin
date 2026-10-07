#!/usr/bin/env bash
# Builds the OpenAI (ChatGPT / Codex) plugin archive for upload at
# chatgpt.com/plugins or submission at platform.openai.com/plugins.
# plugin.json sits at the archive root. Claude-only files (.claude-plugin/,
# .mcp.json) are left out; skills/ is shared by both packages.
set -euo pipefail
cd "$(dirname "$0")/../plugins/moshi"
version=$(python3 -c 'import json; print(json.load(open("plugin.json"))["version"])')
out="../../dist/moshi-openai-${version}.zip"
mkdir -p ../../dist
rm -f "$out"
zip -qrX "$out" plugin.json mcp.json skills assets -x '*.DS_Store'
echo "$(cd ../../dist && pwd)/$(basename "$out")"
