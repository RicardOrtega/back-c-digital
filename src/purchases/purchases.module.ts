import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Purchase]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class PurchasesModule {}