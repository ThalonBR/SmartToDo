import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { TaskModule } from './modules/tasks/task.module';
import { AiModule } from './modules/ai/ai.module';
import { ListModule } from './modules/list/list.module';
import { HttpClientWrapper } from './providers/http-client-wrapper';
import { TaskController } from './modules/tasks/task.controller';
import { AiController } from './modules/ai/ai.controller';
import { ListController } from './modules/list/list.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.DATABASE_PATH ||
        resolve(process.cwd(), 'data', 'sqlite.db'),
      entities: [resolve(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // em dev; em prod use migrations
      logging: false,
    }),
    TaskModule,
    AiModule,
    ListModule
  ],
  controllers: [],
  providers: [HttpClientWrapper],
  exports: [HttpClientWrapper],
})
export class AppModule { }
