import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { GiftCard } from '../gift-cards/entities/gift-cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}