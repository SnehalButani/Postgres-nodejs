import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BeforeUpdate, BeforeInsert, OneToOne, JoinColumn, OneToMany } from "typeorm"
import * as bcrypt from "bcrypt";
import { Movies } from "./Movies";
import { bookingOrder } from "./Order";


@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    image: string

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({ nullable: true })
    age: number

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ default: "user" })
    role: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Movies, (movies) => movies.user)
    @JoinColumn()
    movies: Movies

    @OneToMany(() => bookingOrder, (booking) => booking.user)
    booking: bookingOrder[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}


