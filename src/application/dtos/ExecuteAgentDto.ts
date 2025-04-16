import { IsObject, IsOptional } from 'class-validator';

/**
 * @description Data Transfer Object for executing a Agent.
 * Contains the input data required by the agent.
 */
export class ExecuteAgentDto {
    /**
     * @description Input data for the agent execution.
     * The specific structure depends on the agent definition.
     * Using Record<string, unknown> for flexibility, but consider
     * more specific validation or types if inputs are known.
     */
    @IsObject()
    @IsOptional() // Inputs might be optional depending on the agent
      inputs?: Record<string, unknown>;
}