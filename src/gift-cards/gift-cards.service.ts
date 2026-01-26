import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftCard } from "./entities/gift-cards.entity";
import { Repository } from "typeorm/repository/Repository";
import { GiftCardCatalogDto } from "./dto/gift-card-catalog.dto";


@Injectable()
export class GiftCardsService {
    constructor(@InjectRepository(GiftCard) private giftCardRepository: Repository<GiftCard>) {}

    async getGiftCardCatalog(): Promise<GiftCardCatalogDto[]> {
    
    
    const giftCards = await this.giftCardRepository.find({
        where: { isActive: true },
        relations: ['shop'],
        order: { createdAt: 'DESC' }
    });

    return giftCards.map(giftCard => ({
        id: giftCard.id,
        name: giftCard.name,
        description: giftCard.description,
        imageUrl: giftCard.imageUrl,
        price: giftCard.price,
        currency: giftCard.currency,
        shop: {
            id: giftCard.shop.id,
            name: giftCard.shop.name,
        }
    }));

    
    }





}
