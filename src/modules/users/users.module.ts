import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RepositoriesModule } from 'src/infra/database/repositories.module';
import { UsersController } from './users.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
