import { ApiProperty } from '@nestjs/swagger';

export class AuthSwaggerDTO {
  @ApiProperty({ type: 'string', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ type: 'string', description: 'Senha do usuário' })
  password: string;
}
