import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from './User'


@Entity({ name: 'movies' })
export class Movies {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    director: string;

    @Column({ nullable: false })
    year: number;

    @Column({ nullable: false })
    rating: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    cast: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}