import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import IControllerResponse from 'src/shared/interfaces/IControllerResponse';
import { ZodValidationPipe } from 'src/shared/http/pipe/zod-validation.pipe';
import { UsersService } from './users.service';
import { signInSchema, type ISignInDTO } from '../auth/dtos/auth.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('create')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async createUser(@Body() createUserDTO: ISignInDTO): Promise<IControllerResponse> {
    const result = await this.usersService.create(createUserDTO);
    return { data: result, success: true, message: '' }
  }
}
