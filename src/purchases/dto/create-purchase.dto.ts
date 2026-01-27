import { IsUUID, IsString, IsOptional } from "class-validator";

export class CreatePurchaseDto {
    @IsUUID()
    giftCardId: string;

    @IsUUID()
    userId: string;

    @IsString()
    @IsOptional()
    paymentMethod?: string;


}