import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ListEntity])],
    providers: [ListService],
    controllers: [ListController],
    exports: [ListService],
})
export class ListModule { }