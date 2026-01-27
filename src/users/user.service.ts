import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm/repository/Repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly jwtService: JwtService) {}
    

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async createUser(email: string, name: string, password: string): Promise<User> {
       const exists = await this.userRepository.findOne({where:{email}});
       if (exists) {
        throw new Error('email already in use');
       } 
        const hashedPassword = await this.hashPassword(password);
        const newUser = this.userRepository.create({
            email,
            name,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({where:{email}});
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }

     async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if(!user) {
            throw new Error ('Invalid credentials');
        }       

        const payload   = { userId: user.id, email: user.email , name: user.name};

        return {
            access_token: this.jwtService.sign(payload),
            user:user
        };

 }
}
