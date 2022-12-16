import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { IncomingHttpHeaders } from 'http';

import { AuthBooksService } from './auth_books.service';

import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto, LoginUserDto  } from './dto';
import { User } from './entities/user_book.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';



@ApiTags('Auth')
@Controller('auth-books')

export class AuthBooksController {
  constructor(private readonly authBooksService: AuthBooksService) {}

  @Post('register')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    console.log(CreateUserDto)
    return this.authBooksService.create( CreateUserDto);
  }


  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authBooksService.login( LoginUserDto );
  }


@Get('private')
@Auth( ValidRoles.admin)
@UseGuards( AuthGuard() )
testingPrivateRoute(
  // @Req() request: Express.Request,
  @GetUser() user: User,
  @GetUser('email') userEmail: string,

  @RawHeaders() rawHeaders: string[], 
  // @Headers() headers: IncomingHttpHeaders,
  
  ) {



  return {
    ok: true, 
    message: 'Hola caracola',
    user,
    userEmail,
    rawHeaders, 
    //headers
  }
}


//@SetMetadata('roles', ['admin', 'superUser'])

@Get('private2')
// @RoleProtected( ValidRoles.superUser, ValidRoles.admin, ValidRoles.user )
@UseGuards( AuthGuard(), UserRoleGuard)
privateRoute2(
  @GetUser() user: User
){

  return {
    ok: true,
    user
  }
}  



@Get('private3')
@Auth(ValidRoles.admin)
privateRoute3(
  @GetUser() user: User
){

  return {
    ok: true,
    user
  }
}  

}






