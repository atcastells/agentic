import { IsArray, IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// Basic DTOs for nested structures - add more specific validation as needed
class FlowStepDto {
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
    @IsArray()
    @IsString({ each: true })
    next?: string[];
}

class FlowInputDto {
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

class FlowOutputDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;
}

export class FlowDefinitionDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FlowStepDto)
    steps!: FlowStepDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FlowInputDto)
    inputs!: FlowInputDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FlowOutputDto)
    outputs!: FlowOutputDto[];

    @IsString()
    @IsNotEmpty()
    llmProvider!: string;
} 