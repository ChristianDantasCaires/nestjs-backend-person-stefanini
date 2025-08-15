import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/repositories.module';
import { PersonsController } from './persons.controller';
import CreatePersonService from './services/create-person.service';
import FindAllPersonsService from './services/find-all-persons.service';
import FindOnePersonsService from './services/find-one-person.service';
import DeletePersonService from './services/delete-person.service';
import UpdatePersonService from './services/update-person.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [PersonsController],
  providers: [CreatePersonService, FindAllPersonsService, FindOnePersonsService, DeletePersonService, UpdatePersonService],
})
export class PersonsModule { }
