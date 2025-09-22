import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateListDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    title: string;
}
