import { ApiProperty } from "@nestjs/swagger";
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../auth_books/entities/user_book.entity';


@Entity( { name: 'book'})
export class Book {
    user: any;
    Delete() {
      throw new Error('Method not implemented.');
    }
    @ApiProperty({
        example: '81161ec9-80f0-45b6-a641-14617e5306c1',
        description: 'id del libro',
        uniqueItems: true
     } )
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty(    {
        example: 'El libraco',
        description: 'titulo del libro',
        uniqueItems: true
})
    @Column('varchar')
    titulo: string;

    @ApiProperty(
        {
            example: 'XXXX-XXXX-XXXX',
            description: 'ISBN del libro',
            uniqueItems: true
    }
    )
    @Column(('varchar'),{ unique: true })
    isbn: string;

    @ApiProperty(
        {
            example: 'erase una vez todo lo que tendra que ser porque será lo que tenga que ser',
            description: 'titulo del libro',
            uniqueItems: true
    }
    )
    @Column('varchar')
    resumen: string;

    @ApiProperty( {
        example: '2022-11-21',
        description: 'Fecha de cuando se creo en la base de datos',
        uniqueItems: true
}
        
    )
    @Column(('date'), { nullable: true})   // Quitar que pueda ser nulo (solo para ver que funciona en POSTMAN)
    fechadecreacion: Date;

    @ApiProperty(
        {
            example: '2019-05-11',
            description: 'Fecha de cuando fue',
            uniqueItems: true
        })
    @Column(('date'), { nullable: true})   // Quitar que pueda ser nulo (solo para ver que funciona en POSTMAN)
    fechadepublicacion: Date;

    @ApiProperty( {

        example: 'Jose Luis Pérez Peña',
        description: 'nombre del creador del libro',
        uniqueItems: true
     } )
    @Column('varchar')
    autor: string;

    @ApiProperty( {
        example: 'editorial que realizó el ejemplar',
        description: 'id del libro',
        uniqueItems: true
     } )
    @Column('varchar')
    editorial: string;

    @ApiProperty()
    @Column('varchar')
    urlPDF: string;

    @ApiProperty( {
        example: 'La del medio',
        description: 'Categoria donde se encuentra el libro',
        uniqueItems: true
     } ) 
    @Column('text', {
        array: true,
    })
    categoria: string[];

    @ApiProperty( {
        example: 'Español',
        description: 'Lenguajes en el que se encuentra editado',
        uniqueItems: true
     } )
    @Column('text', {
        array: true,
    })
    idioma: string[];

    @ApiProperty( {
        example: '8',
        description: 'Valoracion de los usuarios',
        uniqueItems: true
     }
    )
    @Column('double precision')
    valoracion: number;

@ManyToOne(
    () => User,
    ( user ) => user.book,
    { eager: true}
)
User: User;

}

    