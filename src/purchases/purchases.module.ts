import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardCodesModule } from "../gift-cards-codes/gift-card-codes.module";  
import { GiftCardsModule } from "../gift-cards/gift-cards.module";  
import { AuthModule } from "../auth/auth.module";  

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