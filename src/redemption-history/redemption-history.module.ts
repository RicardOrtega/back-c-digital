import { Module } from "@nestjs/common";   
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedemptionHistory } from "./entities/redemption-history.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([RedemptionHistory]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class RedemptionHistoryModule {}