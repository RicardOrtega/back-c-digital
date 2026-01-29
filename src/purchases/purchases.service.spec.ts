
import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from './purchases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Purchase, PurchaseStatus } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { GiftCardsService } from '../gift-cards/gift-cards.service';
import { GiftCardCodesService } from '../gift-cards-codes/gift-card-codes.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let purchaseRepository: Repository<Purchase>;
  let giftCardsService: GiftCardsService;
  let giftCardCodesService: GiftCardCodesService;

  const mockPurchaseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockGiftCardsService = {
    findById: jest.fn(),
    updateCard: jest.fn(),
  };

  const mockGiftCardCodesService = {
    generateCode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: mockPurchaseRepository,
        },
        {
          provide: GiftCardsService,
          useValue: mockGiftCardsService,
        },
        {
          provide: GiftCardCodesService,
          useValue: mockGiftCardCodesService,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
    purchaseRepository = module.get<Repository<Purchase>>(
      getRepositoryToken(Purchase),
    );
    giftCardsService = module.get<GiftCardsService>(GiftCardsService);
    giftCardCodesService = module.get<GiftCardCodesService>(
      GiftCardCodesService,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('purchase', () => {
    it('should create a purchase successfully', async () => {
      const mockGiftCard = {
        id: 'card1',
        name: 'Test Gift Card',
        price: '100.00',
        stock: 10,
        isActive: true,
      };

      const mockPurchase = {
        id: 'purchase1',
        userid: 'user1',
        giftcardid: 'card1',
        purchaseAmount: '100.00',
        status: PurchaseStatus.PENDING,
        paymentMethod: 'Credit Card',
        purchasedAt: new Date(),
      };

      const mockCode = {
        id: 'code1',
        code: 'ABCD-1234-EFGH-5678',
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      };

      mockGiftCardsService.findById.mockResolvedValue(mockGiftCard);
      mockPurchaseRepository.create.mockReturnValue(mockPurchase);
      mockPurchaseRepository.save.mockResolvedValue(mockPurchase);
      mockPurchaseRepository.update.mockResolvedValue({ affected: 1 });
      mockGiftCardCodesService.generateCode.mockResolvedValue(mockCode);
      mockGiftCardsService.updateCard.mockResolvedValue({
        ...mockGiftCard,
        stock: 9,
      });

      const createPurchaseDto = {
        userId: 'user1',
        giftCardId: 'card1',
        paymentMethod: 'Credit Card',
      };

      const result = await service.purchase(createPurchaseDto);

      expect(result).toBeDefined();
      expect(result.giftCardName).toBe('Test Gift Card');
      expect(result.code).toBe('ABCD-1234-EFGH-5678');
      expect(result.status).toBe(PurchaseStatus.COMPLETED);
      expect(mockGiftCardsService.updateCard).toHaveBeenCalledWith('card1', {
        stock: 9,
      });
    });

    it('should throw BadRequestException if gift card is not active', async () => {
      const mockGiftCard = {
        id: 'card1',
        name: 'Inactive Card',
        isActive: false,
        stock: 10,
      };

      mockGiftCardsService.findById.mockResolvedValue(mockGiftCard);

      const createPurchaseDto = {
        userId: 'user1',
        giftCardId: 'card1',
        paymentMethod: 'Credit Card',
      };

      await expect(service.purchase(createPurchaseDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if gift card is out of stock', async () => {
      const mockGiftCard = {
        id: 'card1',
        name: 'Out of Stock Card',
        isActive: true,
        stock: 0,
      };

      mockGiftCardsService.findById.mockResolvedValue(mockGiftCard);

      const createPurchaseDto = {
        userId: 'user1',
        giftCardId: 'card1',
        paymentMethod: 'Credit Card',
      };

      await expect(service.purchase(createPurchaseDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findByUser', () => {
    it('should return purchases for a user', async () => {
      const mockPurchases = [
        {
          id: 'purchase1',
          userid: 'user1',
          giftCard: { name: 'Card 1', shop: { name: 'Shop 1' } },
          purchasedAt: new Date(),
        },
      ];

      mockPurchaseRepository.find.mockResolvedValue(mockPurchases);

      const result = await service.findByUser('user1');

      expect(result).toHaveLength(1);
      expect(mockPurchaseRepository.find).toHaveBeenCalledWith({
        where: { userid: 'user1' },
        relations: ['giftCard', 'giftCard.shop'],
        order: { purchasedAt: 'DESC' },
      });
    });
  });

  describe('findbyId', () => {
    it('should return a purchase by id', async () => {
      const mockPurchase = {
        id: 'purchase1',
        userid: 'user1',
        giftCard: { name: 'Card 1' },
        user: { name: 'User 1' },
      };

      mockPurchaseRepository.findOne.mockResolvedValue(mockPurchase);

      const result = await service.findbyId('purchase1');

      expect(result).toBeDefined();
      expect(result.id).toBe('purchase1');
    });

    it('should throw NotFoundException if purchase not found', async () => {
      mockPurchaseRepository.findOne.mockResolvedValue(null);

      await expect(service.findbyId('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});