
import { Test, TestingModule } from '@nestjs/testing';
import { GiftCardsService } from './gift-cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GiftCard } from './entities/gift-cards.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('GiftCardsService', () => {
  let service: GiftCardsService;
  let repository: Repository<GiftCard>;

  const mockGiftCardRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftCardsService,
        {
          provide: getRepositoryToken(GiftCard),
          useValue: mockGiftCardRepository,
        },
      ],
    }).compile();

    service = module.get<GiftCardsService>(GiftCardsService);
    repository = module.get<Repository<GiftCard>>(getRepositoryToken(GiftCard));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGiftCardCatalog', () => {
    it('should return active gift cards with shop information', async () => {
      const mockGiftCards = [
        {
          id: '1',
          name: 'Gift Card 1',
          description: 'Description 1',
          imageUrl: 'http://example.com/image1.jpg',
          price: '100.00',
          currency: 'CLP',
          stock: 10,
          isActive: true,
          shop: {
            id: 'shop1',
            name: 'Shop 1',
          },
          createdAt: new Date(),
        },
      ];

      mockGiftCardRepository.find.mockResolvedValue(mockGiftCards);

      const result = await service.getGiftCardCatalog();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Gift Card 1');
      expect(result[0].shop.name).toBe('Shop 1');
      expect(mockGiftCardRepository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        relations: ['shop'],
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array if no active gift cards', async () => {
      mockGiftCardRepository.find.mockResolvedValue([]);

      const result = await service.getGiftCardCatalog();

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a gift card by id', async () => {
      const mockGiftCard = {
        id: '1',
        name: 'Gift Card 1',
        price: '100.00',
        shop: { id: 'shop1', name: 'Shop 1' },
      };

      mockGiftCardRepository.findOne.mockResolvedValue(mockGiftCard);

      const result = await service.findById('1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(mockGiftCardRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['shop'],
      });
    });

    it('should throw NotFoundException if gift card not found', async () => {
      mockGiftCardRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createGiftCard', () => {
    it('should create a new gift card', async () => {
      const createDto = {
        shopid: 'shop1',
        name: 'New Gift Card',
        description: 'Description',
        price: 100,
        stock: 50,
      };

      const mockCreatedCard = {
        ...createDto,
        id: '123',
        price: '100',
        isActive: true,
      };

      mockGiftCardRepository.create.mockReturnValue(mockCreatedCard);
      mockGiftCardRepository.save.mockResolvedValue(mockCreatedCard);

      const result = await service.createGiftCard(createDto);

      expect(result).toBeDefined();
      expect(result.name).toBe('New Gift Card');
      expect(mockGiftCardRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateCard', () => {
    it('should update gift card successfully', async () => {
      const existingCard = {
        id: '1',
        name: 'Old Name',
        price: '100.00',
        stock: 10,
        shop: { id: 'shop1', name: 'Shop 1' },
      };

      const updateData = {
        name: 'Updated Name',
        price: '150',
      };

      mockGiftCardRepository.findOne.mockResolvedValue(existingCard);
      mockGiftCardRepository.save.mockResolvedValue({
        ...existingCard,
        ...updateData,
        price: '150',
      });

      const result = await service.updateCard('1', updateData);

      expect(result.name).toBe('Updated Name');
      expect(result.price).toBe('150');
    });
  });
});