# LLM Provider Abstraction

This module provides a standardized interface for integrating large language model (LLM) providers (e.g., OpenRouter, LM Studio) into the Agentic framework.

## Key Interfaces

- `LLMProvider`, `LLMOptions`, `LLMResult`, `LLMResultChunk` (see `types.ts`)
- Provider registration and selection (see `registry.ts`)

## Responsibilities

- Standardize LLM API (prompt, completion, streaming, metadata)
- Allow dynamic registration/unregistration of providers
- Provider selection via config/environment

## Extensibility

- Implement the `LLMProvider` interface to add new providers
- All configuration via environment variables/config files

## Getting Started

See `index.ts` for exports and start integrating with the Agentic SDK.