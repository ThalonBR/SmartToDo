import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { ListEntity } from '../list/list.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepo: Repository<TaskEntity>,
        @InjectRepository(ListEntity)
        private readonly listRepo: Repository<ListEntity>,
    ) { }

    async createForList(listId: string, title: string) {
        const list = await this.listRepo.findOne({ where: { id: listId } });
        if (!list) throw new NotFoundException('List not found');
        const lastTask = await this.taskRepo.findOne({
            where: { list: { id: listId } },
            order: { order: 'DESC' },
        });
        const order = lastTask ? lastTask.order + 1 : 1;
        const task = this.taskRepo.create({ title, list, order });
        return this.taskRepo.save(task);
    }

    async insertGeneratedForList(listId: string, tasksArray: Array<{ title: string; order: number }>) {
        const list = await this.listRepo.findOne({ where: { id: listId } });
        if (!list) throw new NotFoundException('List not found');
        const tasks = tasksArray.map((task) => this.taskRepo.create({ title: task.title, list, order: task.order }));
        return this.taskRepo.save(tasks);
    }

    async toggleComplete(taskId: string) {
        const task = await this.taskRepo.findOne({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');
        task.isCompleted = !task.isCompleted;
        return this.taskRepo.save(task);
    }

    async getLastTaskOfList(listId: string) {
        return await this.taskRepo.findOne({
            where: { list: { id: listId } },
            order: { order: 'DESC' },
        });
    }

    async unmarkAllComplete(listId: string) {
        const list = await this.listRepo.findOne({ where: { id: listId }, relations: ['tasks'] });
        if (!list) throw new NotFoundException('List not found');
        const tasks = list.tasks.filter(task => task.isCompleted);
        for (const task of tasks) {
            task.isCompleted = false;
        }
        return this.taskRepo.save(tasks);
    }

    async markAllComplete(listId: string) {
        const list = await this.listRepo.findOne({ where: { id: listId }, relations: ['tasks'] });
        if (!list) throw new NotFoundException('List not found');
        const tasks = list.tasks.filter(task => !task.isCompleted);
        for (const task of tasks) {
            task.isCompleted = true;
        }
        return this.taskRepo.save(tasks);
    }

    async updateTask(taskId: string, props: Partial<Pick<TaskEntity, 'title' | 'isCompleted'>>) {
        const task = await this.taskRepo.findOne({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');
        Object.assign(task, props);
        return this.taskRepo.save(task);
    }

    async remove(taskId: string) {
        const task = await this.taskRepo.findOne({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');
        return this.taskRepo.remove(task);
    }
}