import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
// Remove direct import of AgentDefinition interface
// import { AgentDefinition } from '../../domain/entities/Agent'; 
import { AgentDefinitionDto } from './AgentDefinitionDto'; // Import the new DTO class

// We might need more specific DTOs for AgentDefinition, AgentStep, etc.
// For now, using the entity type directly and basic validation.

export class CreateAgentDto {
    @IsString()
    @IsNotEmpty()
      name!: string;

    @IsString()
    @IsOptional()
      description?: string;

    // Assuming the incoming request body has a 'definition' property matching AgentDefinition structure
    @IsObject() 
    @ValidateNested() // Enable validation for nested object properties if we add decorators there
    @Type(() => AgentDefinitionDto) // Use the DTO class here
    @IsNotEmpty()
      definition!: AgentDefinitionDto; // Type the property as the DTO class
}