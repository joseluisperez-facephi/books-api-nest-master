import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book {
    Delete() {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('varchar')
    titulo: string;

    @Column(('varchar'),{ unique: true })
    isbn: string;

    @Column('varchar')
    resumen: string;

    @Column(('date'), { nullable: true})   // Quitar que pueda ser nulo (solo para ver que funciona en POSTMAN)
    fechadecreacion: Date;

    @Column(('date'), { nullable: true})   // Quitar que pueda ser nulo (solo para ver que funciona en POSTMAN)
    fechadepublicacion: Date;

    @Column('varchar')
    autor: string;

    @Column('varchar')
    editorial: string;

    @Column('varchar')
    urlPDF: string;

    @Column('text', {
        array: true,
    })
    categoria: string[];

    @Column('text', {
        array: true,
    })
    idioma: string[];

    @Column('double precision')
    valoracion: number;


}


    