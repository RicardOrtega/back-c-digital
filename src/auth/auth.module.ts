import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule,ConfigService } from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET') || 'defaultSecret' ,
                signOptions: { 
                    expiresIn: (configService.get('JWT_EXPIRES_IN') || '24h')
                 },
            }),
        }),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule,JwtStrategy],
})
export class AuthModule {}