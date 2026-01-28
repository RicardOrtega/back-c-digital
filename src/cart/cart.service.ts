import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from '../gift-cards/entities/gift-cards.entity';
import { CartItemDto, CartResponseDto } from './dto/cart-response.dto';

interface CartCookieItem {
  giftCardId: string;
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(GiftCard)
    private giftCardRepository: Repository<GiftCard>,
  ) {}

  async getCartWithDetails(cartItems: CartCookieItem[]): Promise<CartResponseDto> {
    if (!cartItems || cartItems.length === 0) {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }

    const giftCardIds = cartItems.map(item => item.giftCardId);
    const giftCards = await this.giftCardRepository.find({
      where: giftCardIds.map(id => ({ id })),
      relations: ['shop'],
    });

    const items: CartItemDto[] = cartItems.map(cartItem => {
      const giftCard = giftCards.find(gc => gc.id === cartItem.giftCardId);
      
      if (!giftCard) {
        return null;
      }

      return {
        giftCardId: cartItem.giftCardId,
        quantity: cartItem.quantity,
        giftCard: {
          id: giftCard.id,
          name: giftCard.name,
          imageUrl: giftCard.imageUrl,
          price: giftCard.price,
          currency: giftCard.currency,
          shop: {
            id: giftCard.shop.id,
            name: giftCard.shop.name,
          },
        },
      };
    }).filter(item => item !== null);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + parseFloat(item.giftCard.price) * item.quantity,
      0,
    );

    return {
      items,
      totalItems,
      totalPrice,
    };
  }

  async validateGiftCard(giftCardId: string): Promise<GiftCard> {
    const giftCard = await this.giftCardRepository.findOne({
      where: { id: giftCardId },
      relations: ['shop'],
    });

    if (!giftCard) {
      throw new NotFoundException(`Gift Card con id ${giftCardId} no encontrada`);
    }

    if (!giftCard.isActive) {
      throw new NotFoundException(`Gift Card no está disponible`);
    }

    return giftCard;
  }

  addItemToCart(currentCart: CartCookieItem[], giftCardId: string, quantity: number): CartCookieItem[] {
    const cart = currentCart || [];
    const existingItem = cart.find(item => item.giftCardId === giftCardId);

    if (existingItem) {
      existingItem.quantity += quantity;
      return cart;
    }

    return [...cart, { giftCardId, quantity }];
  }

  removeItemFromCart(currentCart: CartCookieItem[], giftCardId: string): CartCookieItem[] {
    const cart = currentCart || [];
    return cart.filter(item => item.giftCardId !== giftCardId);
  }

  updateItemQuantity(currentCart: CartCookieItem[], giftCardId: string, quantity: number): CartCookieItem[] {
    const cart = currentCart || [];
    const item = cart.find(item => item.giftCardId === giftCardId);

    if (!item) {
      throw new NotFoundException('Item no encontrado en el carrito');
    }

    item.quantity = quantity;
    return cart;
  }
}