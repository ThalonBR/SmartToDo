import { ListEntity } from 'src/modules/list/list.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    title: string;

    @Column({ default: false })
    isCompleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'int' })
    order: number;


    @ManyToOne(() => ListEntity, (list) => list.tasks, { onDelete: 'CASCADE' })
    list: ListEntity;
}
