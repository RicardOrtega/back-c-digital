import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255) 
    name: string;   

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

}