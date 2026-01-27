import { IsString,IsNumber,IsOptional,IsBoolean,MaxLength,Min,IsIn } from "class-validator";


export class UpdateGiftCardDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    imageUrl?: string;

    @IsOptional()
    @IsString()
    @Min(0)
    price?: string;

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
    stock?: number;


}