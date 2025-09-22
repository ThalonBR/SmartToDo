import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create.list.dto';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Post()
    async create(@Body() dto: CreateListDto) {
        return this.listService.create(dto.title);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: CreateListDto) {
        return this.listService.update(id, dto.title);
    }

    @Get()
    async list() {
        return this.listService.findAllMinify();
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return this.listService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.listService.remove(id);
    }
}