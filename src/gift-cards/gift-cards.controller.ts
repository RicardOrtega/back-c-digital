import {Controller,Post,Body,Get,HttpCode,HttpStatus, ParseUUIDPipe, Param, Put, UseGuards} from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';
import { GiftCardCatalogDto } from './dto/gift-card-catalog.dto';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { GiftCard } from './entities/gift-cards.entity';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('gift-cards')
export class GiftCardsController {
    constructor (private readonly giftCardsService: GiftCardsService) {}

    @Get('catalog')
    @HttpCode(HttpStatus.OK)
    async GiftCardCatalog(): Promise<GiftCardCatalogDto[]> {
        return this.giftCardsService.getGiftCardCatalog();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createCard(@Body()data: CreateGiftCardDto):Promise<GiftCard>{
        return this.giftCardsService.createGiftCard(data);
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async findAllCards():Promise<GiftCard[]>{
        return this.giftCardsService.findAll();
    }

    @Get('shop/:id')
    @HttpCode(HttpStatus.OK)
    async findByStoreId(@Param('id', ParseUUIDPipe) id: string):Promise<GiftCard[]>{
        return this.giftCardsService.findByShop(id);
    }
    
    @Get('detail/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<GiftCard> {
        return this.giftCardsService.findById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @HttpCode(HttpStatus.OK)
    async updateCard(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateGiftCardDto): Promise<GiftCard> {
        return this.giftCardsService.updateCard(id, data);
    }



}