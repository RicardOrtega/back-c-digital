import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "./entities/shop.entity";
import { Repository } from "typeorm/repository/Repository";


@Injectable()export class ShopService {
    constructor(@InjectRepository(Shop) private shopRepository: Repository<Shop>) {}
}