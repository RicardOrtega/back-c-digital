import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop, ShopStatus } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(datos: CreateShopDto): Promise<Shop> {
    await this.checkEmail(datos.email);

    const newStore = this.shopRepository.create(datos);
    return this.shopRepository.save(newStore);
  }

  async findAll(): Promise<Shop[]> {
    return this.shopRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Shop> {
    const foundStore = await this.shopRepository.findOne({ where: { id } });

    if (!foundStore) {
      throw new NotFoundException(`Tienda no encontrada o inexistente`);
    }

    return foundStore;
  }

  async update(id: string, data: UpdateShopDto): Promise<Shop> {
    const storeUpdated = await this.shopRepository.preload({
      id,
      ...data,
    });

    if (!storeUpdated) {
      throw new NotFoundException(`La tienda no se encuentra o no existe`);
    }

    if (data.email) {
      await this.checkEmail(data.email, id);
    }

    return this.shopRepository.save(storeUpdated);
  }

 

  private async checkEmail(email: string, excludeID?: string): Promise<void> {
    const foundShop = await this.shopRepository.findOne({
      where: { email },
    });

    if (foundShop && foundShop.id !== excludeID) {
      throw new ConflictException('Tienda con este correo ya existente');
    }
  }
}