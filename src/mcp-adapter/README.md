# MCP Adapter

This module provides Model Context Protocol (MCP) integration hooks for the Agentic framework.

## Key Interface

- `MCPAdapter` (see `types.ts`)
- Adapter registration (see `registry.ts`)

## Responsibilities

- Inject MCP context at various agent lifecycle stages
- Provide hooks for pre/post LLM call and agent events
- Allow per-flow configuration of context injection

## Extensibility

- Implement the `MCPAdapter` interface to add new adapters
- All configuration via environment variables/config files

## Getting Started

See `index.ts` for exports and start integrating with the Agentic SDK.