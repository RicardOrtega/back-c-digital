import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftCard } from "./gift-cards.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftCard]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class GiftCardsModule {}