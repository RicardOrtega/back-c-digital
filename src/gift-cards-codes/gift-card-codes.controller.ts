import {Controller,Post,Body,Get,HttpCode,HttpStatus} from'@nestjs/common';
import { GiftCardCodesService } from './gift-card-codes.service';

@Controller('gift-card-codes')
export class GiftCardCodesController {
    constructor (private readonly giftCardCodesService: GiftCardCodesService) {}

}