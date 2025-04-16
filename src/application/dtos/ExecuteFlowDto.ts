import { IsObject, IsOptional } from 'class-validator';

/**
 * @description Data Transfer Object for executing a Flow.
 * Contains the input data required by the flow.
 */
export class ExecuteFlowDto {
    /**
     * @description Input data for the flow execution.
     * The specific structure depends on the flow definition.
     * Using Record<string, unknown> for flexibility, but consider
     * more specific validation or types if inputs are known.
     */
    @IsObject()
    @IsOptional() // Inputs might be optional depending on the flow
      inputs?: Record<string, unknown>;
}