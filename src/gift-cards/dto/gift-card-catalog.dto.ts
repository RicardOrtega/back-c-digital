export class GiftCardCatalogDto {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    currency: string;
    shop:{
        id: string;
        name: string;
    }
}