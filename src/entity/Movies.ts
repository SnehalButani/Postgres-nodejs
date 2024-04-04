import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from './User'
import { bookingOrder } from "./Order";


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

    @OneToOne(() => User, (user) => user.movies,{
        eager:true
    })
    @JoinColumn()
    user: User

    @OneToOne(() => bookingOrder, (booking) => booking.movie)
    @JoinColumn()
    booking: bookingOrder

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}