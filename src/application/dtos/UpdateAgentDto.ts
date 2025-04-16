import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AgentDefinitionDto } from './AgentDefinitionDto';

/**
 * @description Data Transfer Object for updating an existing Agent.
 * All properties are optional to allow partial updates.
 */
export class UpdateAgentDto {
    @IsString()
    @IsOptional()
      name?: string;

    @IsString()
    @IsOptional()
      description?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => AgentDefinitionDto)
    @IsOptional()
      definition?: AgentDefinitionDto;
}