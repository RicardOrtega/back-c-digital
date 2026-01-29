import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftCard } from "./entities/gift-cards.entity";
import { GiftCardsController } from "./gift-cards.controller";
import { GiftCardsService } from "./gift-cards.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftCard]),
        AuthModule
    ],
    controllers: [GiftCardsController],
    providers: [GiftCardsService],
    exports: [GiftCardsService],
})
export class GiftCardsModule {}