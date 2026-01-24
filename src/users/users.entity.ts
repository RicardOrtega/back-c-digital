import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Index({ unique: true })
    @Column({length:255})
    email: string;

    @Column({length:255})
    name: string;

    @Column({length:255})
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
}