import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/infra/entities/person.entity';
import { IPersonRepository } from './repositories/person/person.repository.interface';
import { PersonRepository } from './repositories/person/person.repository';
import { IUserRepository } from './repositories/user/user.repository.interface';
import { UserRepository } from './repositories/user/user.repository';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, User])],
  providers: [
    {
      provide: IPersonRepository,
      useClass: PersonRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IPersonRepository, IUserRepository],
})
export class RepositoriesModule { }
