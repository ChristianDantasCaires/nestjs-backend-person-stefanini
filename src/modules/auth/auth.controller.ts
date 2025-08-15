
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInSchema } from './dtos/auth.dto';
import { ZodValidationPipe } from 'src/shared/http/pipe/zod-validation.pipe';
import type { ISignInDTO } from './dtos/auth.dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthSwaggerDTO } from './dtos/auth-swagger.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  @ApiOperation({ summary: 'Realiza o login' })
  @ApiBody({ type: AuthSwaggerDTO })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  signIn(@Body() signInDto: ISignInDTO) {
    return this.authService.signIn(signInDto);
  }
}
