import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn,Index } from "typeorm";
import { Shop } from "../../shops/entities/shop.entity";

@Entity('gift_cards')
@Index(['shopid','isActive'])
@Index(['price'])
export class GiftCard{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name:'shop_id'})
    shopid:string;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column({length:255})
    name:string;

    @Column({type:"text",nullable:true})
    description:string;

    @Column({name: 'image_url', length: 500, nullable: true })
    imageUrl: string;

    @Column({type:'decimal', precision:10, scale:2})
    price:string;

    @Column({length:3,default:'CLP'})
    currency:string;

    @Column({name:'is_active',default:true})
    isActive:boolean;

    @Column({type:'int',nullable:true})
    stock:number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}