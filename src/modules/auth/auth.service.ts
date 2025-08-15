
import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import ServerError from 'src/shared/error/server-error';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { JwtService } from '@nestjs/jwt';
import { ISignInDTO } from './dtos/auth.dto';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    data: ISignInDTO
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const comparePassword = await compare(data.password, user.password);

    if (!comparePassword) {
      throw new ServerError(ErrorMessages.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
