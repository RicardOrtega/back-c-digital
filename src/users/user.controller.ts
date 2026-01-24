import {Controller,Post,Body,Get,HttpCode,HttpStatus} from'@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class UserController {
    constructor (private readonly userService: UserService) {}
    
    @Post('register')
    async register (@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto.email, registerDto.name, registerDto.password);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login (@Body() loginDto: LoginDto) {
        return this.userService.login (loginDto.email, loginDto.password);
    }



}