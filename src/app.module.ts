import { Module } from '@nestjs/common';
import { SqliteModule } from './infra/database/sqlite.module';
import { PersonsModule } from './modules/persons/persons.module';

@Module({
  imports: [SqliteModule, PersonsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
