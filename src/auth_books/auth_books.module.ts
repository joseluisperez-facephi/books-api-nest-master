import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthBooksService } from './auth_books.service';
import { AuthBooksController } from './auth_books.controller';
import { User } from './entities/user_book.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({


  controllers: [AuthBooksController],
  providers: [AuthBooksService, JwtStrategy],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature( [ User ] ),
    
    PassportModule.register( { defaultStrategy: 'jwt' } ),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService) => {
        // console.log('JWT SECRET', process.env.JWT_SECRET)
        // console.log('JWT SECRET', configService.get('JWT_SECRET')) 
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'2h'

        }
      }
      }
    })

],
exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthBooksModule {}
