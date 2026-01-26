import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftCardCode } from "./entities/gift-card-codes.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class GiftCardCodesService {
    constructor(@InjectRepository(GiftCardCode)private giftCardCodeRepository: Repository<GiftCardCode>,) {}

}
    
    