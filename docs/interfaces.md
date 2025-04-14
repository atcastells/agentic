# Agentic Framework Core Interfaces & Contracts

This document defines the public interfaces, APIs, and configuration contracts for the Agentic framework. It is intended as a reference for developers extending, integrating, or building on core modules.

---

## Table of Contents

- [Overview](#overview)
- [Agent Flow Engine](#agent-flow-engine)
- [LLM Provider Abstraction](#llm-provider-abstraction)
- [MCP Adapter](#mcp-adapter)
- [MongoDB Storage](#mongodb-storage)
- [OpenTelemetry Observability](#opentelemetry-observability)
- [TypeScript SDK/API Surface](#typescript-sdkapi-surface)
- [Configuration & Environment](#configuration--environment)
- [Extensibility Guidelines](#extensibility-guidelines)

---

## Overview

Agentic is a modular Node.js/TypeScript framework for building agentic systems. Its architecture emphasizes plug-and-play modules, clear contracts, and extensibility.

---

## Agent Flow Engine

**Purpose:**  
Defines, loads, executes, and manages agent flows (decision/action graphs) persisted in MongoDB.

**Responsibilities:**
- Parse and validate agent flow definitions (TypeScript interfaces/classes)
- Load flows from storage (dynamic, versioned)
- Execute flows via the Agent Engine, emitting events (onStep, onDecision, onError)
- Integrate with LLM providers and MCP adapters

**Key Interfaces:**

```typescript
export interface AgentFlow {
  id: string;
  name: string;
  version: string;
  steps: FlowStep[];
  metadata?: Record<string, any>;
}

export interface FlowStep {
  id: string;
  type: 'action' | 'decision' | 'llm' | string;
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
  next?: string | string[];
  config?: Record<string, any>;
}
```

**Public Methods:**

```typescript
defineFlow(flowDef: AgentFlow): string;
runFlow(flowId: string, input: any): Promise<FlowResult>;
listFlows(): Promise<AgentFlow[]>;
```

**Event Hooks:**
- `onStep(step: FlowStep, context: any): void`
- `onDecision(decision: any, context: any): void`
- `onError(error: Error, context: any): void`

---

## LLM Provider Abstraction

**Purpose:**  
Decouples LLM integration, enabling support for multiple providers (OpenRouter, LM Studio, etc).

**Responsibilities:**
- Standardize LLM API (prompt, completion, streaming, metadata)
- Allow dynamic registration/unregistration of providers
- Select provider based on config or flow metadata

**Key Interface:**

```typescript
export interface LLMProvider {
  id: string;
  name: string;
  supportsStreaming: boolean;
  generateCompletion(prompt: string, options?: LLMOptions): Promise<LLMResult>;
  streamCompletion?(prompt: string, options?: LLMOptions): AsyncIterable<LLMResultChunk>;
  getMetadata?(): Promise<Record<string, any>>;
}
```

**Provider Registration:**

```typescript
registerLLMProvider(provider: LLMProvider): void;
```

**Example Usage:**

```typescript
const result = await provider.generateCompletion("Summarize this text:", { temperature: 0.7 });
```

---

## MCP Adapter

**Purpose:**  
Injects Model Context Protocol (MCP) context at various agent lifecycle stages.

**Responsibilities:**
- Provide hooks for pre/post LLM call and agent lifecycle events
- Allow per-flow configuration of context injection points

**Key Interface:**

```typescript
export interface MCPAdapter {
  id: string;
  name: string;
  onPreLLMCall?(context: any): Promise<any>;
  onPostLLMCall?(result: any, context: any): Promise<any>;
  onAgentEvent?(event: string, context: any): Promise<any>;
}
```

**Adapter Registration:**

```typescript
setMCPAdapter(adapter: MCPAdapter): void;
```

---

## MongoDB Storage

**Purpose:**  
Persist agent flows, execution logs, and related metadata.

**Responsibilities:**
- Store and retrieve AgentFlow objects (with schema versioning)
- Store execution history, logs, and trace data
- Provide efficient querying for flow management

**Key Data Structures:**
- `AgentFlow` (see above)
- `FlowExecutionLog`  
  ```typescript
  interface FlowExecutionLog {
    flowId: string;
    runId: string;
    timestamp: Date;
    input: any;
    output: any;
    status: 'success' | 'error';
    error?: string;
    traceId?: string;
  }
  ```

**Extensibility:**  
Storage adapters may be swapped (e.g., for testing or future DBs) by implementing a storage interface.

---

## OpenTelemetry Observability

**Purpose:**  
Enable distributed tracing, metrics, and logging across all core modules.

**Responsibilities:**
- Instrument Agent Engine, LLM calls, MCP context, and flow execution
- Support custom trace attributes and span exporters

**Integration Example:**

```typescript
import { trace, Span, context } from '@opentelemetry/api';

const tracer = trace.getTracer('agentic.flow');
const span = tracer.startSpan('runFlow', { attributes: { flowId } });
// ...execute flow logic...
span.end();
```

**Configuration:**
- Exporter endpoint, sampling, and trace context set via environment variables (see below).

---

## TypeScript SDK/API Surface

**Purpose:**  
Expose the minimal and advanced APIs for defining, running, and managing agent flows.

**Minimal API:**

```typescript
defineFlow(flowDef: AgentFlow): string;
runFlow(flowId: string, input: any): Promise<FlowResult>;
listFlows(): Promise<AgentFlow[]>;
registerLLMProvider(provider: LLMProvider): void;
setMCPAdapter(adapter: MCPAdapter): void;
```

**Advanced API:**
- Event hooks: `onStep`, `onDecision`, `onError`
- Custom agent actions
- Observability configuration

---

## Configuration & Environment

**Required Environment Variables:**
- MongoDB connection string (do not hard-code)
- LLM provider API keys or endpoints (never hard-code secrets)
- OpenTelemetry exporter endpoint and options

**Configuration Patterns:**
- Use `.env` files or environment variables for all sensitive/configurable values.
- Never commit secrets to version control.
- Configuration should be injectable and overridable for testing/extensibility.

---

## Extensibility Guidelines

- All modules expose interfaces for plugging in new providers/adapters.
- Use dependency injection for storage, LLM, and MCP modules.
- Favor composition over inheritance for extending core behaviors.
- Maintain strict separation of concerns between flow engine, LLM, MCP, storage, and observability.
- Document new interfaces and contracts when extending.

---