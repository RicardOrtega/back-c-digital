import {Controller,Post,Body,Get,HttpCode,HttpStatus, Param} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopController {
    constructor (private readonly shopService: ShopService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async newShop(@Body() createShopDto: CreateShopDto) {
        return this.shopService.create(createShopDto);
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllShops() {
        return this.shopService.findAll();
    }

    @Get('detail/:id')
    @HttpCode(HttpStatus.OK)
    async getShopById(@Param('id') id: string) {
        return this.shopService.findById(id);
    }

    @Post('update/:id')
    @HttpCode(HttpStatus.OK)
    async updateShop(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
        return this.shopService.update(id, updateShopDto);
    }


}