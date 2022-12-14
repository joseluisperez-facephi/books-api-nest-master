import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from '../entities/user_book.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,

        ConfigService: ConfigService
    ) {

        super( {
            secretOrKey: ConfigService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        } );
    }

async validate ( payload: JwtPayload ): Promise<User> {

    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if ( !user ) 
        throw new UnauthorizedException('Token not valid')

    if ( !user.isActive ) 
        throw new UnauthorizedException('User is inactive, talk with an admin')   

        console.log(user)

    return user;
}

}