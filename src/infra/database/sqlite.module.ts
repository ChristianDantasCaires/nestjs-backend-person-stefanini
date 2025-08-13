import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: [__dirname + '/../entities/**/*.{ts,js}'],
      synchronize: true,
    }),

  ],
})
export class SqliteModule { }