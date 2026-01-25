import e from "express";
import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,Index } from "typeorm";

export enum ShopStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity('shops')
 export class Shop{ 
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:255})
    name:string;

    @Index({ unique: true })
    @Column({length:255})
    email:string;

    @Column({type:'enum', enum:ShopStatus, default:ShopStatus.ACTIVE})
    status:ShopStatus;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
 }