import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthBooksModule } from '../auth_books/auth_books.module';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';

import { Book } from './entities/book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    TypeOrmModule.forFeature( [ Book ] ),
    AuthBooksModule,
  ]

})
export class BooksModule {}
