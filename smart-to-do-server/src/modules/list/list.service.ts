import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListEntity)
        private readonly listRepo: Repository<ListEntity>,
    ) { }


    async create(title: string): Promise<ListEntity> {
        const list = this.listRepo.create({ title });
        return this.listRepo.save(list);
    }
    async update(id: string, title: string): Promise<ListEntity> {
        const list = await this.listRepo.findOne({ where: { id } });
        if (!list) throw new NotFoundException('List not found');
        list.title = title;
        return this.listRepo.save(list);
    }

    async findAll(): Promise<ListEntity[]> {
        return this.listRepo.find({ relations: ['tasks'] });
    }

    async findAllMinify(): Promise<ListEntity[]> {
        return this.listRepo.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: string): Promise<ListEntity> {
        const list = await this.listRepo
            .createQueryBuilder('list')
            .leftJoinAndSelect('list.tasks', 'task')
            .where('list.id = :id', { id })
            .orderBy('task.order', 'ASC')
            .getOne();

        if (!list) throw new NotFoundException('List not found');
        return list;
    }

    async remove(id: string): Promise<void> {
        const list = await this.findOne(id);
        await this.listRepo.remove(list);
    }
}