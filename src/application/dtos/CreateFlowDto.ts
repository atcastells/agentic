import { IsString, IsNotEmpty, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
// Remove direct import of FlowDefinition interface
// import { FlowDefinition } from '../../domain/entities/Flow'; 
import { FlowDefinitionDto } from './FlowDefinitionDto'; // Import the new DTO class

// We might need more specific DTOs for FlowDefinition, FlowStep, etc.
// For now, using the entity type directly and basic validation.

export class CreateFlowDto {
    @IsString()
    @IsNotEmpty()
      name!: string;

    @IsString()
    @IsOptional()
      description?: string;

    // Assuming the incoming request body has a 'definition' property matching FlowDefinition structure
    @IsObject() 
    @ValidateNested() // Enable validation for nested object properties if we add decorators there
    @Type(() => FlowDefinitionDto) // Use the DTO class here
    @IsNotEmpty()
      definition!: FlowDefinitionDto; // Type the property as the DTO class
}