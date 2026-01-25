import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn,Index } from "typeorm";
import { User } from "../../users/entities/users.entity";
import { GiftCard } from "../../gift-cards/entities/gift-cards.entity";

export enum PurchaseStatus {
    PENDING = 'Pendiente',
    COMPLETED = 'Completado',
    CANCELLED = 'Cancelado',
    REFUNDED = 'Reembolsado',
    FAILED = 'Fallido',
    IN_PROCESS = 'En Proceso',
}

@Entity('purchases')
@Index(['userid','status'])
@Index(['purchasedAt'])
export class Purchase{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name:'user_id'})
    userid:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({name:'gift_card_id'})
    giftcardid:string;

    @ManyToOne(() => GiftCard)
    @JoinColumn({ name: 'gift_card_id' })
    giftCard: GiftCard;

    @Column({name:'purchase_amount',type:'decimal', precision:10, scale:2})
    purchaseAmount:string;

    @Column({type:'enum', enum:PurchaseStatus, default:PurchaseStatus.PENDING})
    status:PurchaseStatus;

    @Column({name:"payment_method", length:50, nullable:true})
    paymentMethod:string;

    @Column({name:'purchased_at'})
    purchasedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

}
