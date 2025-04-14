# Agent Flow Engine

This module defines, loads, executes, and manages agent flows (decision/action graphs) for the Agentic framework.

## Key Interfaces

- `AgentFlow`, `FlowStep` (see `types.ts`)
- Engine methods: `defineFlow`, `runFlow`, `listFlows` (see `engine.ts`)
- Event hooks: `onStep`, `onDecision`, `onError` (see `events.ts`)

## Responsibilities

- Parse/validate agent flow definitions
- Load and execute flows (with event hooks)
- Integrate with LLM providers, MCP adapters, and storage

## Extensibility

- All configuration via environment variables/config files
- Event hooks and engine can be extended via subclassing or composition

## Getting Started

See `index.ts` for exports and start integrating with the Agentic SDK.