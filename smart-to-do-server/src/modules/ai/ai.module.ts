import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { TaskModule } from '../tasks/task.module';
import { AiController } from './ai.controller';
import { HttpClientWrapper } from 'src/providers/http-client-wrapper';

@Module({
    imports: [TaskModule],
    providers: [AiService, HttpClientWrapper],
    controllers: [AiController],
})
export class AiModule { }