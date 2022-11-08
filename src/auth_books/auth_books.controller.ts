import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

import { AuthBooksService } from './auth_books.service';

import { RawHeaders, GetUser } from './decorators';


import { CreateUserDto, LoginUserDto  } from './dto';
import { User } from './entities/user_book.entity';




@Controller('auth-books')
export class AuthBooksController {
  constructor(private readonly authBooksService: AuthBooksService) {}

  @Post('register')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authBooksService.create( CreateUserDto);
  }


  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authBooksService.login( LoginUserDto );
  }


@Get('private')
@UseGuards( AuthGuard() )
testingPrivateRoute(
  @Req() request: Express.Request,
  @GetUser() user: User,
  @GetUser('email') userEmail: string,

  @RawHeaders() rawHeaders: string[]
  
  ) {


  return {
    ok: true, 
    message: 'Hola caracola',
    user,
    userEmail,
    rawHeaders
  }
}

  
}
