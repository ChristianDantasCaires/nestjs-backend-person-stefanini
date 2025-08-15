import { ApiProperty } from '@nestjs/swagger';
import { personGenderEnum } from 'src/infra/entities/person.entity';

export class PersonSwaggerDTO {
  @ApiProperty({ type: 'string', description: 'ID da pessoa' })
  id: string;

  @ApiProperty({ type: 'string', description: 'Nome da pessoa' })
  name: string;

  @ApiProperty({ enum: personGenderEnum, required: false, description: 'Gênero da pessoa' })
  gender?: personGenderEnum;

  @ApiProperty({ type: 'string', format: 'email', required: false, description: 'Email da pessoa' })
  email?: string;

  @ApiProperty({ type: 'string', format: 'date', description: 'Data de nascimento' })
  birthDate: Date;

  @ApiProperty({ type: 'string', required: false, description: 'Local de nascimento' })
  placeOfBirth?: string;

  @ApiProperty({ type: 'string', required: false, description: 'Nacionalidade' })
  nationality?: string;

  @ApiProperty({ type: 'string', description: 'CPF da pessoa' })
  cpf: string;
}
