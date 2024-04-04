import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Movies } from "./Movies";

@Entity({name:'bookingOrder'})
export class bookingOrder {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User

    @OneToOne(() => Movies)
    @JoinColumn()
    movie: Movies

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}