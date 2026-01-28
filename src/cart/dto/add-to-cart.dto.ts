import { IsUUID, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsUUID()
  giftCardId: string;

  @IsInt()
  @Min(1)
  quantity: number = 1;
}