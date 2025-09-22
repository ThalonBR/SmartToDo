import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('list')
export class ListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => TaskEntity, (task) => task.list, { cascade: true })
    tasks: TaskEntity[];
}