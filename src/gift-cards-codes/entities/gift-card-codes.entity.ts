import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,Index, UpdateDateColumn } from "typeorm";
import { Purchase } from "../../purchases/entities/purchase.entity";  
import { Shop } from "../../shops/entities/shop.entity"; 
export enum GiftCardCodeStatus {
    active = 'activa',
    redeemed = 'canjeada',
    expired = 'expirada',
    cancelled = 'cancelada',
}

@Entity('gift_card_codes')
@Index(['code'],{unique:true})
@Index(['status'])
@Index(['expirationDate', 'status'])

export class GiftCardCode{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name:'purchase_id',unique:true})
    purchaseid:string;

    @ManyToOne(() => Purchase)
    @JoinColumn({ name: 'purchase_id' })
    purchase: Purchase;

    @Column({length:32,unique:true})
    code:string;

    @Column({type:'enum', enum:GiftCardCodeStatus, default:GiftCardCodeStatus.active})
    status:GiftCardCodeStatus;

    @Column({name:'expiration_date',type:'timestamp',nullable:true})
    expirationDate: Date;

    @Column({name:'redeemed_at',type:'timestamp',nullable:true})
    redeemedAt: Date;

    @Column({name:'redeemed_in_shop_id',nullable:true})
    redeemedInShopId: string;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'redeemed_in_shop_id' })
    redeemedInShop: Shop;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}