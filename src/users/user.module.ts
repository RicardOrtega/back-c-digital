import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule,ConfigService} from "@nestjs/config";
import { User } from "./users.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET') || 'defaultSecret',
                signOptions: { expiresIn: (config.get<string | number>('JWT_EXPIRES_IN') || '1h') as any },
            }),
        }),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}