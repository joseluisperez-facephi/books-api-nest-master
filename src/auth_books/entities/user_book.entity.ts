import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../../books/entities/book.entity';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column(('text'), {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column(('text'),{ 
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Book,
        ( book ) => book.user
    )
    book: Book;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }
    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
       this.checkFieldsBeforeInsert();
    }

}
