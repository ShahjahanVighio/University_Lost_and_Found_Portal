import { IsNotEmpty } from 'class-validator';

export class CreateLostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;
}
