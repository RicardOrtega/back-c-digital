import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity";
import { PurchasesController } from "./purchases.controller";
import { PurchasesService } from "./purchases.service";
import { GiftCardCodesModule } from "src/gift-cards-codes/gift-card-codes.module";
import { GiftCardsModule } from "src/gift-cards/gift-cards.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Purchase]),
        GiftCardsModule,
        GiftCardCodesModule,
        AuthModule
    ],
    controllers: [PurchasesController],
    providers: [PurchasesService],
    exports: [PurchasesService],
})
export class PurchasesModule {}