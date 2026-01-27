import { Module } from "@nestjs/common";   
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedemptionHistory } from "./entities/redemption-history.entity";
import { RedemptionHistoryController } from "./redemption-history.controller";
import { RedemptionHistoryService } from "./redemption-history.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RedemptionHistory]),
    ],
    controllers: [RedemptionHistoryController],
    providers: [RedemptionHistoryService],
    exports: [RedemptionHistoryService],
})
export class RedemptionHistoryModule {}