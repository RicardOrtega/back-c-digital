import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftCardCode } from "./entities/gift-card-codes.entity";
import { GiftCardCodesController } from "./gift-card-codes.controller";
import { GiftCardCodesService } from "./gift-card-codes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftCardCode]),
    ],
    controllers: [GiftCardCodesController],
    providers: [GiftCardCodesService],
    exports: [GiftCardCodesService],
})
export class GiftCardCodesModule {}