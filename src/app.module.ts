import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { Shop } from './shops/entities/shop.entity';
import { ShopModule } from './shops/shop.module';
import { GiftCardsModule } from './gift-cards/gift-cards.module';
import { PurchasesModule } from './purchases/purchases.module';
import { RedemptionHistoryModule } from './redemption-history/redemption-history.module';
import { GiftCardCodesModule } from './gift-cards-codes/gift-card-codes-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
        logging:true
      }),
    }),
    UserModule,
    ShopModule,
    GiftCardsModule,
    PurchasesModule,
    GiftCardCodesModule,
    RedemptionHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
