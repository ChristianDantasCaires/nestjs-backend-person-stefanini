import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/infra/entities/person.entity';
import { IPersonRepository } from './repositories/person/person.repository.interface';
import { PersonRepository } from './repositories/person/person.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [
    {
      provide: IPersonRepository,
      useClass: PersonRepository,
    },
  ],
  exports: [IPersonRepository],
})
export class RepositoriesModule { }
