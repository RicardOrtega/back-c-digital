import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./entities/shop.entity";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop]),
        AuthModule
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService],
})
export class ShopModule {}