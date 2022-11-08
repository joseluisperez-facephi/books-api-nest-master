import { BadRequestException, Injectable, InternalServerErrorException, Logger, Body, NotFoundException, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

@Injectable()
export class BooksService {

   private readonly logger = new Logger("BooksServices")

  constructor(

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ){}




    async create(createBookDto: CreateBookDto) {

    try {

      const Book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save( Book );

      return Book;
      
    } catch (error) {

      this.handleDBExceptions(error);
      
    }

  }



    findAll( PaginationDto: PaginationDto) {
    
    const { limit = 10, offset = 0 } = PaginationDto;

    return this.bookRepository.find({
      take: limit,
      skip: offset,

    });
  }

  



    async findOne(term: string) {


      let Book: Book;

     if ( isUUID(term) ) {

      Book = await this.bookRepository.findOneBy( {id: term }); 
     } else {
      Book = await this.bookRepository.findOneBy( { autor: term }); 

      const queryBuilder = this.bookRepository.createQueryBuilder();

      Book = await queryBuilder
      .where('UPPER(titulo)=: titulo or autor=: autor',{
        titulo: term.toUpperCase(),
        autor: term.toLowerCase(),
        }).getOne();

     }

     if ( !Book )
     throw new NotFoundException(`El producto con el id ${ term } no ha sido encontrado`);

     return  Book;
  }




    async findByAutor( term: string) :Promise<Book[]>{

    const book = await this.bookRepository.find( {
      where: { 
      
      autor: term
    } 
  
  })
    return book
  }




  async update(id: string, updateBookDto: UpdateBookDto) {

  const Book = await this.bookRepository.preload({
  id: id,
  ...updateBookDto
});

if ( !Book ) throw new NotFoundException(`El libro con el id: ${ id } no ha sido encontrado`);

try {
  await this.bookRepository.save( Book );
  return Book;
  
} catch (error) {
  this.handleDBExceptions(error);
}

  }




  async remove(id: string) {

    const Book = await this.findOne( id );

    if (Book.id === Book.id)
    
      await this.bookRepository.remove( Book )

  }

  
  

   private handleDBExceptions( error: any ) {

     if ( error.code === '23505' )
     throw new BadRequestException(error.detail);
    
     this.logger.error(error)
    
     throw new InternalServerErrorException('Unexpected error, check server logs');
     }
    
}


