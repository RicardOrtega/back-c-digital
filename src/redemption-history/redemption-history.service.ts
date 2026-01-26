import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RedemptionHistory } from "./entities/redemption-history.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class RedemptionHistoryService {
    constructor(@InjectRepository(RedemptionHistory)private redemptionHistoryRepository: Repository<RedemptionHistory>,) {}
}