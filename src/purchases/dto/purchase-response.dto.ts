export class PurchaseResponseDto {
    id: string;
    giftCardName: string;
    amount: string;
    status:string
    code: string;
    expirationDate: Date;
    purchasedAt: Date;
    paymentMethod?: string;
}