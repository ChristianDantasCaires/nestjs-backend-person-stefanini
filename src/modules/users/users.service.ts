import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/infra/entities/user.entity';
import { IUserRepository } from 'src/infra/database/repositories/user/user.repository.interface';
import { ISignInDTO } from '../auth/dtos/auth.dto';
import ServerError from 'src/shared/error/server-error';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: IUserRepository,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(signupDto: ISignInDTO): Promise<User> {
    const { email, password } = signupDto;

    const hasUser = await this.userRepository.findByEmail(email);

    if (hasUser) {
      throw new ServerError(ErrorMessages.USER_EMAIL_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10)
    });

    return user;
  }
}