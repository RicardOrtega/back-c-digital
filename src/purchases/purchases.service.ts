import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase, PurchaseStatus } from "./entities/purchase.entity";
import { Repository } from "typeorm/repository/Repository";
import { GiftCardsService } from "src/gift-cards/gift-cards.service";
import { GiftCardCodesService } from "src/gift-cards-codes/gift-card-codes.service";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { PurchaseResponseDto } from "./dto/purchase-response.dto";

@Injectable()
export class PurchasesService {
    constructor(@InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private giftCardsService:GiftCardsService,
    private giftCardCodesService: GiftCardCodesService

    
) {}

async purchase(data:CreatePurchaseDto):Promise<PurchaseResponseDto> {

    const giftCard = await this.giftCardsService.findById(data.giftCardId);

    if(!giftCard.isActive) {
        throw new BadRequestException('gift card not avaliable');
    }

    if(giftCard.stock <=0) {
        throw new BadRequestException ('gift card Not in stock');
    }


    const purchase = this.purchaseRepository.create({
       userid: data.userId,
       giftcardid: data.giftCardId,
       purchaseAmount: giftCard.price,
       status: PurchaseStatus.PENDING,
       paymentMethod: data.paymentMethod || 'Not specified',
        purchasedAt: new Date(),
    });
       
    const savePurchase = await this.purchaseRepository.save(purchase);
    
    await this.processPayment(savePurchase.id);

    const code = await this.giftCardCodesService.generateCode(savePurchase.id);

    await this.giftCardsService.updateCard(giftCard.id, {stock:giftCard.stock -1})

    return {
        id: savePurchase.id,
        giftCardName: giftCard.name,
        amount: savePurchase.purchaseAmount,
        status: PurchaseStatus.COMPLETED,
        code: code.code,
        expirationDate: code.expirationDate,
        purchasedAt: savePurchase.purchasedAt,
        paymentMethod: savePurchase.paymentMethod,
    }

}


private async processPayment(purchaseId:string):Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await this.purchaseRepository.update(purchaseId, {
        status: PurchaseStatus.COMPLETED,
    });


}

async findByUser(userId:string):Promise<Purchase[]>{
    return this.purchaseRepository.find({
        where:{userid:userId},
        relations:['giftCard','giftCard.shop'],
        order:{purchasedAt:'DESC'},
    });
}

async findbyId(id:string):Promise<Purchase>{
    const purchase = await this.purchaseRepository.findOne({
        where:{id},
        relations:['giftCard','giftCard.shop','user','giftCardCode'],
    });

    if(!purchase) {
        throw new NotFoundException('purchase Does not exist');
    }
    return purchase

}
    
}