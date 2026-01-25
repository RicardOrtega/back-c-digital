import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftCard } from "./entities/gift-cards.entity";
import { GiftCardsController } from "./gift-cards.controller";
import { GiftCardsService } from "./gift-cards.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftCard]),
    ],
    controllers: [GiftCardsController],
    providers: [GiftCardsService],
    exports: [GiftCardsService],
})
export class GiftCardsModule {}