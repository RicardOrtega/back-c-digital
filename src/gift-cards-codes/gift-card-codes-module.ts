import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftCardCode } from "./entites/gift-card-codes.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftCardCode]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class GiftCardCodesModule {}