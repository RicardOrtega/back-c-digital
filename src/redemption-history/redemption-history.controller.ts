import {Controller,Post,Body,Get,HttpCode,HttpStatus} from'@nestjs/common';
import { RedemptionHistoryService } from './redemption-history.service';

@Controller('redemption-history')
export class RedemptionHistoryController {
    constructor (private readonly redemptionHistoryService: RedemptionHistoryService) {}
}