import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    title: string;
}
