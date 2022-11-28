import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Auth, GetUser } from 'src/auth_books/decorators';
import { User } from 'src/auth_books/entities/user_book.entity';
import { ValidRoles } from 'src/auth_books/interfaces';
import { Book } from './entities/book.entity';



@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('find/:term')
  findByAutor( @Param('term') term: string) {
    return this.booksService.findByAutor(term)
  }

  @Post()
   //@Auth()
   @ApiResponse( { status: 201, description: 'El libro fue creado', type: Book})
   @ApiResponse( { status: 400, description: 'Bad request'})
   @ApiResponse( { status: 403, description: 'Forbidden. Token related.'})
  create(
    @Body() createBookDto: CreateBookDto ) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll( @Query() PaginationDto: PaginationDto) {
    return this.booksService.findAll( PaginationDto);
  }

  @Get("hola")
  hola( @Query() PaginationDto: PaginationDto) {
    return "hola";
  }

  @Get(':term')                                //term = termino de búsqueda
  findOne(@Param('term',) term: string ) {
    return this.booksService.findOne( term );
  }

  @Patch(':id')
  // @Auth( ValidRoles.user, ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update( id, updateBookDto );
  }

  @Delete(':id')
  // @Auth(  ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
