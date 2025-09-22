import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post(':listId')
    async create(@Param('listId') listId: string, @Body('title') title: string) {
        return this.taskService.createForList(listId, title);
    }

    @Patch(':id/toggle')
    async toggle(@Param('id') id: string) {
        return this.taskService.toggleComplete(id);
    }

    @Patch(':listId/unmarkAll')
    async unmarkAll(@Param('listId') id: string) {
        return this.taskService.unmarkAllComplete(id);
    }

    @Patch(':listId/markAll')
    async markAll(@Param('listId') id: string) {
        return this.taskService.markAllComplete(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}