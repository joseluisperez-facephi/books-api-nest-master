import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user_book.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthBooksService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(LoginUserDto: LoginUserDto) {
    const { password, email } = LoginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException(
        'Las credenciales no son válidas (email)',
      );

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Las credenciales no son válidas (password)',
      );

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  // Token
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Por favor chequea los logs server');
  }
}

// findAll() {
//   return `This action returns all authBooks`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} authBook`;
// }

// update(id: number, updateAuthBookDto: UpdateAuthBookDto) {
//   return `This action updates a #${id} authBook`;
// }

// remove(id: number) {
//   return `This action removes a #${id} authBook`;
// }
