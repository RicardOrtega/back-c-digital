import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftCard } from "./entities/gift-cards.entity";
import { Repository } from "typeorm/repository/Repository";
import { GiftCardCatalogDto } from "./dto/gift-card-catalog.dto";
import { CreateGiftCardDto } from "./dto/create-gift-card.dto";
import { UpdateGiftCardDto } from "./dto/update-gift-card.dto";


@Injectable()
export class GiftCardsService {
    constructor(@InjectRepository(GiftCard) private giftCardRepository: Repository<GiftCard>) { }

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
            stock: giftCard.stock,
            shop: {
                id: giftCard.shop.id,
                name: giftCard.shop.name,
            }
        }));


    }

    async createGiftCard(data: CreateGiftCardDto): Promise<GiftCard> {
        const newgiftCard = this.giftCardRepository.create({
            ...data,
            price: data.price.toString(),

        });

        return this.giftCardRepository.save(newgiftCard);

    }

    async findAll(): Promise<GiftCard[]> {
        return this.giftCardRepository.find({ relations: ['shop'], order: { createdAt: 'DESC' } });
    }

    async findById(id: string): Promise<GiftCard> {
        const card = await this.giftCardRepository.findOne({ where: { id }, relations: ['shop'] });

        if (!card) {
            throw new NotFoundException(`Gift Card no encontrada o inexistente`);
        }

        return card;

    }


    async findByShop(shopId: string): Promise<GiftCard[]> {
        return this.giftCardRepository.find({ where: { shopid: shopId }, relations: ['shop'], order: { createdAt: 'DESC' } });
    }


    async updateCard(id: string, data: UpdateGiftCardDto): Promise<GiftCard> {
        const card = await this.findById(id);

        const updateData = { ...data };
        if (data.price !== undefined) {

            updateData.price = data.price.toString();
        }
        Object.assign(card, updateData);
        return this.giftCardRepository.save(card);
    }


}
