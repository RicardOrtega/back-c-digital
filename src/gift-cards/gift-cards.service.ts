import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftCard } from "./entities/gift-cards.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class GiftCardsService {
    constructor(@InjectRepository(GiftCard) private giftCardRepository: Repository<GiftCard>) {}


}
