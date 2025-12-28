import { IsIn, IsNumber } from 'class-validator';

export class CreateClaimDto {
  @IsNumber()
  itemId: number;

  @IsIn(['lost', 'found'])
  itemType: 'lost' | 'found';
}
