import {Controller,Post,Body,Get,HttpCode,HttpStatus, Param, Put, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shops')
export class ShopController {
    constructor (private readonly shopService: ShopService) {}

    @UseGuards(JwtAuthGuard)
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
    async getShopById(@Param('id', ParseUUIDPipe) id: string) {
        return this.shopService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @HttpCode(HttpStatus.OK)
    async updateShop(@Param('id', ParseUUIDPipe) id: string, @Body() updateShopDto: UpdateShopDto) {
        return this.shopService.update(id, updateShopDto);
    }


}