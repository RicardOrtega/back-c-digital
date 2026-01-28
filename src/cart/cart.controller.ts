import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponseDto } from './dto/cart-response.dto';

const CART_COOKIE_NAME = 'cart_items';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  path: '/',
};

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCart(@Req() req: Request): Promise<CartResponseDto> {
    const cartCookie = req.cookies[CART_COOKIE_NAME];
    const cartItems = cartCookie ? JSON.parse(cartCookie) : [];
    return this.cartService.getCartWithDetails(cartItems);
  }

  @Post('add')
  @HttpCode(HttpStatus.OK)
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CartResponseDto> {
    
    await this.cartService.validateGiftCard(addToCartDto.giftCardId);

    
    const cartCookie = req.cookies[CART_COOKIE_NAME];
    const currentCart = cartCookie ? JSON.parse(cartCookie) : [];

    
    const updatedCart = this.cartService.addItemToCart(
      currentCart,
      addToCartDto.giftCardId,
      addToCartDto.quantity,
    );

    
    res.cookie(CART_COOKIE_NAME, JSON.stringify(updatedCart), COOKIE_OPTIONS);

   
    return this.cartService.getCartWithDetails(updatedCart);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async updateCartItem(
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CartResponseDto> {
    const cartCookie = req.cookies[CART_COOKIE_NAME];
    const currentCart = cartCookie ? JSON.parse(cartCookie) : [];

    const updatedCart = this.cartService.updateItemQuantity(
      currentCart,
      updateCartItemDto.giftCardId,
      updateCartItemDto.quantity,
    );

    res.cookie(CART_COOKIE_NAME, JSON.stringify(updatedCart), COOKIE_OPTIONS);

    return this.cartService.getCartWithDetails(updatedCart);
  }

  @Delete('remove/:giftCardId')
  @HttpCode(HttpStatus.OK)
  async removeFromCart(
    @Param('giftCardId', ParseUUIDPipe) giftCardId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CartResponseDto> {
    const cartCookie = req.cookies[CART_COOKIE_NAME];
    const currentCart = cartCookie ? JSON.parse(cartCookie) : [];

    const updatedCart = this.cartService.removeItemFromCart(currentCart, giftCardId);

    res.cookie(CART_COOKIE_NAME, JSON.stringify(updatedCart), COOKIE_OPTIONS);

    return this.cartService.getCartWithDetails(updatedCart);
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  async clearCart(@Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    res.clearCookie(CART_COOKIE_NAME, { path: '/' });
    return { message: 'Carrito vaciado exitosamente' };
  }
}