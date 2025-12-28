import { IsNotEmpty } from 'class-validator';

export class CreateFoundDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;
}
