import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,Index} from "typeorm";
import { GiftCardCode } from "src/gift-cards-codes/entities/gift-card-codes.entity";
import {Shop} from "src/shops/entities/shop.entity";    

@Entity('redemption_history')
@Index(['giftcardcodeid','shopid'])
@Index(['redeemedAt'])

export class RedemptionHistory{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name:'gift_card_code_id'})
    giftcardcodeid:string;

    @ManyToOne(() => GiftCardCode)
    @JoinColumn({ name: 'gift_card_code_id' })
    giftCardCode: GiftCardCode;

    @Column({name:'shop_id'})
    shopid:string;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column({name:'redeemed_at',type:'decimal', precision:10, scale:2})
    redeemedAt: Date;

    @Column({name:'remaining_balance',type:'decimal', precision:10, scale:2})
    remainingBalance: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({type:'text', nullable:true})
    notes: string;

}