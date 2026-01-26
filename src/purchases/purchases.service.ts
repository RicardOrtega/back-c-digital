import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class PurchasesService {
    constructor(@InjectRepository(Purchase)private purchaseRepository: Repository<Purchase>,) {}
}