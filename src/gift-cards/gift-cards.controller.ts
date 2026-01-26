import {Controller,Post,Body,Get,HttpCode,HttpStatus} from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';
import { GiftCardCatalogDto } from './dto/gift-card-catalog.dto';

@Controller('gift-cards')
export class GiftCardsController {
    constructor (private readonly giftCardsService: GiftCardsService) {}

    @Get('catalog')
    @HttpCode(HttpStatus.OK)
    async GiftCardCatalog(): Promise<GiftCardCatalogDto[]> {
        return this.giftCardsService.getGiftCardCatalog();
    }


}