import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

// Basic DTOs for nested structures - add more specific validation as needed
class AgentStepDto {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    // Add validation for config if structure is known
    config!: Record<string, unknown>; 

    @IsOptional()
    @IsString()
    provider?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    next?: string[];
}

class AgentInputDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    // Assuming required is boolean, adjust if needed
    required!: boolean; 

    @IsOptional()
    default?: unknown;
}

class AgentOutputDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;
}

export class AgentDefinitionDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AgentStepDto)
    steps!: AgentStepDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AgentInputDto)
    inputs!: AgentInputDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AgentOutputDto)
    outputs!: AgentOutputDto[];
} 