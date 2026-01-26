import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsBoolean, MaxLength, Min, IsIn, min } from "class-validator";

export class CreateGiftCardDto {

    @IsNotEmpty()
    @IsUUID()
    shopId: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    imageUrl?: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    @MaxLength(3)
    @IsIn(['CLP'])
    currency?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;


}