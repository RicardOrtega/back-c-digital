import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftCardCode, GiftCardCodeStatus } from "./entities/gift-card-codes.entity";
import { Repository } from "typeorm/repository/Repository";
import { randomBytes } from "crypto";

@Injectable()
export class GiftCardCodesService {
    constructor(@InjectRepository(GiftCardCode) private giftCardCodeRepository: Repository<GiftCardCode>,) { }


    async generateCode(purchaseId: string): Promise<GiftCardCode> {
        const code = await this.generateUniqueCode();

        const expirationDate = new Date();

        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        const giftCardCode = this.giftCardCodeRepository.create({
            purchaseid: purchaseId,
            code,
            status: GiftCardCodeStatus.active,
            expirationDate,
        });

        return this.giftCardCodeRepository.save(giftCardCode);

    }

    private async generateUniqueCode(): Promise<string> {

        let code: string;
        let exists = true;


        while (exists) {
            const randomPart = randomBytes(8).toString('hex').toUpperCase();
            code = `${randomPart.slice(0, 4)}-${randomPart.slice(4, 8)}-${randomPart.slice(8, 12)}-${randomPart.slice(12, 16)} `;

            exists = await this.giftCardCodeRepository.exist({
                where: { code }
            })

        }

        return code;

    }

    async validateCode(code: string): Promise<GiftCardCode | null> {
        return this.giftCardCodeRepository.findOne({ 
            where: { code },
            relations: ['purchase', 'purchase.giftCard','redeemedInShop']
        });
        
    }



}

