import {Controller,Post,Body,Get,HttpCode,HttpStatus} from '@nestjs/common';

import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
    constructor (private readonly shopService: ShopService) {}

}