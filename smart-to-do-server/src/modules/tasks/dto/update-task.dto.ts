import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MaxLength(500)
    title?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}