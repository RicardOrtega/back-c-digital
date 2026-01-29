// test/purchases.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Shop } from '../shops/entities/shop.entity';
import { GiftCard } from '../gift-cards/entities/gift-cards.entity';
import { Repository } from 'typeorm';

describe('Purchases (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let shopRepository: Repository<Shop>;
  let giftCardRepository: Repository<GiftCard>;
  let accessToken: string;
  let userId: string;
  let giftCardId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    shopRepository = moduleFixture.get<Repository<Shop>>(
      getRepositoryToken(Shop),
    );
    giftCardRepository = moduleFixture.get<Repository<GiftCard>>(
      getRepositoryToken(GiftCard),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Setup: Create user, shop, and gift card
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'buyer@example.com',
        name: 'Buyer User',
        password: 'password123',
      });

    userId = registerResponse.body.id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'buyer@example.com',
        password: 'password123',
      });

    accessToken = loginResponse.body.access_token;

    // Create shop
    const shop = shopRepository.create({
      name: 'Test Shop',
      email: 'shop@example.com',
    });
    const savedShop = await shopRepository.save(shop);

    // Create gift card
    const giftCard = giftCardRepository.create({
      shopid: savedShop.id,
      name: 'Test Gift Card',
      description: 'Test Description',
      price: '100.00',
      stock: 10,
      isActive: true,
    });
    const savedGiftCard = await giftCardRepository.save(giftCard);
    giftCardId = savedGiftCard.id;
  });

  describe('/purchases (POST)', () => {
    it('should create a purchase successfully', () => {
      return request(app.getHttpServer())
        .post('/purchases')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          giftCardId: giftCardId,
          paymentMethod: 'Credit Card',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('code');
          expect(res.body).toHaveProperty('expirationDate');
          expect(res.body.giftCardName).toBe('Test Gift Card');
          expect(res.body.amount).toBe('100.00');
          expect(res.body.status).toBe('Completado');
        });
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer())
        .post('/purchases')
        .send({
          giftCardId: giftCardId,
          paymentMethod: 'Credit Card',
        })
        .expect(401);
    });

    it('should fail with invalid gift card id', () => {
      return request(app.getHttpServer())
        .post('/purchases')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          giftCardId: '00000000-0000-0000-0000-000000000000',
          paymentMethod: 'Credit Card',
        })
        .expect(404);
    });
  });

  describe('/purchases/user/:userId (GET)', () => {
    beforeEach(async () => {
      // Create a purchase first
      await request(app.getHttpServer())
        .post('/purchases')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          giftCardId: giftCardId,
          paymentMethod: 'Credit Card',
        });
    });

    it('should get all purchases for a user', () => {
      return request(app.getHttpServer())
        .get(`/purchases/user/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('giftCard');
        });
    });
  });
});