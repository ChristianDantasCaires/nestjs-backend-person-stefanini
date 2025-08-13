import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/repositories.module';
import { PersonsController } from './controllers/persons.controller';
import CreatePersonService from './services/create-person.service';
import FindAllPersonsService from './services/find-all-persons.service';
import FindOnePersonsService from './services/find-one-person.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [PersonsController],
  providers: [CreatePersonService, FindAllPersonsService, FindOnePersonsService],
})
export class PersonsModule { }
