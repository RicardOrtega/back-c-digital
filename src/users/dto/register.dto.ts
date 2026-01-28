import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email format invalid'})
    @MaxLength(255)
    email: string;



    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString()
    @MinLength(8, {message: 'Password need to be at least 8 characters'})
    @MaxLength(20, {message: 'Maximum length for password is 20 characters'})
    password: string;
}