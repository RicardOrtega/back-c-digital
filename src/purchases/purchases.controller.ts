import {Controller,Post,Body,Get,HttpCode,HttpStatus} from'@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
    constructor (private readonly purchasesService: PurchasesService) {}
}