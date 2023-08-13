import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity'; // Make sure to import Todo entity
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findById(+id); 
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todosService.remove(+id);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(+id, updateTodoDto);
  }
}
