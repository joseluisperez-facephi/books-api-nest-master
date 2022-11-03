import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('find/:term')
  findByAutor( @Param('term') term: string) {
    return this.booksService.findByAutor(term)
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll( @Query() PaginationDto: PaginationDto) {
    return this.booksService.findAll( PaginationDto);
  }

  @Get(':term')                                //term = termino de búsqueda
  findOne(@Param('term',) term: string ) {
    return this.booksService.findOne( term );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update( id, updateBookDto );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
