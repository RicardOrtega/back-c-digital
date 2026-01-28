import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { ShopModule } from './shops/shop.module';
import { GiftCardsModule } from './gift-cards/gift-cards.module';
import { PurchasesModule } from './purchases/purchases.module';
import { RedemptionHistoryModule } from './redemption-history/redemption-history.module';
import { GiftCardCodesModule } from './gift-cards-codes/gift-card-codes.module';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      }
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging:true,
        //esta configuracion solo aplica para conectarse a aiven en desarrollo
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    UserModule,
    ShopModule,
    GiftCardsModule,
    PurchasesModule,
    GiftCardCodesModule,
    RedemptionHistoryModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [{provide: APP_GUARD, useClass: ThrottlerGuard}, AppService],
})
export class AppModule {}
