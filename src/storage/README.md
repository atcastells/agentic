# MongoDB Storage

This module provides persistence for agent flows, execution logs, and related metadata in the Agentic framework.

## Key Interfaces

- `AgentFlow` (see `../agent-flow/types.ts`)
- `FlowExecutionLog`, `StorageAdapter` (see `types.ts`)
- MongoDB implementation (see `mongo.ts`)

## Responsibilities

- Store/retrieve agent flows with schema versioning
- Store execution history, logs, trace data
- Provide efficient querying for flow management

## Extensibility

- Swap adapters by implementing the `StorageAdapter` interface
- All configuration via environment variables/config files

## Getting Started

See `index.ts` for exports and start integrating with the Agentic SDK.