import {Controller,Post,Body,Get,HttpCode,HttpStatus} from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';

@Controller('gift-cards')
export class GiftCardsController {
    constructor (private readonly giftCardsService: GiftCardsService) {}
}