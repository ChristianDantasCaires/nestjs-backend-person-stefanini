
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInSchema } from './dtos/auth.dto';
import { ZodValidationPipe } from 'src/shared/http/pipe/zod-validation.pipe';
import type { ISignInDTO } from './dtos/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: ISignInDTO) {
    return this.authService.signIn(signInDto);
  }
}
