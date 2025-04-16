import { IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FlowDefinitionDto } from './FlowDefinitionDto';

/**
 * @description Data Transfer Object for updating an existing Flow.
 * All properties are optional to allow partial updates.
 */
export class UpdateFlowDto {
    @IsString()
    @IsOptional()
      name?: string;

    @IsString()
    @IsOptional()
      description?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => FlowDefinitionDto)
    @IsOptional()
      definition?: FlowDefinitionDto;
}