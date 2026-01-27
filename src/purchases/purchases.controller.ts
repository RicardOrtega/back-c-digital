import {Controller,Post,Body,Get,HttpCode,HttpStatus, Param, UseGuards, UnauthorizedException} from'@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('purchases')
export class PurchasesController {
    constructor (private readonly purchasesService: PurchasesService) {}


    @UseGuards(JwtAuthGuard)
    @Post('payment')
    @HttpCode (HttpStatus.CREATED)
    async createPurchase(@Body() createPurchaseDto:CreatePurchaseDto, @CurrentUser() user:any) {
        
        if(user.userId !== createPurchaseDto.userId){
            throw new UnauthorizedException('Unauthorized purchase attempt');
        }
       
        return this.purchasesService.purchase(createPurchaseDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    async getPurchasesByUser(@Param('userId') userId: string,@CurrentUser() user:any) {

        if(user.userId !== userId){
            throw new UnauthorizedException('Unauthorized access to purchases');
        }

        return this.purchasesService.findByUser(userId);
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPurchaseById(@Param('id') id: string) {
        return this.purchasesService.findbyId(id);
    }

}