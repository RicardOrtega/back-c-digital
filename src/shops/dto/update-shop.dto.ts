import { IsEmail,IsEnum,IsOptional,IsString,MaxLength } from "class-validator";
import { ShopStatus } from "../entities/shop.entity";

export class UpdateShopDto {
    @IsString()
    @IsOptional()
    @MaxLength(255) 
    name?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email?: string;

    @IsOptional()
    @IsEnum(ShopStatus)
    status?: ShopStatus;
}