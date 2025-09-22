import { Body, Controller, Param, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateTasksDto } from './dto/generate-tasks.dto';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('generate-tasks/:listId')
    async generate(@Param('listId') listId: string, @Body() dto: GenerateTasksDto) {
        return this.aiService.generateTasksForList(dto, listId);
    }
}