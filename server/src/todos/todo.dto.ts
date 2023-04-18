import { IsBoolean, IsString, Length } from 'class-validator';

export class TodoDto {
  @IsString()
  id: string;

  @IsString()
  @Length(1, 100)
  text: string;

  @IsBoolean()
  isComplete: boolean;
}
