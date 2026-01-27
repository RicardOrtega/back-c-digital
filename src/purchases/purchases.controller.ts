import {Controller,Post,Body,Get,HttpCode,HttpStatus, Param} from'@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchases')
export class PurchasesController {
    constructor (private readonly purchasesService: PurchasesService) {}



    @Post('payment')
    @HttpCode (HttpStatus.CREATED)
    async createPurchase(@Body() createPurchaseDto:CreatePurchaseDto) {
        return this.purchasesService.purchase(createPurchaseDto);
    }

    @Get('user/:userId')
    async getPurchasesByUser(@Param('userId') userId: string) {
        return this.purchasesService.findByUser(userId);
    }

    @Get(':id')
    async getPurchaseById(@Param('id') id: string) {
        return this.purchasesService.findbyId(id);
    }

}