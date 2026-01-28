export class CartItemDto {
  giftCardId: string;
  quantity: number;
  giftCard: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    currency: string;
    shop: {
      id: string;
      name: string;
    };
  };
}

export class CartResponseDto {
  items: CartItemDto[];
  totalItems: number;
  totalPrice: number;
}